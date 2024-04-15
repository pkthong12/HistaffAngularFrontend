import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { EnumFormBaseContolType, ICoreFormSection } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { ICorePageEditCRUD } from 'src/app/libraries/core-page-edit/core-page-edit.component';
import { AppService } from 'src/app/services/app.service';
import { DialogService } from 'src/app/services/dialog.service';
import { SysActionEditService } from '../../sys-action/sys-action-edit/sys-action-edit.service';
import { ICoreDropdownOption } from 'src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component';
import { FunctionEditService } from '../../function/edit/function-edit.services';

@Component({
  selector: 'app-sys-function-action-edit',
  templateUrl: './sys-function-action-edit.component.html',
  styleUrls: ['./sys-function-action-edit.component.scss']
})
export class SysFunctionActionEditComponent extends BaseEditComponent implements AfterViewInit, OnDestroy {

  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = "SYS_FUNCTION_ACTION";

  actionOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  functionOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  actionGetByIdObject$ = new BehaviorSubject<any>(null);
  actionGetByIdApi = api.SYS_ACTION_READ;
  functionGetByIdObject$ = new BehaviorSubject<any>(null);
  functionGetByIdApi = api.SYS_FUNCTION_READ;
  captionCode!: EnumTranslateKey;
  subsctiptions: Subscription[] = [];
  crud!: ICorePageEditCRUD;
  subscriptions: Subscription[] = [];
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
              type: 'number',
              hidden: true,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_ACTION_FUNCTION_NAME,
              field: 'functionId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              type: 'string',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },

              ],
              shownFrom: 'name',
              dropdownOptions$: this.functionOptions$,
              getByIdObject$: this.functionGetByIdObject$,
              getByIdApi: this.functionGetByIdApi,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_ACTION_ACTION_NAME,
              field: 'actionId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              type: 'string',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ],
              shownFrom: 'name',
              dropdownOptions$: this.actionOptions$,
              getByIdObject$: this.actionGetByIdObject$,
              getByIdApi: this.actionGetByIdApi,
            },
          ]
        ]
      },
    ];
  constructor(
    public override dialogService: DialogService,
    private appService: AppService,
    private sysActionEditService: SysActionEditService,
    private functionEditService: FunctionEditService
  ) {

    super(dialogService);
    this.captionCode = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_ACTION_EDIT_TITLE;
    this.crud = {
      c: api.SYS_FUNCTION_ACTION_CREATE,
      r: api.SYS_FUNCTION_ACTION_READ,
      u: api.SYS_FUNCTION_ACTION_UPDATE,
      d: api.SYS_FUNCTION_ACTION_DELETE,
    };

  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.appService.get(api.SYS_FUNCTION_READ_ALL).subscribe(x => {
        if (x.ok && x.status === 200) {
          const options: { value: number; text: string; }[] = [];
          x.body.innerBody.map((g: any) => {
            options.push({
              value: g.id,
              text: g.name
            })
          })
          this.functionOptions$.next(options);
        }      
      })
    )
    this.subscriptions.push(
      this.appService.get(api.SYS_ACTION_READ_ALL).subscribe(x => {
        if (x.ok && x.status === 200) {
          const options: { value: number; text: string; }[] = [];
          x.body.innerBody.map((g: any) => {
            options.push({
              value: g.id,
              text: g.nameVn
            })
          })
          this.actionOptions$.next(options);
        }      
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

}
