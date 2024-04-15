import { Component } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { ICorePageEditCRUD, ICorePageEditColumnComposition } from 'src/app/libraries/core-page-edit/core-page-edit.component';

import { FormGroup, Validators } from '@angular/forms';
import { EnumFormBaseContolType, ICoreFormSection } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { DialogService } from 'src/app/services/dialog.service';
import { CoreFormService } from 'src/app/libraries/core-form/core-form.service';

import { BehaviorSubject, Subscription, map, } from 'rxjs';
import { ICoreDropdownOption } from 'src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component';
import { WorkingBeforeEditService } from './working-before-edit.service';
import { EnumCoreFormControlSeekerSourceType } from 'src/app/libraries/core-form-control-seeker/EnumCoreFormControlSeekerSourceType';

@Component({
  selector: 'app-working-before-edit',
  templateUrl: './working-before-edit.component.html',
  styleUrls: ['./working-before-edit.component.scss']
})
export class WorkingBeforeEditComponent extends BaseEditComponent {

  /* Properties to be passed into core-page-edit */

  override entityTable = "HU_WORKING_BEFORE";

  loading: boolean = false;
  subsctiptions: Subscription[] = [];

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
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_ID,
              field: 'id',
              value: 0,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'number'
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_EMPLOYEE_CODE,
              field: 'employeeId',
              value: null,
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
              alsoBindTo: [{ takeFrom: 'positionName', bindTo: 'positionName' },{ takeFrom: 'fullname', bindTo: 'employeeName' },{ takeFrom: 'orgName', bindTo: 'orgName' }],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_EMPLOYEE_NAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: true
            }
          ]
        ],
      },
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_POSITION_NAME,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: true
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_ORG_NAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: true
            }
          ]
        ]
      }, 
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_COMPANY_NAME,
              field: 'companyName',
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
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_TITLE_NAME,
              field: 'titleName',
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
            }
          ]
        ]
      }, 
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_FROM_DATE,
              field: 'fromDate',
              value: null,
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
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_END_DATE,
              field: 'endDate',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            }
          ]
        ]
      }, 
      {
        rows: [
          [
            // {
            //   flexSize: 6,
            //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_MAIN_DUTY,
            //   field: 'mainDuty',
            //   value: '',
            //   controlType: EnumFormBaseContolType.TEXTBOX,
            //   type: 'text'
            // },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_TER_REASON,
              field: 'terReason',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            }
          ]
        ]
      }
    ];
  constructor(
    public override dialogService: DialogService,
    private WorkingBeforeEditService: WorkingBeforeEditService,
    private coreFormService: CoreFormService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_WORKING_BEFORE_EDIT;

    this.crud = {
      c: api.HU_WORKING_BEFORE_CREATE,
      r: api.HU_WORKING_BEFORE_READ,
      u: api.HU_WORKING_BEFORE_UPDATE,
      d: api.HU_WORKING_BEFORE_DELETE,
    };

  }

  ngOnInit(): void {
    this.loading = true;
  }
  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e as FormGroup;
  }
  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}
