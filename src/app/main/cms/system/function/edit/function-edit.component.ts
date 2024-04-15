import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { api } from "src/app/constants/api/apiDefinitions";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { BaseEditComponent } from "src/app/libraries/base-edit/base-edit/base-edit.component";
import { ICorePageEditCRUD } from "src/app/libraries/core-page-edit/core-page-edit.component";
import { DialogService } from "src/app/services/dialog.service";
import { EnumFormBaseContolType, ICoreFormSection } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { BehaviorSubject, Subscription, map, zip } from "rxjs";
import { ICoreDropdownOption } from "src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component";
import { FunctionEditService } from "./function-edit.services";
import { ICoreChecklistOption } from "src/app/libraries/core-checklist/core-checklist/core-checklist.component";
import { ResponseService } from "src/app/services/response.service";
import { IFormatedResponse } from "src/app/interfaces/IFormatedResponse";

@Component({
  selector: "app-function-edit",
  templateUrl: "./function-edit.component.html",
  styleUrls: ["./function-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FunctionEditComponent extends BaseEditComponent implements AfterViewInit, OnDestroy {

  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = "SYS_FUNCTION";
  subscriptions: Subscription[] = [];
  groupOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  moduleOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  captionCode!: EnumTranslateKey;
  //formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_MODULE_NAME,
              field: 'moduleId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.moduleOptions$,
              getByIdObject$: new BehaviorSubject<any>(null),
              getByIdApi: api.SYS_MODULE_READ,
              shownFrom: 'name',
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.min(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_GROUP_NAME,
              field: 'groupId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.groupOptions$,
              getByIdObject$: new BehaviorSubject<any>(null),
              getByIdApi: api.SYS_FUNCTION_GROUP_READ,
              shownFrom: 'name',
              type: 'number',
            },
          ],
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_NAME,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_PATH,
              field: 'path',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.min(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_PATH_FULL_MATCH,
              field: 'pathFullMatch',
              value: false,
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            }
          ]
        ]
      }
    ];

  constructor(
    public override dialogService: DialogService,
    private fncService: FunctionEditService,
    private responseService: ResponseService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SYS_FUNCTION_EDIT;

    this.crud = {
      c: api.SYS_FUNCTION_CREATE,
      r: api.SYS_FUNCTION_READ,
      u: api.SYS_FUNCTION_UPDATE,
      d: api.SYS_FUNCTION_DELETE,
    };

  }

  ngOnInit(): void {
    this.loading = true;
    this.fncService.getModules()
      .pipe(
        map((x: any) => {
          if (x.ok && x.status === 200) {
            const options: { value: number; text: string; }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            return options;
          } else {
            return [];
          }
        })
      )
      .subscribe(response => {
        this.moduleOptions$.next(response);
        this.loading = false;
      });

    this.fncService.getFuncGroups()
      .pipe(
        map((x: any) => {
          if (x.ok && x.status === 200) {
            const options: { value: number; text: string; }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            return options;
          } else {
            return [];
          }
        })
      )
      .subscribe(response => {
        this.groupOptions$.next(response);
        this.loading = false;
      });

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = true;
      this.subscriptions.push(
        zip([
          this.fncService.getModules(),
          this.fncService.getFuncGroups()    
        ]).subscribe(x => {
          this.loading = false;
          if (x[0].ok && x[0].status === 200) {
            const body: IFormatedResponse = x[0].body
            const options: { value: number; text: string; }[] = [];
            body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            this.moduleOptions$.next(options)
          }  
          if (x[1].ok && x[1].status === 200) {
            const body: IFormatedResponse = x[1].body
            const options: { value: number; text: string; }[] = [];
            body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            this.groupOptions$.next(options)
          }
        })
      )
    })    
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

}
