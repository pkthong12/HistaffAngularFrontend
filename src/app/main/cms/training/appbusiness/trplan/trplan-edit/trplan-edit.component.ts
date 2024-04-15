import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, distinctUntilChanged, filter, map } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { ICoreDropdownOption } from 'src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component';
import { EnumCoreFileUploaderType } from 'src/app/libraries/core-file-uploader/core-file-uploader/core-file-uploader.component';
import {
  EnumFormBaseContolType,
  ICoreFormSection,
} from 'src/app/libraries/core-form/core-form/enum-interfaces';
import {
  ICorePageEditCRUD,
  ICorePageEditColumnComposition,
} from 'src/app/libraries/core-page-edit/core-page-edit.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { DialogService } from 'src/app/services/dialog.service';
import { TrPlanEditService } from './TrPlanEditService';
import { AppService } from 'src/app/services/app.service';
import { CustomValidators } from 'src/app/libraries/core-form/custom-validators';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';

@Component({
  selector: 'app-trplan-edit',
  templateUrl: './trplan-edit.component.html',
  styleUrls: ['./trplan-edit.component.scss'],
})
export class TrplanEditComponent extends BaseEditComponent {
  loading: boolean = false;
  override entityTable = 'TR_PLAN';
  subsctiptions: Subscription[] = [];
  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  orgOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  orgGetByIdObject$ = new BehaviorSubject<any>(null);
  orgGetByIdApi = api.HU_ORGANIZATION_READ;

  courseOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  courseGetByIdObject$ = new BehaviorSubject<any>(null);
  courseGetByIdApi = api.TR_COURSE_READ;

  centerOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  centerGetByIdObject$ = new BehaviorSubject<any>(null);
  centerGetByIdApi = api.TR_CENTER_READ;

  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_LANGUAGE_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_CODE,
            field: 'code',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
            disabled: true,
            hidden: true,
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
              },
            ],
          },
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NAME,
            field: 'name',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
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
              },
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_YEAR,
            field: 'year',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
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
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_CONTENT,
            field: 'content',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_START_DATE_PLAN,
            field: 'startDatePlan',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            readonly: false,
            type: 'date',
            validators: [
              {
                name: 'startDatePlan',
                validator: TrplanEditComponent.startDatePlan,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              },
            ]
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_END_DATE_PLAN,
            field: 'endDatePlan',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            readonly: false,
            type: 'date',
            validators: [
              {
                name: 'endDatePlan',
                validator: TrplanEditComponent.endDatePlan,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              },
            ]
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_START_DATE_REAL,
            field: 'startDateReal',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            readonly: false,
            type: 'date',
            validators: [
              {
                name: 'startDateReal',
                validator: TrplanEditComponent.startDateReal,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              },
            ]
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_END_DATE_REAL,
            field: 'endDateReal',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            readonly: false,
            type: 'date',
            validators: [
              {
                name: 'endDateReal',
                validator: TrplanEditComponent.endDateReal,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              },
            ]
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_PERSON_NUM_REAL,
            field: 'personNumReal',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'number',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_PERSON_NUM_PLAN,
            field: 'personNumPlan',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'number',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_EXPECTED_COST,
            field: 'expectedCost',
            value: '',
            controlType: EnumFormBaseContolType.CURRENCY,
            readonly: false,
            type: 'number',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_ACTUAL_COST,
            field: 'actualCost',
            value: '',
            controlType: EnumFormBaseContolType.CURRENCY,
            readonly: false,
            type: 'number',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_FORM_TRAINING,
            field: 'formTraining',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_ADDRESS_TRAINING,
            field: 'addressTraining',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_ORGANIZATION,
            field: 'orgId',
            value: null,
            getByIdObject$: this.orgGetByIdObject$,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'name',
            getByIdApi: this.orgGetByIdApi,
            dropdownOptions$: this.orgOptions$,
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
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_COURSE,
            field: 'courseId',
            value: null,
            getByIdObject$: this.courseGetByIdObject$,
            getByIdApi: this.courseGetByIdApi,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'courseName',
            dropdownOptions$: this.courseOptions$,
            type: 'text',
          },
        ],

        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_CENTER,
            field: 'centerId',
            value: null,
            getByIdObject$: this.centerGetByIdObject$,
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdApi: this.centerGetByIdApi,
            shownFrom: 'nameCenter',
            dropdownOptions$: this.centerOptions$,
            type: 'number',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_UPLOAD_FILE,
            field: 'attachmentBuffer',
            value: null,
            controlType: EnumFormBaseContolType.ATTACHMENT,
            assignTo: 'attachment',
            type: 'object',
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
      ],
    },
  ];
  constructor(
    public override dialogService: DialogService,
    private trPlanEditService: TrPlanEditService,
    private appService: AppService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN;

    this.crud = {
      c: api.TR_PLAN_CREATE,
      r: api.TR_PLAN_READ,
      u: api.TR_PLAN_UPDATE,
      d: api.TR_PLAN_DELETE_IDS,
    };
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    // this.subsctiptions.push(
    //   this.appService.get(api.TR_PLAN_GET_CODE)
    //   .pipe(
    //     map((x: any) => {
    //       let y: string = '';
    //       y = x.body.innerBody.code;
    //       return y;
    //     })
    //   ).subscribe((response) =>{
    //     if(this.form.get('code')?.value == '')
    //     this.form.get('code')?.patchValue(response)
    //   })
    // )
  }


  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
    setTimeout(() =>{
      this.form.get('courseId')?.valueChanges.pipe(distinctUntilChanged())
    .pipe(
      filter(_ => {
        const touched = this.form.get('courseId')?.touched;
        return !!touched
      })
    ).subscribe(x => {
      if (!!x) {
        this.subsctiptions.push( // <== Inner push
          this.appService
            .get(api.TR_COURSE_READ + '?id=' + x)
            .subscribe((res: any) => {
              if (!!res.ok && res.status === 200) {
                const body: IFormatedResponse = res.body
                if (body.statusCode === 200 && !!body.innerBody) {
                  this.form.get('expectedCost')?.setValue(body.innerBody.costs);
                  console.log(body.innerBody.costs)
                }
              }
            })
        ) // Close inner push
      } else {
        this.form.get('expectedCost')?.setValue(null);
      }
    })
    })
  }
  ngOnInit(): void {
    this.loading = true;
    this.subsctiptions.push(
      this.trPlanEditService
        .getAllOrg()
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string }[] = [];
              x.body.innerBody.map((y: any) => {
                options.push({
                  value: y.id,
                  text: y.name,
                });
              });
              return options;
            } else {
              return [];
            }
          })
        )
        .subscribe((response) => {
          this.orgOptions$.next(response);
          this.loading = false;
        })
    );
    this.subsctiptions.push(
      this.trPlanEditService
        .getAllCenter()
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string }[] = [];
              x.body.innerBody.map((y: any) => {
                options.push({
                  value: y.id,
                  text: y.nameCenter,
                });
              });
              return options;
            } else {
              return [];
            }
          })
        )
        .subscribe((response) => {
          this.centerOptions$.next(response);
          this.loading = false;
        })
    );
    this.subsctiptions.push(
      this.trPlanEditService
        .getAllCourse()
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string }[] = [];
              x.body.innerBody.map((y: any) => {
                options.push({
                  value: y.id,
                  text: y.courseName,
                });
              });
              return options;
            } else {
              return [];
            }
          })
        )
        .subscribe((response) => {
          this.courseOptions$.next(response);
          this.loading = false;
        })
    );
  }

  protected static startDatePlan(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const startDatePlan = date.value;
    const endDatePlan = date.parent?.get('endDatePlan')?.value;
    if (endDatePlan != '' && endDatePlan != null && startDatePlan != null) {
      if (startDatePlan > new Date(endDatePlan)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_START_DATE_LESS_THAN_END_DATE;
        return CustomValidators.core('startDatePlan', false, errorMessage)(date);
      } else {
        date.parent?.get('startDatePlan')?.setErrors(null);
        date.parent?.get('endDatePlan')?.setErrors(null);
      }
    }
  }

  protected static endDatePlan(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const startDatePlan = date.parent?.get('startDatePlan')?.value;
    const endDatePlan = date.value;
    if (endDatePlan != '' && endDatePlan != null) {
      if (startDatePlan != '' && startDatePlan != null && endDatePlan < new Date(startDatePlan)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_END_DATE_PLAN_MORE_THAN_START_DATE_PLAN;
        return CustomValidators.core('endDatePlan', false, errorMessage)(date);
      } else {
        date.parent?.get('startDatePlan')?.setErrors(null);
        date.parent?.get('endDatePlan')?.setErrors(null);
      }
    } else {
      // date.parent?.get("effectiveDate")?.setErrors(null);
      date.parent?.get('endDatePlan')?.setErrors(null);
    }
  }

  protected static startDateReal(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const startDateReal = date.value;
    const endDateReal = date.parent?.get('endDateReal')?.value;
    if (endDateReal != '' && endDateReal != null && startDateReal != null) {
      if (startDateReal > new Date(endDateReal)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_START_DATE_REAL_LESS_THAN_END_DATE_REAL;
        return CustomValidators.core('startDateReal', false, errorMessage)(date);
      } else {
        date.parent?.get('startDateReal')?.setErrors(null);
        date.parent?.get('endDateReal')?.setErrors(null);
      }
    }
  }

  protected static endDateReal(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const startDateReal = date.parent?.get('startDateReal')?.value;
    const endDateReal = date.value;
    if (endDateReal != '' && endDateReal != null) {
      if (startDateReal != '' && startDateReal != null && endDateReal < new Date(startDateReal)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_END_DATE_REAL_MORE_THAN_START_DATE_REAL;
        return CustomValidators.core('endDateReal', false, errorMessage)(date);
      } else {
        date.parent?.get('startDateReal')?.setErrors(null);
        date.parent?.get('endDateReal')?.setErrors(null);
      }
    } else {
      // date.parent?.get("effectiveDate")?.setErrors(null);
      date.parent?.get('endDateReal')?.setErrors(null);
    }
  }
}
