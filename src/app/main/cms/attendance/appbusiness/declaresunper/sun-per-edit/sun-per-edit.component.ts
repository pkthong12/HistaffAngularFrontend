
import { Component } from "@angular/core";
import { api } from 'src/app/constants/api/apiDefinitions';
import { ICorePageEditCRUD, ICorePageEditColumnComposition } from "src/app/libraries/core-page-edit/core-page-edit.component";
import { BehaviorSubject, map, pipe, Subscription } from 'rxjs';
import { FormGroup, Validators } from "@angular/forms";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { BaseEditComponent } from "src/app/libraries/base-edit/base-edit/base-edit.component";
import { EnumFormBaseContolType, ICoreFormSection } from "src/app/libraries/core-form/core-form/enum-interfaces";
import { DialogService } from "src/app/services/dialog.service";
import { ICoreDropdownOption } from "src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component";
import { EnumCoreFormControlSeekerSourceType } from "src/app/libraries/core-form-control-seeker/EnumCoreFormControlSeekerSourceType";
import { EnumCoreTablePipeType } from "src/app/libraries/core-table/EnumCoreTablePipeType";
import { IFormatedResponse } from "src/app/interfaces/IFormatedResponse";
import { AppService } from "src/app/services/app.service";
@Component({
  selector: 'app-sun-per-edit',
  templateUrl: './sun-per-edit.component.html',
  styleUrls: ['./sun-per-edit.component.scss']
})
export class SunPerEditComponent extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */
  override entityTable = 'AT_DECLARE_SENIORITY';

  loading: boolean = false;

  salaryPeriodOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atSalaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  atSalaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;


  atSalaryPeriodGetById2Object$ = new BehaviorSubject<any>(null);
  atSalaryPeriodGetById2Api = api.AT_SALARY_PERIOD_READ;


  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;
  subsctiptions: Subscription[] = [];
  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: 0,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            }
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_EMPLOYEECODE,
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
                { takeFrom: 'orgName', bindTo: 'orgName' }],
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
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_EMPLOYEENAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_ORGNAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_TITLENAME,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_YEAR_DECLARE,
              field: 'yearDeclare',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'number',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_MONTH_ADJUST,
              field: 'monthAdjust',
              value: '',
              getByIdObject$: this.atSalaryPeriodGetByIdObject$,
              getByIdApi: this.atSalaryPeriodGetByIdApi,
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              dropdownOptions$: this.salaryPeriodOptions$,
              type: 'text',
              disabled: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_NUMBER_MONTH_ADJUST,
              field: 'monthAdjustNumber',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'number',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_REASON_ADJUST_SENIORITY,
              field: 'reasonAdjust',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
            }
          ],

          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_MONTH_DAY_OFF,
              field: 'monthDayOff',
              value: '',
              getByIdObject$: this.atSalaryPeriodGetById2Object$,
              getByIdApi: this.atSalaryPeriodGetById2Api,
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              dropdownOptions$: this.salaryPeriodOptions$,
              type: 'text',
              disabled: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_NUMBER_DAY_OFF,
              field: 'numberDayOff',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'number',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_REASON_ADJUST_DAY_OFF,
              field: 'reasonAdjustDayOff',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_ADJUST_TOTAL_DAY_OFF,
              field: 'total',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'number',
            }
          ],
        ]
      }
    ];

  constructor(public override dialogService: DialogService,
    private appService: AppService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_DECLARE_SENIORITY_EDIT;

    this.crud = {
      c: api.AT_DECLARE_SENIORITY_CREATE,
      r: api.AT_DECLARE_SENIORITY_READ,
      u: api.AT_DECLARE_SENIORITY_UPDATE,
      d: api.AT_DECLARE_SENIORITY_DELETE,
    };
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;


    const yearDeclare = this.form.get('yearDeclare');
    const numberDayOff = this.form.get('numberDayOff');
    const employeeId = this.form.get('employeeId');
    const total = this.form.get('total');
    if (yearDeclare) {
      this.subsctiptions.push(
        yearDeclare.valueChanges.subscribe((x: any) => {
          if (yearDeclare.value != null && yearDeclare.value != "") {
            this.form.get('monthAdjust')?.enable();
            this.form.get('monthDayOff')?.enable();
          }
          else {
            this.form.get('monthAdjust')?.disable();
            this.form.get('monthDayOff')?.disable();
          }
          if (!!x) {
            this.subsctiptions.push(
              this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_IN_YEAR, { year: yearDeclare.value }).subscribe((x) => {
                if (x.ok && x.status === 200) {
                  const body: IFormatedResponse = x.body;
                  if (body.statusCode === 200) {
                    const options: { value: number; text: string; code: string }[] = [];
                    body.innerBody.map((get: any) => {
                      options.push({
                        value: get.id,
                        text: get.name,
                        code: get.month,
                      });
                    });
                    this.salaryPeriodOptions$.next(options);
                  }
                }
              }),
            );
          } else {
            this.form.get('monthAdjust')?.setValue(null);
            this.form.get('monthAdjust')?.disable();
            this.form.get('monthDayOff')?.setValue(null);
            this.form.get('monthDayOff')?.disable();
          }
        })
      )
    }
    if (numberDayOff&&employeeId&&total) {
      this.subsctiptions.push(
        numberDayOff.valueChanges.subscribe((x: any) => {
          if (numberDayOff.value != null && numberDayOff.value != "") {
            // cal api calculate
            this.subsctiptions.push(
              this.appService.get(api.AT_DECLARE_SENIORITY_GET_TOTAL+'?employeeId='+employeeId.value).subscribe((x) => {
                if (x.ok && x.status === 200) {
                  const body: IFormatedResponse = x.body;
                  if (body.statusCode === 200) {
                    total.setValue(Number(numberDayOff.value)+ Number(body.innerBody))
                  }
                }
              }),
            );

          }
        }))

    }
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}
