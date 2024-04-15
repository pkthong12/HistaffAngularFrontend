import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { ICorePageEditCRUD, ICorePageEditColumnComposition } from 'src/app/libraries/core-page-edit/core-page-edit.component';

import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { EnumFormBaseContolType, ICoreFormSection } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { DialogService } from 'src/app/services/dialog.service';
import { ICoreDropdownOption } from 'src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component';
import { buffer, debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';

import { MultiLanguageService } from 'src/app/services/multi-language.service';
//import { CoreService } from 'src/app/services/core.service'; || DEPRECATED! USE AppService INSTEAD!!!
import { AppService } from 'src/app/services/app.service';
import { EnumCoreFormControlSeekerSourceType } from 'src/app/libraries/core-form-control-seeker/EnumCoreFormControlSeekerSourceType';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';

import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { ICoreChecklistOption } from 'src/app/libraries/core-checklist/core-checklist/core-checklist.component';
import { CustomValidators } from 'src/app/libraries/core-form/custom-validators';
import { debug } from 'console';
import { setPriority } from 'os';

@Component({
  selector: 'app-wage-edit',
  templateUrl: './wage-edit.component.html',
  styleUrls: ['./wage-edit.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class WageEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {

  /* Properties to be passed into core-page-edit */
  override entityTable = "HU_WORKING";

  @ViewChild('allowanceType') allowanceType!: TemplateRef<any>; // Tham chiếu đến template

  loading: boolean = false;
  bufferForm!: FormGroup;
  subscriptions: Subscription[] = [];
  defauleValueTaxtable: number = 1006; // sửa thánh getIdbycode sau
  defauleValueStatus: number = 993; // sửa thánh getIdbycode sau
  groupOptionsSalType$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalScale$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalRank$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalLevel$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsPosition$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsStatus$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsTitle$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsTypeWage$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsAllowanceType$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsTaxtable$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsRegion$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalScaleDCV$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalRankDCV$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalLevelDCV$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsEmployeeObj$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSignerPosition$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([
    {
      value: 1,
      text: "BHXH",
      checked: true
    },
    {
      value: 2,
      text: "BHYT",
      checked: true
    },
    {
      value: 3,
      text: "BHTNLĐ-BN",
      checked: true
    },
    {
      value: 4,
      text: "BHTN",
      checked: true
    },
  ])
  //subscriptionsStatus: Subscription[] = [];
  bhtypeGetByIdObject$ = new BehaviorSubject<any>(null);
  bhtypeGetByIdApi = null;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  signGetByIdObject$ = new BehaviorSubject<any>(null);
  signGetByIdApi = api.HU_EMPLOYEE_READ;

  employeeObjGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeObjGetByIdApi = api.SYS_OTHERLIST_READ;

  orgUnitGetByIdObject$ = new BehaviorSubject<any>(null);
  orgUnitGetByIdApi = api.OM_ORGANIZATION_READ;

  salScaleGetByIdObject$ = new BehaviorSubject<any>(null);
  salScaleGetByIdApi = api.HU_SALARY_SCALE_READ;

  salRankGetByIdObject$ = new BehaviorSubject<any>(null);
  salRankGetByIdApi = api.HU_SALARY_RANK_READ;

  salLevelGetByIdObject$ = new BehaviorSubject<any>(null);
  salLevelGetByIdApi = api.HU_SALARY_LEVEL_READ;

  statusGetByIdObject$ = new BehaviorSubject<any>(null);
  statusGetByIdApi = api.SYS_OTHERLIST_READ;

  typeWageGetByIdObject$ = new BehaviorSubject<any>(null);
  typeWageGetByIdApi = api.SYS_OTHERLIST_READ;

  taxTableGetByIdObject$ = new BehaviorSubject<any>(null);
  taxTableGetByIdApi = api.SYS_OTHERLIST_READ;

  allowanceTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  allowanceTypeGetByIdApi = api.HU_ALLOWANCE_READ;

  salScaleDCVGetByIdObject$ = new BehaviorSubject<any>(null);
  salScaleDCVGetByIdApi = api.HU_SALARY_SCALE_READ;

  salRankDCVGetByIdObject$ = new BehaviorSubject<any>(null);
  salRankDCVGetByIdApi = api.HU_SALARY_RANK_READ;

  salLevelDCVGetByIdObject$ = new BehaviorSubject<any>(null);
  salLevelDCVGetByIdApi = api.HU_SALARY_RANK_READ;

  salaryTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  salaryTypeGetByIdApi = api.HU_SALARY_TYPE_READ;
  
  signerPositionGetByIdObject$ = new BehaviorSubject<any>(null);
  signerPositionGetByIdApi = api.SYS_OTHERLIST_READ;


  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;

  allowanceTypeTemplate!: TemplateRef<any>;

  // Chuyển hàm callback thành arrow function. Và đặt định nghĩa này trước khi khai báo phần Sections cho form chính
  // Nếu dùng "onBufferFormCreated(form: FormGroup) {} như cũ thì từ this.appService sẽ bị undefined
  onBufferFormCreated = (form: FormGroup) => {

    this.bufferForm = form;
    this.subscriptions.push( // <== Outer push
      this.bufferForm.get('allowanceId')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          this.subscriptions.push( // <== Inner push

            this.appService
              .get(api.HU_ALLOWANCE_READ + '?id=' + x)

              // Api getById này đang vi phạm, không theo chuẩn FormatedResponse. cần sửa để đúng định dạng.

              .subscribe((res: any) => {
                if (!!res.ok && res.status === 200) {
                  const body: IFormatedResponse = res.body
                  if (body.statusCode === 200 && !!body.innerBody) {
                    this.bufferForm.get('allowanceName')?.setValue(res.body.innerBody.name);
                  }
                }
              })
          ) // Close inner push

        } else {
          //this.form.get('userName')?.disable()
          //this.form.get('fullname')?.disable()
        }
      })!
    )

    

    this.subscriptions.push(
      this.bufferForm
        .get('allowanceId')
        ?.valueChanges
        .subscribe((x) => {
          if (this.bufferForm.get('effectdate')?.value == null || this.bufferForm.get('effectdate')?.value == "")
          {
            this.bufferForm.get('effectdate')?.setValue(this.bufferForm.get('effectdate')?.value);
          }

          if (this.bufferForm.get('coefficient')?.value == null || this.bufferForm.get('coefficient')?.value == "")
          {
            this.bufferForm.get('coefficient')?.setValue(this.bufferForm.get('coefficient')?.value);
          }
        })!,

      this.bufferForm
        .get('effectdate')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (this.bufferForm.get('expireDate')?.value != null && this.bufferForm.get('expireDate')?.value != "")
          {
            this.bufferForm.get('expireDate')?.setValue(this.bufferForm.get('expireDate')?.value);
          }
        })!,

      this.bufferForm
        .get('expireDate')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (this.bufferForm.get('effectdate')?.value != null && this.bufferForm.get('effectdate')?.value != "") {
            this.bufferForm.get('effectdate')?.setValue(this.bufferForm.get('effectdate')?.value);
          }
        })!
    );
  }

  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EMPLOYEE_NAME,
              field: 'religionId',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: true,
              hidden: true,
            },
          ],
        ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EMPLOYEE_INFOR,
        rows: [
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EMPLOYEE_CODE,
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
              alsoBindTo: [{ takeFrom: 'fullname', bindTo: 'employeeName' },
              { takeFrom: 'orgName', bindTo: 'orgName' },
              { takeFrom: 'positionName', bindTo: 'positionName' },
              { takeFrom: 'religionName', bindTo: 'regionName' },
              { takeFrom: 'orgId', bindTo: 'orgId' },
              { takeFrom: 'religionId', bindTo: 'religionId' },
              ],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'text',
              readonly: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EMPLOYEE_NAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: false,
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_ORG_NAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: false,
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_JOB_NAME,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: false,
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_TYPE_NAME,
              field: 'typeId',
              value: '',
              getByIdObject$: this.typeWageGetByIdObject$,
              getByIdApi: this.typeWageGetByIdApi,
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.groupOptionsTypeWage$,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_DECISIONNO,
              field: 'decisionNo',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EFFECTDATE,
              field: 'effectDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'required',
                  validator: WageEditComponent.effectDate,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EFFECTDATE_GREAT_THAN_EXPIREDATE,
                },
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EXPIREDATE,
              field: 'expireDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              validators: [
                {
                  name: 'required',
                  validator: WageEditComponent.expireDate,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EXPIREDATE_LESS_THAN_EFFECTDATE,
                },
              ]
            },
          ],
          [
           
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_UPLOAD_FILE,
              field: 'attachmentBuffer',
              value: null,
              controlType: EnumFormBaseContolType.ATTACHMENT,
              assignTo: 'attachment',
              type: 'object',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_LIST_CHECK_INS,
              field: 'lstCheckIns',
              value: [],
              controlType: EnumFormBaseContolType.CHECKLIST,
              checklistOptions$: this.checklistOptions$,
              getByIdObject$: this.bhtypeGetByIdObject$,
              type: 'text',
              shownFrom: 'text',
              disabled: false,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EMPLOYEE_OBJ_NAME,
              field: 'employeeObjId',
              value: '',
              getByIdObject$: this.employeeObjGetByIdObject$,
              getByIdApi: this.employeeObjGetByIdApi,
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.groupOptionsEmployeeObj$,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ],
            },
          ]
        ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_INFOR_SALARY,
        rows:
          [
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SHORT_TEMP_SALARY,
                field: 'shortTempSalary',
                value: '',
                controlType: EnumFormBaseContolType.CURRENCY,
                pipe: EnumCoreTablePipeType.NUMBER,
                type: 'number',

              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_TAXTABLE,
                field: 'taxtableId',
                value: this.defauleValueTaxtable,
                getByIdObject$: this.taxTableGetByIdObject$,
                getByIdApi: this.taxTableGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsTaxtable$,
                type: 'number',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ],
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_REGION,
                field: 'regionName',
                value: '',
                type: 'text',
                controlType: EnumFormBaseContolType.TEXTBOX,
                readonly: false,
                disabled: true,
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_TYPE_NAME,
                field: 'salaryTypeId',
                value: '',
                getByIdObject$: this.salaryTypeGetByIdObject$,
                getByIdApi: this.salaryTypeGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsSalType$,
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
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_SCALE_NAME,
                field: 'salaryScaleId',
                value: '',
                getByIdObject$: this.salScaleGetByIdObject$,
                getByIdApi: this.salScaleGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsSalScale$,
                type: 'number',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ],
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_RANK_NAME,
                field: 'salaryRankId',
                value: '',
                getByIdObject$: this.salRankGetByIdObject$,
                getByIdApi: this.salRankGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsSalRank$,
                type: 'number',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ],
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_LEVEL_NAME,
                field: 'salaryLevelId',
                value: '',
                getByIdObject$: this.salLevelGetByIdObject$,
                getByIdApi: this.salLevelGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsSalLevel$,
                type: 'number',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ],
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_COEFFICIENT,
                field: 'coefficient',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'number',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ],
                readonly: false,
                disabled: true
              },
            ],
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_SCALE_DCV_NAME,
                field: 'salaryScaleDcvId',
                value: '',
                getByIdObject$: this.salScaleDCVGetByIdObject$,
                getByIdApi: this.salScaleDCVGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsSalScaleDCV$,
                type: 'number',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_RANK_DCV_NAME,
                field: 'salaryRankDcvId',
                value: '',
                getByIdObject$: this.salRankDCVGetByIdObject$,
                getByIdApi: this.salRankDCVGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsSalRankDCV$,
                type: 'number',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_LEVEL_DCV_NAME,
                field: 'salaryLevelDcvId',
                value: '',
                getByIdObject$: this.salLevelDCVGetByIdObject$,
                getByIdApi: this.salLevelDCVGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsSalLevelDCV$,
                type: 'number',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_COEFFICIENT_DCV,
                field: 'coefficientDcv',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'number',
                readonly: false,
                disabled: true
              },
            ],
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SAL_PERCENT,
                field: 'salPercent',
                value: 100,
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'number',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ],
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EXPIRE_UPSAL_DATE,
                field: 'expireUpsalDate',
                value: '',
                controlType: EnumFormBaseContolType.DATEPICKER,
                type: 'date',
              },
            ]
          ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_INFOR_ALLOWANCE,
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.NULL,
              field: 'allowances',
              value: [],
              controlType: EnumFormBaseContolType.GRIDBUFFER,
              type: 'children',
              // When using EnumFormBaseContolType.GRIDBUFFER
              onBufferFormCreated: this.onBufferFormCreated,
              gridBufferFormSections: [
                {
                  rows: [
                    [
                      {
                        flexSize: 3,
                        label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_ALLOWANCE_ID,
                        field: 'allowanceId',
                        value: '',
                        getByIdObject$: this.allowanceTypeGetByIdObject$,
                        getByIdApi: this.allowanceTypeGetByIdApi,
                        shownFrom: 'name',
                        controlType: EnumFormBaseContolType.DROPDOWN,
                        dropdownOptions$: this.groupOptionsAllowanceType$,
                        type: 'number'
                      },
                      {
                        flexSize: 3,
                        label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_COEFFICIENT,
                        field: 'coefficient',
                        value: '',
                        controlType: EnumFormBaseContolType.TEXTBOX,
                        type: 'number',
                        validators: [
                          {
                            name: 'requiredBecauseAllowanceHasValue2',
                            validator: WageEditComponent.requiredBecauseAllowanceHasValue2,
                            errorMessage: EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_REQUIRED_COEFFICIENT,
                          },
                        ]
                      },
                      {
                        flexSize: 3,
                        label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_EFFECTDATE,
                        field: 'effectdate',
                        value: '',
                        controlType: EnumFormBaseContolType.DATEPICKER,
                        type: 'date',
                        validators: [
                          {
                            name: 'requiredBecauseAllowanceHasValue',
                            validator: WageEditComponent.requiredBecauseAllowanceHasValue,
                            errorMessage: EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_REQUIRED_EFFECTDATE,
                          },
                          {
                            name: 'effectDateAllowance',
                            validator: WageEditComponent.effectDateAllowance,
                            errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
                          }
                        ],
                        
                      },
                      {
                        flexSize: 3,
                        label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_EXPIREDATE,
                        field: 'expireDate',
                        value: '',
                        controlType: EnumFormBaseContolType.DATEPICKER,
                        type: 'date',
                        validators: [
                          {
                            name: 'expireDateAllowance',
                            validator: WageEditComponent.expireDateAllowance,
                            errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
                          },
                        ],
                        
                      },
                      {
                        flexSize: 3,
                        label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_ALLOWANCE_ID,
                        field: 'allowanceName',
                        value: '',
                        controlType: EnumFormBaseContolType.TEXTBOX,
                        type: 'text',
                        hidden: true,
                      },
                    ]
                  ]
                }
              ],
              gridBufferTableColumns: [
                {
                  caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_ID,
                  field: 'id',
                  hidden: true,
                  type: 'string',
                  align: 'left',
                  width: 30,
                },
                {
                  caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_ALLOWANCE_ID,
                  field: 'allowanceId',
                  type: 'number',
                  align: 'left',
                  hidden: true, // ẩn cột ID này đi (nhưng vẫn phải có vì nó thuộc về Entity của children)
                  width: 30,
                },
                {
                  caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_ALLOWANCE_ID,
                  field: 'allowanceName',  // hiển thị cột này, muốn vậy phần BE cần join để lấy ra cột này
                  type: 'string',
                  align: 'left',
                  width: 200 * 2,
                },
                {
                  caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_COEFFICIENT,
                  field: 'coefficient',
                  pipe: EnumCoreTablePipeType.DECIMAL_TO_FIX_5,
                  type: 'number',
                  align: 'left',
                  width: 200 * 2,
                },
                {
                  caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_EFFECTDATE,
                  field: 'effectdate',
                  pipe: EnumCoreTablePipeType.DATE,
                  type: 'date',
                  align: 'left',
                  width: 200 * 2,
                },
                {
                  caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_EXPIREDATE,
                  field: 'expireDate',
                  pipe: EnumCoreTablePipeType.DATE,
                  type: 'date',
                  align: 'left',
                  width: 200 * 2,
                },
              ]
            },
          ]
        ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_INFOR_APPROVE,
        rows:
          [
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_STATUS,
                field: 'statusId',
                value: this.defauleValueStatus,
                getByIdObject$: this.statusGetByIdObject$,
                getByIdApi: this.statusGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsStatus$,
                type: 'number',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ]
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SIGNDATE,
                field: 'signDate',
                value: '',
                controlType: EnumFormBaseContolType.DATEPICKER,
                type: 'date',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SIGNERNAME,
                field: 'signId',
                value: '',
                controlType: EnumFormBaseContolType.SEEKER,

                /* 
                  START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                  we must pass the three properties bellow:
                 */
                seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
                getByIdObject$: this.signGetByIdObject$,
                getByIdApi: this.signGetByIdApi,
                boundFrom: 'id',
                shownFrom: 'fullname',
                // alsoBindTo: [{ takeFrom: 'positionName', bindTo: 'signerPosition' }],
                /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
                type: 'text',
                readonly: true,
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SIGNER_POSITION,
                field: 'signerPosition',
                value: '',
                controlType: EnumFormBaseContolType.DROPDOWN,
                getByIdObject$: this.signerPositionGetByIdObject$,
                getByIdApi: this.signerPositionGetByIdApi,
                shownFrom: 'name',
                dropdownOptions$: this.groupOptionsSignerPosition$,
                type: 'number',
                // readonly: false,
                // disabled: true
              },
            ],
            [
              {
                flexSize: 6,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_NOTE,
                field: 'note',
                value: '',
                controlType: EnumFormBaseContolType.TEXTAREA,
                type: 'text',
                textareaRows: 3
              },
            ]
          ]
      },
    ];
  constructor(
    //private _coreService: CoreService,
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private commonHttpRequestService: CommonHttpRequestService,
    private appService: AppService // CoreService is DEPRECATED!!!
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_WAGE_EDIT;

    this.crud = {
      c: api.HU_WAGE_CREATE,
      r: api.HU_WAGE_READ,
      u: api.HU_WAGE_UPDATE,
      d: api.HU_WAGE_DELETE,
    };
  }
  ngOnInit(): void { }

  sub2Done!: boolean
  sub3Done!: boolean
  sub4Done!: boolean
  sub5Done!: boolean
  sub6Done!: boolean
  sub7Done!: boolean

  ngAfterViewInit(): void {

    setTimeout(() => {
      

      //1-----
      this.sections.map(section => {
        section.rows.map(row => {
          row.map(control => {
            if (control.field === 'allowances') {
              const filter = control.gridBufferTableColumns?.filter(x => x.field === 'allowanceName');
              if (filter?.length) {
                filter[0].templateRef = this.allowanceTypeTemplate;
              }
            }
          })
        })
      })

      this.loading = true;
      /* Each subscribe() need to be in one this.subscriptions.push */
      // Start PUSHING 1ST Subsctiption
      //2------
      this.subscriptions.push(
        this.appService
          .get(api.HU_SALARY_TYPE_GETLIST)
          .subscribe((res: any) => {
            this.sub2Done = true;
            if (!!res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200 && !!body.innerBody) {
                const options: { value: number | null; text: string; }[] = [];
                options.push({
                  value: Number(),
                  text: ''
                })
                res.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name
                  })
                })
                this.groupOptionsSalType$.next(options);
              }
            }
          })
      ) // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()

      // Start PUSHING 2ND Subsctiption
      //3------
      this.subscriptions.push(
        this.appService
          .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'STATUS')
          .subscribe((res: any) => {
            this.sub3Done = true
            if (!!res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200 && !!body.innerBody) {
                // ONLY THEN YOU WILL IMPLEMENT YOUR LOGICS
                const options: { value: number | null; text: string; }[] = [];
                options.push({
                  value: Number(),
                  text: ''
                })
                res.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name
                  })
                })
                this.groupOptionsStatus$.next(options);

              }
            }
          })
      ) // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()

      //4--------
      this.subscriptions.push(
        this.appService
          .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'TAXTABLE')
          .subscribe((res: any) => {
            this.sub4Done = true
            if (!!res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200 && !!body.innerBody) {
                // ONLY THEN YOU WILL IMPLEMENT YOUR LOGICS
                const options: { value: number | null; text: string; }[] = [];
                options.push({
                  value: Number(),
                  text: ''
                })
                res.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name
                  })
                })
                this.groupOptionsTaxtable$.next(options);
              }
            }
          })
      ) // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()

      // Start PUSHING 3RD Subsctiption
      //5----------
      this.subscriptions.push(
        this.appService
          .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'WAGE_TYPE')
          .subscribe((res: any) => {
            this.sub5Done = true
            if (!!res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200 && !!body.innerBody) {


                const options: { value: number | null; text: string; }[] = [];
                options.push({
                  value: Number(),
                  text: ''
                })
                res.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name
                  })
                })
                this.groupOptionsTypeWage$.next(options);
              }
            }
          })
      ) // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()

      // Start PUSHING 5TH Subsctiption
      //6-------------------
      this.subscriptions.push(
        this.appService
          .get(api.HU_SALARY_SCALE_GETLIST)
          .subscribe((res: any) => {
            this.sub6Done = true
            if (!!res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200 && !!body.innerBody) {
                const options: { value: number | null; text: string; }[] = [];
                options.push({
                  value: Number(),
                  text: ''
                })
                const optionsDCV: { value: number | null; text: string; }[] = [];
                optionsDCV.push({
                  value: Number(),
                  text: ''
                })
                res.body.innerBody.map((g: any) => {
                  if (g.isTableScore == true) {
                    optionsDCV.push({
                      value: g.id,
                      text: g.name
                    })
                  } else {
                    options.push({
                      value: g.id,
                      text: g.name
                    })
                  }
                })
                this.groupOptionsSalScale$.next(options);
                this.groupOptionsSalScaleDCV$.next(optionsDCV);

              }
            }
          })
      ) // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()

      //7--------------
      this.subscriptions.push(
        this.appService
          .get(api.HU_ALLOWANCE_GETLIST)
          .subscribe((res: any) => {
            this.sub7Done = true
            if (!!res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200 && !!body.innerBody) {


                const options: { value: number | null; text: string; }[] = [];
                options.push({
                  value: Number(),
                  text: ''
                })
                res.body.innerBody.map((g: any) => {
                  if (g.isSal == true) {
                    options.push({
                      value: g.id,
                      text: g.name
                    })
                  }
                })
                this.groupOptionsAllowanceType$.next(options);
              }
            }
          })
      )

      this.subscriptions.push(
        this.appService
          .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'CDK')
          .subscribe((res: any) => {
            if (!!res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200 && !!body.innerBody) {
                const options: { value: number | null; text: string; }[] = [];
                res.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name
                  })
                })
                this.groupOptionsSignerPosition$.next(options);
              }
            }
          })
      ) // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()

    })
    this.form.get('lstCheckIns')?.patchValue([1,2,3,4]);

  }

  /* GET FormGroup Instance */
  onFormCreated = (e: FormGroup) => {
    this.form = e;
    console.log(this.form);
    
    setTimeout(() => {      
      if (this.form.get('id')?.value && !!this.form.get('statusId')?.value && this.form.get('statusId')?.value == 994) {
        this.form.get('employeeId')?.disable();
        this.form.get('employeeName')?.disable();
        this.form.get('orgName')?.disable();
        this.form.get('positionName')?.disable();
        this.form.get('typeId')?.disable();
        this.form.get('decisionNo')?.disable();
        this.form.get('effectDate')?.disable();
        this.form.get('expireDate')?.disable();
        this.form.get('expireUpsalDate')?.disable();
        this.form.get('lstCheckIns')?.disable();
        this.form.get('employeeObjId')?.disable();
        this.form.get('shortTempSalary')?.disable();
        this.form.get('taxtableId')?.disable();

        this.form.get('regionName')?.disable();
        this.form.get('salaryTypeId')?.disable();
        this.form.get('salaryScaleId')?.disable();
        this.form.get('salaryRankId')?.disable();
        this.form.get('salaryLevelId')?.disable();

        this.form.get('coefficient')?.disable();
        this.form.get('salaryScaleDcvId')?.disable();
        this.form.get('salaryRankDcvId')?.disable();
        this.form.get('salaryLevelDcvId')?.disable();
        this.form.get('coefficientDcv')?.disable();

        this.form.get('salPercent')?.disable();

        this.form.get('statusId')?.disable();
        this.form.get('signDate')?.disable();
        this.form.get('signId')?.disable();
        // this.form.get('signerPosition')?.disable();
        this.form.get('attachmentBuffer')?.disable();
        this.form.get('note')?.disable();

        this.bufferForm.get('allowanceId')?.disable()
        this.bufferForm.get('coefficient')?.disable()
        this.bufferForm.get('effectdate')?.disable()
        this.bufferForm.get('expireDate')?.disable()

      }
    }, 1500)
    this.form.get('shortTempSalary')?.valueChanges.pipe(distinctUntilChanged())
      .subscribe(x => {
        if (!!this.form.get('statusId')?.value && this.form.get('statusId')?.value != 994){
          if (!!x) {
            this.form.get('taxtableId')?.disable();
            this.form.get('taxtableId')?.patchValue('');

            // this.form.get('salaryTypeId')?.disable();
            // this.form.get('salaryTypeId')?.patchValue('');

            this.form.get('salaryScaleId')?.disable();
            this.form.get('salaryScaleId')?.patchValue('');

            this.form.get('salaryRankId')?.disable();
            this.form.get('salaryRankId')?.patchValue('');

            this.form.get('salaryLevelId')?.disable();
            this.form.get('salaryLevelId')?.patchValue('');

            this.form.get('salaryScaleDcvId')?.disable();
            this.form.get('salaryScaleDcvId')?.patchValue('');

            this.form.get('salaryRankDcvId')?.disable();
            this.form.get('salaryRankDcvId')?.patchValue('');

            this.form.get('salaryLevelDcvId')?.disable();
            this.form.get('salaryLevelDcvId')?.patchValue('');

            this.form.get('coefficient')?.disable();
            this.form.get('coefficient')?.patchValue('');

            this.form.get('coefficientDcv')?.disable();
            this.form.get('coefficientDcv')?.patchValue('');

            this.form.get('expireUpsalDate')?.patchValue(null);


              // this.bufferForm.get('allowanceId')?.disable()
              // this.bufferForm.get('coefficient')?.disable()
              // this.bufferForm.get('effectdate')?.disable()
              // this.bufferForm.get('expireDate')?.disable()

            //this.form.get('fullname')?.enable()
          } else {
            this.form.get('taxtableId')?.enable();
            this.form.get('taxtableId')?.patchValue(1006);

            // this.form.get('salaryTypeId')?.enable();
            // this.form.get('salaryTypeId')?.patchValue('');

            this.form.get('salaryScaleId')?.enable();
            this.form.get('salaryScaleId')?.patchValue('');

            this.form.get('salaryRankId')?.enable();
            this.form.get('salaryRankId')?.patchValue('');

            this.form.get('salaryLevelId')?.enable();
            this.form.get('salaryLevelId')?.patchValue('');

            this.form.get('salaryScaleDcvId')?.enable();
            this.form.get('salaryScaleDcvId')?.patchValue('');

            this.form.get('salaryRankDcvId')?.enable();
            this.form.get('salaryRankDcvId')?.patchValue('');

            this.form.get('salaryLevelDcvId')?.enable();
            this.form.get('salaryLevelDcvId')?.patchValue('');

            this.form.get('coefficient')?.enable();
            this.form.get('coefficient')?.patchValue('');

            this.form.get('coefficientDcv')?.enable();
            this.form.get('coefficientDcv')?.patchValue('');

            this.form.get('expireUpsalDate')?.patchValue(null);


              this.bufferForm.get('allowanceId')?.enable()
              this.bufferForm.get('coefficient')?.enable()
              this.bufferForm.get('effectdate')?.enable()
              this.bufferForm.get('expireDate')?.enable()

            
            //this.form.get('fullname')?.disable()
          }
        }
      })!
    this.subscriptions.push( // <== Outer push
      this.form.get('salaryScaleId')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe(x => {
          if (!!x) {
            //this._coreService !!!!!! CoreService DEPRECATED! USE AppService INSTEAD!!!

            this.subscriptions.push( // <== Inner push

              this.appService
                .get(api.HU_SALARY_RANK_BYSCALEID + x)
                .subscribe((res: any) => {


                  if (!!res.ok && res.status === 200) {
                    const body: IFormatedResponse = res.body
                    if (body.statusCode === 200 && !!body.innerBody) {
                      const options: { value: number | null; text: string }[] = [];
                      options.push({
                        value: null,
                        text: '',
                      })
                      res.body.innerBody.map((g: any) => {
                        options.push({
                          value: g.id,
                          text: g.name,
                        })
                      })
                      this.groupOptionsSalRank$.next(options);

                    }
                  }
                })
            ) // <== CLOSE INNER PUSH

          } else {
            //this.form.get('userName')?.disable()
            //this.form.get('fullname')?.disable()
          }

        })!

    ) // <== CLOSE OUTER PUSH

    this.subscriptions.push( // <== Outer push
      this.form.get('salaryRankId')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe(x => {
          if (!!x) {
            this.subscriptions.push( // <== Inner push

              this.appService
                .get(api.HU_SALARY_LEVEL_BYRANKID + x)
                .subscribe((res: any) => {


                  if (!!res.ok && res.status === 200) {
                    const body: IFormatedResponse = res.body
                    if (body.statusCode === 200 && !!body.innerBody) {


                      const options: { value: number | null; text: string; }[] = [];
                      options.push({
                        value: Number(),
                        text: ''
                      })
                      res.body.innerBody.map((g: any) => {
                        options.push({
                          value: g.id,
                          text: g.name
                        })
                      })
                      this.groupOptionsSalLevel$.next(options);
                    }
                  }

                  this.form.get('salaryRankId')?.setValue(this.form.get('salaryRankId')?.value);

                })
            ) // Close inner push

          } else {
            //this.form.get('userName')?.disable()
            //this.form.get('fullname')?.disable()
          }
        })!
    ) // Close outer push   

    this.subscriptions.push( // <== Outer push
      this.form.get('salaryScaleDcvId')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe(x => {
          if (!!x) {
            //this._coreService !!!!!! CoreService DEPRECATED! USE AppService INSTEAD!!!

            this.subscriptions.push( // <== Inner push

              this.appService
                .get(api.HU_SALARY_RANK_BYSCALEID + x)
                .subscribe((res: any) => {


                  if (!!res.ok && res.status === 200) {
                    const body: IFormatedResponse = res.body
                    if (body.statusCode === 200 && !!body.innerBody) {
                      const options: { value: number | null; text: string }[] = [];
                      options.push({
                        value: null,
                        text: '',
                      })
                      res.body.innerBody.map((g: any) => {
                        options.push({
                          value: g.id,
                          text: g.name,
                        })
                      })
                      this.groupOptionsSalRankDCV$.next(options);

                    }
                  }
                })
            ) // <== CLOSE INNER PUSH

          } else {
            //this.form.get('userName')?.disable()
            //this.form.get('fullname')?.disable()
          }

        })!

    ) // <== CLOSE OUTER PUSH

    // Start PUSHING 4RD Subsctiption
    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'OBJECT_EMPLOYEE').subscribe((res: any) => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body;
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string }[] = [];
            options.push({
              value: Number(),
              text: '',
            });
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
              });
            });
            this.groupOptionsEmployeeObj$.next(options);
          }
        }
      }),
    ); // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()

    this.subscriptions.push( // <== Outer push
      this.form.get('salaryRankDcvId')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe(x => {
          if (!!x) {
            this.subscriptions.push( // <== Inner push

              this.appService
                .get(api.HU_SALARY_LEVEL_BYRANKID + x)
                .subscribe((res: any) => {
                  if (!!res.ok && res.status === 200) {
                    const body: IFormatedResponse = res.body
                    if (body.statusCode === 200 && !!body.innerBody) {
                      const options: { value: number | null; text: string; }[] = [];
                      options.push({
                        value: Number(),
                        text: ''
                      })
                      res.body.innerBody.map((g: any) => {
                        options.push({
                          value: g.id,
                          text: g.name
                        })
                      })
                      this.groupOptionsSalLevelDCV$.next(options);
                    }
                  }
                  this.form.get('salaryRankDcvId')?.setValue(this.form.get('salaryRankDcvId')?.value);
                })
            ) // Close inner push

          } else {
            //this.form.get('userName')?.disable()
            //this.form.get('fullname')?.disable()
          }
        })!
    ) // Close outer push  

    this.subscriptions.push( // <== Outer push
      this.form.get('salaryLevelDcvId')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe(x => {
          if (!!x) {
            this.subscriptions.push( // <== Inner push
              this.appService
                .get(api.HU_SALARY_LEVEL_READ + '?id=' + x)
                .subscribe((res: any) => {
                  if (!!res.ok && res.status === 200) {
                    const body: IFormatedResponse = res.body
                    if (body.statusCode === 200 && !!body.innerBody) {
                      this.form.get('coefficientDcv')?.setValue(body.innerBody.coefficient);
                    }
                  }
                })
            ) // Close inner push
          } else {
            //this.form.get('userName')?.disable()
            //this.form.get('fullname')?.disable()
          }
        })!
    ) // Close outer push  

    this.subscriptions.push( // <== Outer push
      this.form.get('salaryLevelDcvId')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe(x => {
          if (!!x) {
            this.subscriptions.push( // <== Inner push
              this.appService
                .get(api.HU_SALARY_LEVEL_READ + '?id=' + x)
                .subscribe((res: any) => {
                  if (!!res.ok && res.status === 200) {
                    const body: IFormatedResponse = res.body
                    if (body.statusCode === 200 && !!body.innerBody) {
                      this.form.get('coefficientDcv')?.setValue(body.innerBody.coefficient);
                    }
                  }
                })
            ) // Close inner push
          } else {
            //this.form.get('userName')?.disable()
            //this.form.get('fullname')?.disable()
          }
        })!
    ) // Close outer push 

    this.form.get('effectDate')?.valueChanges.pipe(distinctUntilChanged())
      .pipe(
        filter(_ => {
          const touched = this.form.get('effectDate')?.touched;
          return !!touched
        })
      ).subscribe(x => {
        if (!!x) {
          if (!!this.form.get('employeeId')?.value) {
            var levelId = 0;
            if (!!this.form.get('salaryLevelId')?.value) {
              levelId = this.form.get('salaryLevelId')?.value;
            }else{
              this.form.get('expireUpsalDate')?.patchValue(null);
              return;
            }
            this.CalculateExpireShortTemp(this.form.get('employeeId')?.value, new Date(x).toLocaleDateString("en-US"), levelId)
          }else{
            this.form.get('expireUpsalDate')?.patchValue(null);
          }
        } else {
          this.form.get('expireUpsalDate')?.patchValue(null);
        }
      })

    this.form.get('salaryLevelId')?.valueChanges.pipe(distinctUntilChanged())
    .pipe(
      filter(_ => {
        const touched = this.form.get('salaryLevelId')?.touched;
        return !!touched
      })
    ).subscribe(x => {
      if (!!x) {
        this.subscriptions.push( // <== Inner push
          this.appService
            .get(api.HU_SALARY_LEVEL_READ + '?id=' + x)
            .subscribe((res: any) => {
              if (!!res.ok && res.status === 200) {
                const body: IFormatedResponse = res.body
                if (body.statusCode === 200 && !!body.innerBody) {
                  this.form.get('coefficient')?.setValue(body.innerBody.coefficient);
                }
              }
            })
        ) // Close inner push
        if (!!this.form.get('employeeId')?.value && !!this.form.get('effectDate')?.value){        
          const date = new Date(this.form.get('effectDate')?.value).toLocaleDateString("en-US");      
          this.CalculateExpireShortTemp(this.form.get('employeeId')?.value,date,x)
        }else{
          this.form.get('expireUpsalDate')?.patchValue(null);
        }

      } else {
        this.form.get('coefficient')?.setValue(null);
        this.form.get('expireUpsalDate')?.patchValue(null);
      }
    })

    this.subscriptions.push(
      this.form.get('attachment')?.valueChanges.subscribe(x => {
        console.log(x);
        debugger
        
      })!
    )

  }
  CalculateExpireShortTemp(empId: any, date: any, levelId: any) {
    if (this.form.get('shortTempSalary')?.value != '' && this.form.get('shortTempSalary')?.value != null && this.form.get('shortTempSalary')?.value != undefined) {
      levelId = 0;
    }
    this.subscriptions.push( // <== Inner push
      this.appService
        .get(api.HU_WAGE_EXPIRE_SHORT_TEMP + empId + "&date=" + date + "&levelId=" + levelId)
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              var dateNew = new Date(body.innerBody);
              this.form.get('expireUpsalDate')?.patchValue(dateNew);
            }
          }
        }))


  }
  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

  static effectDateAllowance(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = "";
    const effectDate = date.value;
    const expireDate = date.parent?.get("expireDate")?.value;
    if (expireDate != "" && expireDate != null && effectDate > expireDate) {
      valid = false;
      errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_ALLOWANCE_EFFECTDATE_GREAT_THAN_EXPIREDATE
    }
    return CustomValidators.core("effectDateAllowance", valid, errorMessage)(date)
  }

  static expireDateAllowance(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = "";
    const effectDate = date.parent?.get("effectdate")?.value;
    const expireDate = date.value;
    if (effectDate != "" && effectDate != null && expireDate < effectDate) {
      valid = false;
      errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_ALLOWANCE_EXPIREDATE_LESS_THAN_EFFECTDATE
    }
    return CustomValidators.core("expireDateAllowance", valid, errorMessage)(date)
  }

  protected static effectDate(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = "";
    const effectDate = date.value;
    const expireDate = date.parent?.get("expireDate")?.value;
    if (expireDate != "" && expireDate != null && effectDate != null) {
      if (effectDate > new Date(expireDate)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EFFECTDATE_GREAT_THAN_EXPIREDATE
        return CustomValidators.core("effectdate", false, errorMessage)(date)
      } else {
        date.parent?.get("effectdate")?.setErrors(null);
        date.parent?.get("expireDate")?.setErrors(null);
      }
    }
  }

  protected static expireDate(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = "";
    const effectDate = date.parent?.get("effectDate")?.value;
    const expireDate = date.value;
    if (expireDate != "" && expireDate != null) {
      if (effectDate != "" && effectDate != null && expireDate < new Date(effectDate)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EXPIREDATE_LESS_THAN_EFFECTDATE
        return CustomValidators.core("expireDate", false, errorMessage)(date)
      } else {
        date.parent?.get("effectDate")?.setErrors(null);
        date.parent?.get("expireDate")?.setErrors(null);
      }
    } else {
      // date.parent?.get("effectDate")?.setErrors(null);
      date.parent?.get("expireDate")?.setErrors(null);
    }
  }


  static requiredBecauseAllowanceHasValue(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage = "";

    const effectDate = control.value;
    const allowanceId = control.parent?.get("allowanceId")?.value;
    
    if (
      allowanceId != ""
      && allowanceId != null
      && (effectDate == "" || effectDate == null)
    )
    {
      valid = false;
      errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_REQUIRED_EFFECTDATE
    }

    return CustomValidators.core("requiredBecauseAllowanceHasValue", valid, errorMessage)(control)
  }


  static requiredBecauseAllowanceHasValue2(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage = "";

    const coefficient = control.value;
    const allowanceId = control.parent?.get("allowanceId")?.value;
    
    if (
      allowanceId != ""
      && allowanceId != null
      && (coefficient == "" || coefficient == null)
    )
    {
      valid = false;
      errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_REQUIRED_COEFFICIENT
    }

    return CustomValidators.core("requiredBecauseAllowanceHasValue2", valid, errorMessage)(control)
  }
}