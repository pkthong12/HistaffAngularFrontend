
import { Component } from "@angular/core";
import { api } from 'src/app/constants/api/apiDefinitions';
import { ICorePageEditCRUD, ICorePageEditColumnComposition } from "src/app/libraries/core-page-edit/core-page-edit.component";

import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { BaseEditComponent } from "src/app/libraries/base-edit/base-edit/base-edit.component";
import { EnumFormBaseContolType, ICoreFormSection } from "src/app/libraries/core-form/core-form/enum-interfaces";
import { DialogService } from "src/app/services/dialog.service";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { ICoreDropdownOption } from "src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component";
import { map } from "rxjs";
import { EnumCoreFormControlSeekerSourceType } from "src/app/libraries/core-form-control-seeker/EnumCoreFormControlSeekerSourceType";
import { EnumCoreTablePipeType } from "src/app/libraries/core-table/EnumCoreTablePipeType";
import { CustomValidators } from "src/app/libraries/core-form/custom-validators";

@Component({
  selector: 'app-setup-time-emp-edit',
  templateUrl: './setuptimeemp-edit.component.html',
  styleUrls: ['./setuptimeemp-edit.component.scss'],
})
export class SetupTimeEmpEditComponent extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */
  override entityTable = 'AT_SETUP_TIME_EMP';

  loading: boolean = false;

    employeeGetByIdObject$ = new BehaviorSubject<any>(null);
    employeeGetByIdApi = api.HU_EMPLOYEE_READ;

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
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_EMPLOYEE_CODE,
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
                            { takeFrom: 'orgName', bindTo: 'orgName'}],
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
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_EMPLOYEE_NAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text', 
              disabled: true,
              // validators: [
              //   {
              //     name: 'required',
              //     validator: Validators.required,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //   },
              // ]
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_EMPLOYEE_POSITION,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              disabled: true,
              // validators: [
              //   {
              //     name: 'required',
              //     validator: Validators.required,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //   },
              // ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_ORGANIZATION_NAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              disabled: true,
              // validators: [
              //   {
              //     name: 'required',
              //     validator: Validators.required,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //   },
              // ]
            },
          ], 
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_NUMBER_SWIPECARD,
              field: 'numberSwipecard',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_START_DATE_HL,
              field: 'startDateHl',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              readonly: false,
              type: 'date',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'startDateHl',
                  validator: SetupTimeEmpEditComponent.effectDate,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_TO_DATE_LESS_THAN_FROM_DATE,
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_END_DATE_HL,
              field: 'endDateHl',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              readonly: false,
              type: 'date',
              validators: [
                {
                  name: 'endDateHl',
                  validator: SetupTimeEmpEditComponent.expireDate,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_FROM_DATE_MORE_THAN_TO_DATE,
                },
              ]
            }
          ],
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_POSITION_ID,
              field: 'isActive',
              value: 1,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_DESCRIPTION,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text'
            }
          ]
        ]
      }
    ];

  constructor(public override dialogService: DialogService,
    private fb: FormBuilder) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_SETUP_TIME_EMP;

    this.crud = {
      c: api.AT_SETUP_TIME_EMP_CREATE,
      r: api.AT_SETUP_TIME_EMP_READ,
      u: api.AT_SETUP_TIME_EMP_UPDATE,
      d: api.AT_SETUP_TIME_EMP_DELETE,
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

  ngOnInt(){
    // this.form = this.fb.group({
    //   startDateHl: [null, [Validators.required, SetupTimeEmpEditComponent.effectDate],],
    //   endDateHl: [null, SetupTimeEmpEditComponent.expireDate],
    // })
  }

  protected static effectDate(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const startDateH1 = date.value;
    const endDateH2 = date.parent?.get('endDateHl')?.value;
    if (endDateH2 != '' && endDateH2 != null && startDateH1 != null) {
      if (startDateH1 > new Date(endDateH2)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_FORM_CONTROL_ERROR_TO_DATE_LESS_THAN_FROM_DATE;
        return CustomValidators.core('startDateHl', false, errorMessage)(date);
      } else {
        date.parent?.get('startDateHl')?.setErrors(null);
        date.parent?.get('endDateHl')?.setErrors(null);
      }
    }
  }

  protected static expireDate(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const startDateH1 = date.parent?.get('startDateHl')?.value;
    const endDateH2 = date.value;
    if (endDateH2 != '' && endDateH2 != null) {
      if (startDateH1 != '' && startDateH1 != null && endDateH2 < new Date(startDateH1)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_FORM_CONTROL_ERROR_FROM_DATE_MORE_THAN_TO_DATE;
        return CustomValidators.core('endDateHl', false, errorMessage)(date);
      } else {
        date.parent?.get('startDateH1')?.setErrors(null);
        date.parent?.get('endDateHl')?.setErrors(null);
      }
    } else {
      date.parent?.get('endDateH2')?.setErrors(null);
    }
  }
}
