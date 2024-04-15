import {
  Component,
  ViewEncapsulation
} from "@angular/core";
import { BehaviorSubject, Subscription, map} from "rxjs";

import { setCulture } from "@syncfusion/ej2-base";
import {
  FilterService,
  VirtualScrollService,
} from "@syncfusion/ej2-angular-grids";
import { Validators, FormGroup } from "@angular/forms";
import { api } from "src/app/constants/api/apiDefinitions";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { BaseEditComponent } from "src/app/libraries/base-edit/base-edit/base-edit.component";
import { ICoreDropdownOption } from "src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component";
import { ICoreFormSection, EnumFormBaseContolType } from "src/app/libraries/core-form/core-form/enum-interfaces";
import { ICorePageEditCRUD } from "src/app/libraries/core-page-edit/core-page-edit.component";
import { FunctionEditService } from "src/app/main/cms/system/function/edit/function-edit.services";
import { DialogService } from "src/app/services/dialog.service";
import { SalaryTypeEditService } from './salarytype-edit.service';
setCulture("en");

@Component({
  selector: "app-salarytype-edit",
  templateUrl: "./salarytype-edit.component.html",
  styleUrls: ["./salarytype-edit.component.scss"],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class SalaryTypeEditComponent extends BaseEditComponent {

  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = "HU_SALARY_TYPE";

  subsctiptions: Subscription[] = [];
  salaryTypeGroupOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  salaryTypeGroupGetByIdObject$ = new BehaviorSubject<any>(null);
  salaryTypeGroupGetByIdApi = api.SYS_OTHERLIST_READ;
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              hidden: true
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_TYPE_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_TYPE_NAME,
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
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_TYPE_EFFECT_DATE,
              field: 'effectDate',
              value: new Date(),
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_TYPE_GROUP,
              field: 'salaryTypeGroup',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.salaryTypeGroupGetByIdObject$,
              getByIdApi: this.salaryTypeGroupGetByIdApi,
              shownFrom: 'name',
              dropdownOptions$: this.salaryTypeGroupOptions$,
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
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_TYPE_DESCRIPTION,
              field: 'description',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              shownFrom: 'name',
              type: 'text'
            }
          ]
        ]
      }
    ];

  constructor(
    public override dialogService: DialogService,
    private salaryTypeEditService: SalaryTypeEditService,
    private fncService: FunctionEditService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_TYPE_EDIT;

    this.crud = {
      c: api.HU_SALARY_TYPE_CREATE,
      r: api.HU_SALARY_TYPE_READ,
      u: api.HU_SALARY_TYPE_UPDATE,
      d: api.HU_SALARY_TYPE_DELETE,
    };

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subsctiptions.push(
        this.salaryTypeEditService.getSalaryTypeGroupList()
          .pipe(
            map((f: any) => {
              const options: { value: number; text: string; }[] = [];
              f.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name
                })
              })
              return options;
            })
          )
          .subscribe(response => {
            this.salaryTypeGroupOptions$.next(response);
            this.loading = false;
          })
      );
      this.subsctiptions.push(
        this.salaryTypeEditService.getCode()
          .pipe(
            map((f: any) => {
              let code = "";
              code = f.body.innerBody.code;
              return code;
            })
          )
          .subscribe(response => {
            this.form.get('code')?.patchValue(response);
            this.loading = false;
          })
      );
    });
  }
  ngOnInit(): void {
    this.loading = true;
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
