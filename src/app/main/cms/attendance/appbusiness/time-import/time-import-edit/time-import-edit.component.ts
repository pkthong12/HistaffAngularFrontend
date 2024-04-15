import { Component, ViewEncapsulation } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { setCulture } from "@syncfusion/ej2-base";
import { BehaviorSubject, map , Subscription, Observable} from "rxjs";
import { api } from "src/app/constants/api/apiDefinitions";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { BaseEditComponent } from "src/app/libraries/base-edit/base-edit/base-edit.component";
import { ICoreDropdownOption } from "src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component";
import { ICoreFormSection, EnumFormBaseContolType } from "src/app/libraries/core-form/core-form/enum-interfaces";
import { ICorePageEditCRUD } from "src/app/libraries/core-page-edit/core-page-edit.component";
import { DialogService } from "src/app/services/dialog.service";
import { AppService } from 'src/app/services/app.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { IFormatedResponse } from "src/app/interfaces/IFormatedResponse";
@Component({
  selector: 'app-time-import-edit',
  templateUrl: './time-import-edit.component.html',
  styleUrls: ['./time-import-edit.component.scss']
})
export class TimeImportEditComponent extends BaseEditComponent {


  
  timeTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atTimeTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  atTimeTypeGetByIdApi = api.AT_SHIFT_GET_TIME_TYPE_BY_ID;

  loading: boolean = false;
  subsctiptions: Subscription[] = [];
  override entityTable = "AT_TIMESHEETDAILY";
  scaleOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  captionCode!: EnumTranslateKey;
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
              hidden: true,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text'
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPLOYEE_CODE,
              field: 'employeeCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: true
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPOYEE_NAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: true
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_POSITION_NAME,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: true
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_ORG_NAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: true
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_START_DATE,
              field: 'workingday',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              readonly: false,
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
              label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_END_DATE,
              field: 'workingdayTo',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              readonly: false,
              type: 'date',
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
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_SHIFT_TYPE,
              field: 'manualId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.timeTypeOptions$,
              getByIdObject$: this.atTimeTypeGetByIdObject$,
              getByIdApi: this.atTimeTypeGetByIdApi,
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

        ]
      }
    ];

  constructor(
    public override dialogService: DialogService,
    private appService: AppService ,
    private CommonHttpRequestService :CommonHttpRequestService
  ) {

    super(dialogService);
    this.captionCode = EnumTranslateKey.UI_LABEL_TIME_IMPORT_EDIT;

    this.crud = {
      r: api.AT_TIME_TIMESHEET_DAILY_GET_IMPORT_EDIT,
      u: api.AT_TIME_TIMESHEET_DAILY_UPDATE_IMPORT_EDIT,
    };

  }

  ngOnInit(): void {

    this.appService.get(api.AT_SHIFT_TIME_TYPE).subscribe((res: any) => {
      const options: { value: number; text: string }[] = [];
      res.body.innerBody.map((g: any) => {
        options.push({
          value: g.id,
          text: g.name,
        });
      });
      this.timeTypeOptions$.next(options);
      this.loading = false;
    });

  }
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
