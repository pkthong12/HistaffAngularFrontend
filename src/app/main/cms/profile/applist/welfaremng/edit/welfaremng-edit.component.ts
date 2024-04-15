import { Component, OnDestroy, OnInit } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { ICorePageEditCRUD, ICorePageEditColumnComposition } from 'src/app/libraries/core-page-edit/core-page-edit.component';

import { FormGroup, Validators } from '@angular/forms';
import { EnumFormBaseContolType, ICoreFormSection } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { DialogService } from 'src/app/services/dialog.service';
import { ICoreDropdownOption } from 'src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component';
import { ICoreChecklistOption } from 'src/app/libraries/core-checklist/core-checklist/core-checklist.component';
import { BehaviorSubject, Subscription, distinctUntilChanged, map } from 'rxjs';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { EnumIconClass } from 'src/app/enum/EnumIconClass';
import { CoreService } from 'src/app/services/core.service';
import { EnumCoreFormControlSeekerSourceType } from 'src/app/libraries/core-form-control-seeker/EnumCoreFormControlSeekerSourceType';
import { WelfareMngEditService } from './welfaremng.edit.service';
import { AppService } from 'src/app/services/app.service';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { dateFormat } from 'highcharts';
import { ResponseService } from 'src/app/services/response.service';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { alertOptions } from 'src/app/constants/alertOptions';

@Component({
  selector: 'app-welfaremng-edit',
  templateUrl: './welfaremng-edit.component.html',
  styleUrls: ['./welfaremng-edit.component.scss']
})
export class WelfareMngEditComponent extends BaseEditComponent implements OnDestroy {

  /* Properties to be passed into core-page-edit */

  override entityTable = "HU_WELFARE_MNG";

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  welfareOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  huWelfareGetByIdObject$ = new BehaviorSubject<any>(null);
  huWelfareGetByIdApi = api.HU_WELFARE_READ;

  loading: boolean = false;
  defCosts: string = '';

  subsctiptions: Subscription[] = [];
  effectDate!: any;
  expireDate!: any;
  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
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
              hidden: true,
              type: 'text'
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EMPLOYEE_CODE,
              field: 'employeeId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,
              /* 
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
               */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              getByIdObject$: this.employeeGetByIdObject$,
              getByIdApi: this.employeeGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'code',
              alsoBindTo: [
                { takeFrom: 'fullname', bindTo: 'employeeName' },
                { takeFrom: 'positionName', bindTo: 'positionName' },
                { takeFrom: 'orgName', bindTo: 'departmentName' }],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_EMPLOYEE_NAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_DEPARTMENT_NAME,
              field: 'departmentName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_POSITION_NAME,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_DECISION_CODE,
              field: 'decisionCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EFFECT_DAY,
              field: 'effectDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'string',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EXPIRE_DAY,
              field: 'expireDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_WELFARE_NAME,
              field: 'welfareId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.welfareOptions$,
              getByIdObject$: this.huWelfareGetByIdObject$,
              getByIdApi: this.huWelfareGetByIdApi,
              shownFrom: 'name',
              readonly: false,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_MONEY,
              field: 'money',
              value: null,
              controlType: EnumFormBaseContolType.CURRENCY,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'min',
                  validator: Validators.min(0),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            {
              flexSize: 8,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
          ],
        ]
      },
    ];
  constructor(
    public override dialogService: DialogService,
    private appService: AppService, 
    private responseService: ResponseService,
    private alertService: AlertService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_MNG;

    this.crud = {
      c: api.HU_WELFARE_MNG_CREATE,
      r: api.HU_WELFARE_MNG_READ,
      u: api.HU_WELFARE_MNG_UPDATE,
      d: api.HU_WELFARE_MNG_DELETE,
    };

  }

  ngOnInit(): void {
    this.loading = true;
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;

    const regex: any = /^[0-9]+$/;
    this.subsctiptions.push(

      (this.defCosts = this.form.get('money')?.value),
      //check money
      this.form
        .get('money')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          setTimeout(() => {
            if (regex.test(this.form.get('money')?.value) || this.form.get('money')?.value == '') {
              this.defCosts = this.form.get('money')?.value;
            }
            this.form.get('money')?.setValue(this.defCosts);
          }, 50);
        })!,
      

      this.form.get('effectDate')?.valueChanges.pipe(distinctUntilChanged()).subscribe(ed => {

        if (!!ed) {

          this.subsctiptions.push(

            this.appService.post(api.HU_WELFARE_GETLIST_IN_PERIOD, { dateStart: ed }).subscribe(x => {
              if (x.ok && x.status === 200) {
                const body: IFormatedResponse = x.body
                if (body.statusCode === 200) {
                  const options: { value: number; text: string }[] = [];
                  body.innerBody.map((get: any) => {
                    options.push({
                      value: get.id,
                      text: get.name,
                    });
                  });
                  this.welfareOptions$.next(options);
                  this.form.get('welfareId')?.enable();

                } else {
                  //this.responseService.resolve(body)
                }
              } else {
                //this.alertService.error(JSON.stringify(x), alertOptions)
              }
            }
            ))
        }
      })!
    )

    
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subsctiptions.map(x => x?.unsubscribe() )
  }


}