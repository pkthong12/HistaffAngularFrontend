import { Component } from "@angular/core";
import { api } from "src/app/constants/api/apiDefinitions";
import { ICorePageEditCRUD, ICorePageEditColumnComposition } from "src/app/libraries/core-page-edit/core-page-edit.component";

import { FormGroup, Validators } from "@angular/forms";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { BaseEditComponent } from "src/app/libraries/base-edit/base-edit/base-edit.component";
import { EnumFormBaseContolType, ICoreFormSection } from "src/app/libraries/core-form/core-form/enum-interfaces";
import { DialogService } from "src/app/services/dialog.service";
import { BehaviorSubject, Subscription, map } from "rxjs";
import { ICoreDropdownOption } from "src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component";
import { TimeTimesheetDailyEditService } from "./time-timesheet-daily-edit.service";
import { AppService } from "src/app/services/app.service";
@Component({
  selector: "app-time-timesheet-daily-edit",
  templateUrl: "./time-timesheet-daily-edit.component.html",
  styleUrls: ["./time-timesheet-daily-edit.component.scss"]
})
export class TimeTimesheetDailylEditComponent extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */
  override entityTable = "AT_TIME_TIMESHEET_DAILY";

  loading: boolean = false;

  timeTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atTimeTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  atTimeTypeGetByIdApi = api.AT_SHIFT_GET_TIME_TYPE_BY_ID;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  subsctiptions: Subscription[] = [];
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
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'isConfirm',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              readonly: true,
              hidden: true,
              type: 'bool'
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_EMPLOYEE_CODE,
              field: 'employeeId',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: true,
              hidden: true,
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_EMPLOYEE_CODE,
              field: 'employeeCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_EMPLOYEE_NAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              disabled: true,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_POSITION_NAME,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_DEPARTMENT_NAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              disabled: true,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_WORKINGDAY,
              field: 'workingday',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              disabled: true,
            },
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
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_REASON,
              field: 'reason',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text'
            }
          ]
        ]
      }
    ];

  constructor(
    public override dialogService: DialogService,
    public timeTimesheetDailyEditService: TimeTimesheetDailyEditService,
    private appService: AppService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_TIME_TIMESHEET_DAILY_EDIT;

    this.crud = {
      c: api.AT_TIME_TIMESHEET_DAILY_CREATE,
      r: api.AT_TIME_TIMESHEET_DAILY_READ,
      u: api.AT_TIME_TIMESHEET_DAILY_UPDATE,
      d: api.AT_TIME_TIMESHEET_DAILY_DELETE,
    };
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    const isCf = this.form.get('isConfirm');
    if (isCf) {
      if(isCf.value == true){

        this.form.get('manualId')?.disable();
        this.form.get('reason')?.disable();
      }

    }



    this.appService.get(api.AT_SHIFT_TIME_TYPE).subscribe((res: any) => {
      const options: { value: number; text: string }[] = [];
      options.push({
        value: 0,
        text: '',
      });
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

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnInit(): void {
    this.loading = true;
  }
}