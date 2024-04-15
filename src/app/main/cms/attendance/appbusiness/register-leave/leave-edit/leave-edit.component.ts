import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import {
  FilterService,
  VirtualScrollService,
} from '@syncfusion/ej2-angular-grids';
import { FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import {
  ICorePageEditCRUD,
  ICorePageEditColumnComposition,
} from 'src/app/libraries/core-page-edit/core-page-edit.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import {
  EnumFormBaseContolType,
  ICoreFormSection,
} from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { api } from 'src/app/constants/api/apiDefinitions';
import { DialogService } from 'src/app/services/dialog.service';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { ICoreDropdownOption } from 'src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component';
//import { CoreService } from 'src/app/services/core.service';
import { EnumCoreFormControlSeekerSourceType } from 'src/app/libraries/core-form-control-seeker/EnumCoreFormControlSeekerSourceType';
import { AppService } from 'src/app/services/app.service';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { CoreFormService } from 'src/app/libraries/core-form/core-form.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterLeaveService } from '../register-leave.service';

@Component({
  selector: 'app-leave-edit',
  templateUrl: './leave-edit.component.html',
  styleUrls: ['./leave-edit.component.scss'],
  // providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LeaveEditComponent extends BaseEditComponent implements OnDestroy {
  override entityTable = 'AT_REGISTER_LEAVE';
  subsctiptions: Subscription[] = [];
  captionCode!: EnumTranslateKey;
  loading: boolean = false;
  typeCode: string = "";
  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;


  TypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  TypeGetByIdObject$ = new BehaviorSubject<any>(null);
  TypeGetByIdApi = api.AT_REGISTER_LEAVE_TYPE_OFF_BYID


  OffTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  OffTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  OffTypeGetByIdApi = api.SYS_OTHERLIST_READ

  OffTypeGetByIdObject1$ = new BehaviorSubject<any>(null);
  OffTypeGetByIdApi1 = api.SYS_OTHERLIST_READ



  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_ID,
              field: 'id',
              value: 0,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_EMPLOYEECODE,
              field: 'employeeId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              getByIdObject$: this.employeeGetByIdObject$,
              getByIdApi: this.employeeGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'code',
              alsoBindTo: [{ takeFrom: 'fullname', bindTo: 'employeeName' },
              { takeFrom: 'orgName', bindTo: 'orgName' },
              { takeFrom: 'positionName', bindTo: 'positionName' },],
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
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_EMPLOYEENAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_ORGNAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_ORGNAME,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_REGISTER_TYPE,
              field: 'typeId',
              value: '',
              getByIdObject$: this.TypeGetByIdObject$,
              getByIdApi: this.TypeGetByIdApi,
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.TypeOptions$,
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
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_TYPE_OFF,
              field: 'typeOff',
              value: '',
              getByIdObject$: this.OffTypeGetByIdObject$,
              getByIdApi: this.OffTypeGetByIdApi,
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.OffTypeOptions$,
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
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_STARTDATE,
              field: 'dateStart',
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
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_ENDDATE,
              field: 'dateEnd',
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
            // {
            //   flexSize: 3,
            //   label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_FILENAME,
            //   field: 'firstAttachmentBuffer',
            //   value: null,
            //   controlType: EnumFormBaseContolType.ATTACHMENT,
            //   assignTo: 'fileName',
            //   type: 'object',
            // },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_REASON,
              field: 'reason',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_IS_DETAIL,
              field: 'isEachDay',
              value: false,
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
          ]
        ]
      },
    ];
  selectedData: any;
  subscriptions: Subscription[] = []
  constructor(
    private appService: AppService,
    public override dialogService: DialogService,
    private coreFormService: CoreFormService,
    private router: Router,
    private route: ActivatedRoute,
    private registerLeaveService: RegisterLeaveService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_RESGISTER_LEAVE;

    this.crud = {
      c: api.AT_REGISTER_LEAVE_CREATE,
      r: api.AT_REGISTER_LEAVE_READVER2,
      u: api.AT_REGISTER_LEAVE_UPDATEVER2,
      d: api.AT_REGISTER_LEAVE_DELETE,
    };
    if (this.router.getCurrentNavigation()?.extras?.state) {
      this.selectedData = this.router.getCurrentNavigation()?.extras.state!['selectedData'];
    }
  }
  ngOnInit(): void {
    this.loading = true;
    this.appService
      .get(api.AT_REGISTER_LEAVE_LIST_TYPE_OFF)
      .subscribe((res: any) => {
        const options: { value: number; text: string; }[] = [];
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name,
          })
        })
        this.TypeOptions$.next(options);
        this.loading = false;
      });


    this.appService
      .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'TYPE_OFF')
      .subscribe((res: any) => {
        const options: { value: number; text: string; }[] = [];
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name,
          })
        })
        this.OffTypeOptions$.next(options);
        this.loading = false;
      });

    if (!!this.selectedData) {
      this.subscriptions.push(
        this.appService
          .get(api.AT_REGISTER_LEAVE_READVER2 + '?id=' + this.selectedData[0].id.toString())
          .subscribe((x: any) => {
            if (x.ok && x.status == 200) {
              let resObj = x.body.innerBody;
              this.form.patchValue(resObj);
              this.formInitStringValue = JSON.stringify(
                this.form.getRawValue()
              );
              debugger
              let objSign = {
                value: resObj.employeeId,
                code: resObj.employeeCode,
              };
              this.employeeGetByIdObject$.next(objSign);
              this.form.get('id')?.setValue(0);
              this.form.get('effectiveDate')?.setValue(null);
            }
          })
      );
    }
  }

  onFormCreated(e: FormGroup): void {
    this.form = e;
    const dateStart = this.form.get('dateStart');
    const dateEnd = this.form.get('dateEnd');
    const isDetail = this.form.get('isEachDay');

    const typeId = this.form.get('typeId');


    if (dateStart && dateEnd) {
      this.subsctiptions.push(
        dateStart.valueChanges.subscribe((x: any) => {
          if (dateStart.value != null && dateStart.value != "" && dateEnd.value != null && dateEnd.value != "" && isDetail?.value == true && typeId?.value != null && typeId.value != "") {
            const startDateNew = new Date(dateStart?.value.getFullYear(), dateStart?.value.getMonth(), dateStart?.value.getDate(), 12);
            const endDateNew = new Date(dateEnd?.value.getFullYear(), dateEnd?.value.getMonth(), dateEnd?.value.getDate(), 12);
            this.generateSections(startDateNew.toString(), endDateNew.toString());
            this.fillDataSections(startDateNew.toString(), endDateNew.toString());
            this.fillDayManual(startDateNew.toString(), endDateNew.toString());
          }
        }),
        dateEnd.valueChanges.subscribe((x: any) => {
          if (dateEnd.value != null && dateEnd.value != "" && dateStart.value != null && dateStart.value != "" && isDetail?.value == true && typeId?.value != null && typeId.value != "") {
            const startDateNew = new Date(dateStart?.value.getFullYear(), dateStart?.value.getMonth(), dateStart?.value.getDate(), 12);
            const endDateNew = new Date(dateEnd?.value.getFullYear(), dateEnd?.value.getMonth(), dateEnd?.value.getDate(), 12);
            this.generateSections(startDateNew.toString(), endDateNew.toString());
            this.fillDataSections(startDateNew.toString(), endDateNew.toString());
            this.fillDayManual(startDateNew.toString(), endDateNew.toString());
          }
        }),
      );
    }
    if (isDetail) {
      this.subsctiptions.push(
        isDetail.valueChanges.subscribe((x: any) => {
          if (x) {
            if (dateStart?.value != null && dateStart?.value != "" && dateEnd?.value != null && dateEnd?.value != "" && typeId?.value != null && typeId.value != "") {
              const startDateNew = new Date(dateStart?.value.getFullYear(), dateStart?.value.getMonth(), dateStart?.value.getDate(), 12);
              const endDateNew = new Date(dateEnd?.value.getFullYear(), dateEnd?.value.getMonth(), dateEnd?.value.getDate(), 12);
              this.generateSections(startDateNew.toString(), endDateNew.toString());
              this.fillDataSections(startDateNew.toString(), endDateNew.toString());
              this.fillDayManual(startDateNew.toString(), endDateNew.toString());
            }
          }
          else {
            this.sections.splice(1);
          }
        })
      )

    }
    if (typeId) {
      this.subsctiptions.push(
        typeId.valueChanges.subscribe((x: any) => {
          this.sections.splice(1);
          if (dateStart?.value != null && dateStart?.value != "" && dateEnd?.value != null && dateEnd?.value != "" && typeId?.value != null && typeId.value != "" && isDetail?.value == true) {
            const startDateNew = new Date(dateStart?.value.getFullYear(), dateStart?.value.getMonth(), dateStart?.value.getDate(), 12);
            const endDateNew = new Date(dateEnd?.value.getFullYear(), dateEnd?.value.getMonth(), dateEnd?.value.getDate(), 12);
            this.generateSections(startDateNew.toString(), endDateNew.toString());
            this.fillDataSections(startDateNew.toString(), endDateNew.toString());
            this.fillDayManual(startDateNew.toString(), endDateNew.toString());
          }
        })
      )
    }


  }

  generateSections(dateStart: string, dateEnd: string): void {
    this.sections.splice(1);
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);
    this.sections.push({
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_LEAVE_EDIT_DETAIL,
      rows: [],
    });

    let i = 1;
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      const control = this.form.get('dateStart' + i);
      if (!control) {
        this.form.addControl('dateStart' + i, new FormControl());
      }

      const controlType = this.form.get('dType' + i);
      if (!controlType) {
        this.form.addControl('dType' + i, new FormControl());
      }

      const controlShift = this.form.get('shift' + i);
      if (!controlShift) {
        this.form.addControl('shift' + i, new FormControl());
      }

      const controlDay = this.form.get('day' + i);
      if (!controlDay) {
        this.form.addControl('day' + i, new FormControl());
      }

      const controlShiftCode = this.form.get('shiftCode' + i);
      if (!controlShiftCode) {
        this.form.addControl('shiftCode' + i, new FormControl());
      }

      const controlShiftCodeDefault = this.form.get('shiftCodeDefault' + i);
      if (!controlShiftCodeDefault) {
        this.form.addControl('shiftCodeDefault' + i, new FormControl());
      }
      this.sections.push({
        rows: [
          [
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_DATE,
              field: 'dateStart' + i,
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date'
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_TYPE,
              field: 'dType' + i,
              value: '',
              getByIdObject$: this.OffTypeGetByIdObject1$,
              getByIdApi: this.OffTypeGetByIdApi1,
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.OffTypeOptions$,
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
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_DAY,
              field: 'day' + i,
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              disabled: true,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_SHIFT,
              field: 'shift' + i,
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_SHIFT_CODE,
              field: 'shiftCode' + i,
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_SHIFT_CODE,
              field: 'shiftCodeDefault' + i,
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
              hidden: true
            },
          ]
        ],
      });

      i = i + 1;
    }
  }
  fillDataSections(dateStart: string, dateEnd: string): void {
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const timeDifference = endDate.getTime() - startDate.getTime();
    const numberOfDays = Math.ceil(timeDifference / millisecondsPerDay) + 1;

    for (let i = 0; i < numberOfDays; i++) {

      // set date
      const currentDate = new Date(startDate);

      currentDate.setDate(currentDate.getDate() + i);
      const controlShift = this.form.get('shift' + (i + 1));
      const controlShiftCode = this.form.get('shiftCode' + (i + 1));
      const controlShiftCodeDefault = this.form.get('shiftCodeDefault' + (i + 1));
      const control = this.form.get('dateStart' + (i + 1));
      const dType = this.form.get('dType' + (i + 1));
      if (control && dType) {
        control.setValue(currentDate);
        dType.setValue(null);

        const employeeId = this.form.get('employeeId');
        this.appService
          .post(api.AT_REGISTER_LEAVE_GETSIGN, { employeeId: employeeId?.value, workingday: currentDate })
          .subscribe((res: any) => {
            controlShift?.setValue(res.body.innerBody.name);
            controlShiftCodeDefault?.setValue(res.body.innerBody.code);
          });
        control.disable();
      }

      // set ca làm việc
      // lấy ca làm việc theo ngày và id nhân viên

      if (controlShift && controlShiftCode) {
        controlShift.disable();
      }

      const controlDay = this.form.get('day' + (i + 1));
      if (controlDay) {
        controlDay.disable();
      }
      const controlshiftCode = this.form.get('shiftCode' + (i + 1));
      if (controlshiftCode) {
        controlshiftCode.disable();
      }
    }
  }

  fillDayManual(dateStart: string, dateEnd: string): void {
    //debugger;
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const timeDifference = endDate.getTime() - startDate.getTime();
    const numberOfDays = Math.ceil(timeDifference / millisecondsPerDay);
    for (let i = 0; i < numberOfDays; i++) {
      //debugger;
      const controlType = this.form.get('dType' + (i + 1));
      const controlDay = this.form.get('day' + (i + 1));
      const controlShift = this.form.get('shiftCode' + (i + 1));
      const controlShiftCode = this.form.get('shiftCode' + (i + 1));
      const controlShiftCodeDefault = this.form.get('shiftCodeDefault' + (i + 1));
      const controlRegisterType = this.form.get('typeId');


      this.appService
        .get(api.AT_REGISTER_LEAVE_TYPE_OFF_BYID + '?id=' + controlRegisterType?.value)
        .subscribe((res: any) => {
          this.typeCode = res.body.innerBody.code
        });


      if (controlType) {
        this.subsctiptions.push(
          controlType.valueChanges.subscribe((x: any) => {
            if (x == 1125) {
              controlDay?.setValue(1);

              controlShiftCode?.setValue(this.typeCode)
            }
            else {
              controlDay?.setValue(0.5);
              if (x == 1124) {
                controlShiftCode?.setValue(this.typeCode + '/' + controlShiftCodeDefault?.value)
              }
              else {
                controlShiftCode?.setValue(controlShiftCodeDefault?.value + '/' + this.typeCode)
              }
            }

            if (x == null || x == 0) {
              controlDay?.setValue(null);
              controlShiftCode?.setValue(null);
            }
            controlDay?.disable();
            controlShiftCode?.disable();
          }

          )
        )
      }
    }
  }

  onBufferFormCreated(form: FormGroup) {
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy() {
    this.subscriptions.map(x => x?.unsubscribe())
  }

}
