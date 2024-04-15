import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subscription, distinctUntilChanged, map } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { ICoreDropdownOption } from 'src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component';
import { EnumCoreFormControlSeekerSourceType } from 'src/app/libraries/core-form-control-seeker/EnumCoreFormControlSeekerSourceType';
import {
  EnumFormBaseContolType,
  ICoreFormSection,
  IFormBaseControl,
} from 'src/app/libraries/core-form/core-form/enum-interfaces'; 
import {
  ICorePageEditCRUD,
  ICorePageEditColumnComposition,
  ISysMutationLogBeforeAfterRequest,
} from 'src/app/libraries/core-page-edit/core-page-edit.component';
import { DialogService } from 'src/app/services/dialog.service';
import { HuCommendEditService } from './hucommendeditservice';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import * as moment from 'moment';
import { ICoreButtonVNS } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { EnumCoreButtonVNSCode } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { ICoreAccordionItem } from 'src/app/libraries/core-accordion/core-accordion/core-accordion.component';
import { AppService } from 'src/app/services/app.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { IAlertOptions } from 'src/app/libraries/alert/alert/alert.model';
import { CoreControlService } from 'src/app/libraries/core-form/core-control.service';
import { AfterViewInit } from '@angular/core';
import { CoreFormService } from 'src/app/libraries/core-form/core-form.service';
import { ICoreChecklistOption } from 'src/app/libraries/core-checklist/core-checklist/core-checklist.component';
import { RoutingService } from 'src/app/services/routing.service';
import { AuthService } from 'src/app/services/auth.service';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';

@Component({
  selector: 'app-hucommend-edit',
  templateUrl: './hucommend-edit.component.html',
  styleUrls: ['./hucommend-edit.component.scss'],
})
export class HucommendEditComponent extends BaseEditComponent implements OnDestroy, AfterViewInit {
  @Input() autoSubmitLogicOff!: boolean;
  /* Properties to be passed into core-page-edit */
  @Output() buttonClick = new EventEmitter<ICoreButtonVNS>();
  @Output() onInitialValueStringReady = new EventEmitter<string>();
  @Output() submitLogic = new EventEmitter();
  @ViewChild('basic', { static: true }) basic!: ElementRef;
  @ViewChild('cv', { static: true }) cv!: ElementRef;
  override entityTable = 'HU_COMMEND';
  sectors!: ICoreAccordionItem[];
  checkError$ = new BehaviorSubject<boolean>(false);
  loading: boolean = false;
  date = moment();
  employeeObjectList$ = new BehaviorSubject<any[]>([]); // Đặt employeeObjectList$ ra ngoài
  attachment = new BehaviorSubject<any[]>([]);
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SAVE,
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL,
  ];
  subscriptions: Subscription[] = [];
  commendId!: number;
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 3000
  };
  subsctiptions: Subscription[] = [];
  commendObjOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  commendObjGetByIdObject$ = new BehaviorSubject<any>(null);
  commendObjGetByIdApi = api.HU_COMMEND_COMMEND_OBJ;

  statusOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  statusGetByIdObject$ = new BehaviorSubject<any>(null);
  statusGetByIdApi = api.HU_DISCIPLINE_STATUS_LIST;

  orgLevelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  orgLevelGetByIdObject$ = new BehaviorSubject<any>(null);
  orgLevelGetByIdApi = api.PA_LIST_FUND_SOURCE_READ;

  rewardOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  rewardGetByIdObject$ = new BehaviorSubject<any>(null);
  rewardGetByIdApi = api.PA_LIST_FUND_SOURCE_READ;

  rewardLevelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  rewardLevelGetByIdObject$ = new BehaviorSubject<any>(null);
  rewardLevelGetByIdApi = api.PA_LIST_FUND_SOURCE_READ;

  // đây là checklist
  listRewardLevelOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  listRewardLevelGetByIdObject$ = new BehaviorSubject<any>(null);


  periodOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  periodGetByIdObject$ = new BehaviorSubject<any>(null);
  periodGetByIdApi = api.HU_DISCIPLINE_PERIOD_LIST;

  fundSourceOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  fundSourceGetByIdObject$ = new BehaviorSubject<any>(null);
  fundSourceGetByIdApi = api.HU_ORG_LEVEL_READ_ALL;

  awardTitleGetByIdObject$ = new BehaviorSubject<any>(null);
  awardTileGetByIdApi = api.HU_DISCIPLINE_AWARD_TITLE_LIST;
  awardTitleOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  yearOptions$ = new BehaviorSubject<any>(null);
  yearGetByIdObject$ = new BehaviorSubject<any>(null);
  yearGetByIdApi = api.AT_SALARY_PERIOD_READ;

  monthTaxOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  monthTaxGetByIdObject$ = new BehaviorSubject<any>(null);
  monthTaxGetByIdApi = api.AT_SALARY_PERIOD_READ;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  employeePaymentGetByIdObject$ = new BehaviorSubject<any>(null);
  employeePaymentGetByIdApi = api.HU_EMPLOYEE_READ;

  orgUnitGetByIdObject$ = new BehaviorSubject<any>(null);
  orgUnitGetByIdApi = api.OM_ORGANIZATION_READ;

  groupOptionsSignerPosition$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  signerPositionGetByIdObject$ = new BehaviorSubject<any>(null);
  signerPositionGetByIdApi = api.SYS_OTHERLIST_READ;

  groupOptionsSignerPositionPayment$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  signerPositionGetByIdObjectPayment$ = new BehaviorSubject<any>(null);
  signerPositionGetByIdApiPayment = api.SYS_OTHERLIST_READ;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  checkObjectItem: boolean = false;


  id: IFormBaseControl = {
    flexSize: 0,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'id',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_REASON,
    type: 'number',
    value: null,
    hidden: true
  };
  commendObjId: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'commendObjId',
    getByIdObject$: this.commendObjGetByIdObject$,
    getByIdApi: this.commendObjGetByIdApi,
    shownFrom: 'name',
    dropdownOptions$: this.commendObjOptions$,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_OBJECT,
    type: 'number',
    value: '',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  year: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'year',
    getByIdObject$: this.yearGetByIdObject$,
    getByIdApi: this.yearGetByIdApi,
    shownFrom: 'text',
    dropdownOptions$: this.yearOptions$,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_YEAR,
    type: 'number',
    value: '',
  };
  no: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'no',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_NO,
    type: 'string',
    value: '',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  signDate: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'signDate',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SIGN_DATE,
    type: 'string',
    value: '',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  salaryIncreaseTime: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'salaryIncreaseTime',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SALARY_INCREASE_TIME,
    type: 'number',
    value: '',
  };
  signId: IFormBaseControl = {
    flexSize: 6,
    field: 'signId',
    controlType: EnumFormBaseContolType.SEEKER,
    seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
    getByIdObject$: this.employeeGetByIdObject$,
    getByIdApi: this.employeeGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'fullname',
    alsoBindTo: [
      // { takeFrom: 'positionName', bindTo: 'positionName' },
      { takeFrom: 'fullname', bindTo: 'signerName' },
    ],

    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SIGN_NAME,
    type: 'string',
    value: '',

  };
  positionName: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'positionName',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_POSITION_NAME,
    getByIdObject$: this.signerPositionGetByIdObject$,
    getByIdApi: this.signerPositionGetByIdApi,
    shownFrom: 'name',
    dropdownOptions$: this.groupOptionsSignerPosition$,
    type: 'number',
    value: ''
  };

  
  signerName: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'signerName',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_POSITION_NAME,
    type: 'string',
    value: '',
    hidden: true,
  };
  orgLevelId: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'orgLevelId',
    getByIdObject$: this.orgLevelGetByIdObject$,
    getByIdApi: this.orgLevelGetByIdApi,
    shownFrom: 'name',
    dropdownOptions$: this.orgLevelOptions$,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_COMMEND_ORG_LEVEL,
    type: 'string',
    value: '',
  };
  reason: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'reason',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_REASON,
    type: 'string',
    value: '',
  };
  awardTitleId: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'awardTitleId',
    getByIdObject$: this.awardTitleGetByIdObject$,
    getByIdApi: this.awardTileGetByIdApi,
    shownFrom: 'name',
    dropdownOptions$: this.awardTitleOptions$,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COMMEND_AWARD_TITLE,
    type: 'number',
    value: null,
  };
  note: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'note',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_NOTE,
    type: 'string',
    value: '',
  };
  effectDate: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'effectDate',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EFFECT_DATE,
    type: 'date',
    value: '',
  };
  paymentNo: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'paymentNo',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_PAYMENT_NO,
    type: 'string',
    value: '',
  };
  signPaymentDate: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'signPaymentDate',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SIGN_PAYMENT_DATE,
    type: 'date',
    value: null,
  };
  statusPaymentId: IFormBaseControl = {
    //Trạng thái
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'statusPaymentId',
    getByIdObject$: this.statusGetByIdObject$,
    getByIdApi: this.statusGetByIdApi,
    shownFrom: 'name',
    dropdownOptions$: this.statusOptions$,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_STATUS_PAYMENT_ID,
    type: 'number',
    value: null,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  signPaymentId: IFormBaseControl = {
    //Người ký
    flexSize: 6,
    field: 'signPaymentId',
    controlType: EnumFormBaseContolType.SEEKER,
    seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
    getByIdObject$: this.employeePaymentGetByIdObject$,
    getByIdApi: this.employeePaymentGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'fullname',
    alsoBindTo: [
      // { takeFrom: 'positionName', bindTo: 'positionPaymentName' },
      { takeFrom: 'fullname', bindTo: 'signPaymentName' },
    ],

    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SIGN_PAYMENT_NAME,
    type: 'string',
    value: '',
  };
  positionPaymentName: IFormBaseControl = {
    //Chức danh người ký
    flexSize: 6,
    field: 'positionPaymentName',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_POSITION_PAYMENT_NAME,
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.signerPositionGetByIdObjectPayment$,
    getByIdApi: this.signerPositionGetByIdApiPayment,
    shownFrom: 'name',
    dropdownOptions$: this.groupOptionsSignerPositionPayment$,
    type: 'number',
    value: ''
  };
  signPaymentName: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'signPaymentName',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_POSITION_PAYMENT_NAME,
    type: 'string',
    value: '',
    hidden: true,
  };
  fundSourceId: IFormBaseControl = {
    //Trạng thái
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'fundSourceId',
    getByIdObject$: this.fundSourceGetByIdObject$,
    getByIdApi: this.fundSourceGetByIdApi,
    shownFrom: 'name',
    dropdownOptions$: this.fundSourceOptions$,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SOURCE_COST_ID,
    type: 'string',
    value: '',
  };
  money: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.CURRENCY,
    field: 'money',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_MONEY,
    type: 'number',
    value: null,
    pipe: EnumCoreTablePipeType.NUMBER,

    // BA Tiến yêu cầu bỏ bắt buộc nhập "mức thưởng"
    // validators: [
    //   {
    //     name: 'required',
    //     validator: Validators.required,
    //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
    //   },
    // ],
  };
  rewardId: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'rewardId',
    getByIdObject$: this.rewardGetByIdObject$,
    getByIdApi: this.rewardGetByIdApi,
    shownFrom: 'name',
    dropdownOptions$: this.rewardOptions$,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_REWARD,
    type: 'string',
    value: '',
  };
  // rewardLevelId: IFormBaseControl = {
  //   flexSize: 6,
  //   controlType: EnumFormBaseContolType.DROPDOWN,
  //   field: 'rewardLevelId',
  //   getByIdObject$: this.rewardLevelGetByIdObject$,
  //   getByIdApi: this.rewardLevelGetByIdApi,
  //   shownFrom: 'name',
  //   dropdownOptions$: this.rewardLevelOptions$,
  //   label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_REWARD_LEVEL,
  //   type: 'string',
  //   value: '',

  // };

  listRewardLevelId: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.CHECKLIST,
    field: 'checkListRewardLevel',
    getByIdObject$: this.listRewardLevelGetByIdObject$,
    shownFrom: 'name',
    checklistOptions$: this.listRewardLevelOptions$,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_REWARD_LEVEL,
    type: 'string',
    value: ''
  };

  isTax: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.CHECKBOX,
    field: 'isTax',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_IS_TAX,
    type: 'boolean',
    value: false,
  };
  monthTax: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'monthTax',
    getByIdObject$: this.monthTaxGetByIdObject$,
    getByIdApi: this.monthTaxGetByIdApi,
    shownFrom: 'month',
    dropdownOptions$: this.monthTaxOptions$,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_MONTH_TAX,
    type: 'number',
    value: null,
    hidden: true,
  };
  attachmentBuffer: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.ATTACHMENT,
    field: 'attachmentBuffer',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_ATTACHMENT,
    type: 'object',
    value: null,
    assignTo: 'attachment',

  };
  paymentAttachmentBuffer: IFormBaseControl = {
    flexSize: 3,
    controlType: EnumFormBaseContolType.ATTACHMENT,
    field: 'paymentAttachmentBuffer',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_ATTACHMENT,
    type: 'object',
    value: null,
    assignTo: 'paymentAttachment',

  };

  employeeIds: IFormBaseControl = {
    flexSize: 12,
    field: 'employeeIds',
    controlType: EnumFormBaseContolType.SEEKER,
    seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
    boundFrom: 'id',
    shownFrom: 'fullname',
    objectList$: this.employeeObjectList$,
    getObjectListFrom: 'employeeList',
    getByIdApi: this.employeeGetByIdApi,
    getByIdObject$: this.employeeGetByIdObject$,
    multiMode: true,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EMPLOYEE,
    type: 'object',
    value: [],
    disabled: true,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  employeeList: IFormBaseControl = {
    flexSize: 12,
    controlType: EnumFormBaseContolType.HIDDEN,
    field: 'employeeList',
    label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
    type: 'object',
    value: [],
  };
  paymentContent: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'paymentContent',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_PAYMENT_CONTENT,
    type: 'string',
    value: '',
  };
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          this.id,
          this.commendObjId,
          this.year,
          this.no,
          this.signDate,
          this.salaryIncreaseTime,
          this.signId,
          this.positionName,
          this.signerName,
          this.orgLevelId,
          this.reason,
          this.awardTitleId,
          this.note,
          this.effectDate,
          this.paymentNo,
          this.signPaymentDate,
          this.statusPaymentId,
          this.signPaymentId,
          this.signPaymentName,
          this.fundSourceId,
          this.money,
          this.rewardId,
          this.listRewardLevelId,
          this.isTax,
          this.monthTax,
          this.attachmentBuffer,
          this.paymentAttachmentBuffer,
          this.employeeIds,
          this.employeeList,
          this.paymentContent,
          this.positionPaymentName,
        ]
      ],
    },
  ];

  constructor(
    public override dialogService: DialogService,
    private huCommendEditService: HuCommendEditService,
    private mls: MultiLanguageService,
    private alertService: AlertService,
    private coreFormService: CoreFormService,
    private appService: AppService,
    private router: Router,
    private coreControlService: CoreControlService,
    private routingService: RoutingService,
    private authService: AuthService
  ) {
    super(dialogService);
    this.sectors = this.huCommendEditService.sectors;
    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND;
    this.crud = {
      c: api.HU_COMMEND_CREATE,
      r: api.HU_COMMEND_READ,
      u: api.HU_COMMEND_UPDATE,
      d: api.HU_COMMEND_DELETE_IDS,
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => {
      if (x) x.unsubscribe()
    })

    this.huCommendEditService.commendId = 0

  }

  ngOnInit(): void {
    this.loading = true;

    this.createForm();
    console.log('000000000', this.commendObjId);
    this.subsctiptions.push(
      this.huCommendEditService
        .getAllStatusByKey()
        .pipe(
          map((f: any) => {
            const options: { value: number; text: string }[] = [];
            f.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
              });
            });
            return options;
          })
        )
        .subscribe((response) => {
          this.statusOptions$.next(response);
          this.loading = false;
        })
    );
    this.subsctiptions.push(
      this.huCommendEditService
        .getAllCommendObjByKey()
        .pipe(
          map((x: any) => {
            const options: { value: number; text: string; code: string }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
                code: g.code,
              });
            });
            return options;
          })
        )
        .subscribe((response) => {
          this.commendObjOptions$.next(response);
          this.loading = false;
        })
    );
    this.subsctiptions.push(
      this.appService
        .get(api.HU_ORG_LEVEL_READ_ALL)
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number | null; text: string }[] = [
                { value: null, text: '' },
              ];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              return options;
            } else {
              return [];
            }
          })
        )
        .subscribe((response) => {
          this.orgLevelOptions$.next(response);
          this.loading = false;
        })
    );
    this.subsctiptions.push(
      this.appService
        .get(api.PA_LIST_FUND_SOURCE_READ_ALL)
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number | null; text: string }[] = [
                { value: null, text: '' },
              ];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              return options;
            } else {
              return [];
            }
          })
        )
        .subscribe((response) => {
          this.fundSourceOptions$.next(response);
          this.loading = false;
        })
    );
    this.subsctiptions.push(
      this.huCommendEditService
        .getAllAwardTileByKey()
        .pipe(
          map((x: any) => {
            const options: { value: number; text: string; code: string }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
                code: g.code,
              });
            });
            return options;
          })
        )
        .subscribe((response) => {
          this.awardTitleOptions$.next(response);
          this.loading = false;
        })
    );
    this.subsctiptions.push(
      this.huCommendEditService
        .getALLRewardByKey()
        .pipe(
          map((x: any) => {
            const options: { value: number; text: string; code: string }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
                code: g.code,
              });
            });
            return options;
          })
        )
        .subscribe((response) => {
          this.rewardOptions$.next(response);
          this.loading = false;
        })
    );
    this.subsctiptions.push(
      this.appService
        .get(api.HU_ORG_LEVEL_READ_ALL)
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number | null; text: string }[] = [
                // { value: null, text: '' },
              ];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              return options;
            } else {
              return [];
            }
          })
        )
        .subscribe((response: any) => {
          this.listRewardLevelOptions$.next(response);
          this.loading = false;
        })
    );
    this.subsctiptions.push(
      this.form
        .get('year')
        ?.valueChanges!.pipe(distinctUntilChanged())
        .subscribe((numb: number) => {
          if (!!numb) {
            this.huCommendEditService
              .getAllMonthByYear(numb)
              .pipe(
                map((x: any) => {
                  if (x.ok && x.status == 200) {
                    const options: { value: number; text: string }[] = [];
                    x.body.innerBody.map((get: any) => {
                      options.push({
                        value: get.id,
                        text: get.month,
                      });
                    });
                    return options;
                  } else {
                    return [];
                  }
                })
              )
              .subscribe((response) => {
                this.monthTaxOptions$.next(response);
                this.loading = false;
                //this.form.get('year')?.enable();
              });
          } else {
            this.form.get('year')?.disable();
          }
        })!
    );

    this.formInitStringValue = JSON.stringify(this.form.getRawValue());
  }
  onCancelLocal() {
    this.huCommendEditService.commendId = 0;

    this.router.navigateByUrl('/cms/profile/list/commend');
  }
  onButtonClick(e: ICoreButtonVNS): void {
    if (e.code == EnumCoreButtonVNSCode.NONE_HEADER_CANCEL) {
      //this.formInitStringValue = JSON.stringify(this.form.getRawValue());
      this.onCancelLocal();
    }
    if (e.code == EnumCoreButtonVNSCode.NONE_HEADER_SAVE) {
      this.onFormSubmit();
    }
    this.buttonClick.emit(e);
  }
  onAccordionItemClick(e: ICoreAccordionItem): void { }

  onAccordionItemClickEdit(e: ICoreAccordionItem): void { }
  // onFormSubmit() {
  //   this.checkError$.next(true);

  //   const request = this.form.getRawValue();
  //   let sysActionCode = '';
  //   const actualFormDeclaredFields: any[] = [];
  //   Object.keys(this.form.controls).forEach((c) => {
  //     actualFormDeclaredFields.push(c);
  //   });
  //   actualFormDeclaredFields.push('effectDate');
  //   actualFormDeclaredFields.push('signPaymentDate');

  //   const sysMutationLogBeforeAfterRequest: ISysMutationLogBeforeAfterRequest =
  //   {
  //     sysFunctionCode: this.routingService.currentFunction$.value?.code!,
  //     sysActionCode: sysActionCode,
  //     before: this.formInitStringValue || '""',
  //     after: JSON.stringify(this.form.getRawValue()),
  //     username: this.authService.data$.value?.userName!,
  //   };

  //   const mixRequest = {
  //     ...request,
  //     actualFormDeclaredFields,
  //     sysMutationLogBeforeAfterRequest,
  //   };

  //   if (!!this.huCommendEditService.commendId) {
  //     if (!!this.form.valid) {
  //       this.huCommendEditService.update(mixRequest).subscribe((x: any) => {
  //         if (x.ok == true && x.body.statusCode == 200) {
  //           this.alertService.success(
  //             `${this.mls.trans(x.body.messageCode)}`,
  //             this.alertOptions
  //           );
  //           this.formInitStringValue = JSON.stringify(
  //             this.form.getRawValue()
  //           );
  //           this.router.navigateByUrl('/cms/profile/list/commend');
  //         }
  //       });
  //     }
  //   } else {
  //     if (!!this.form.valid) {
  //       this.huCommendEditService.create(mixRequest).subscribe((rs: any) => {
  //         if (rs.ok == true && rs.body.statusCode == 200) {
  //           this.alertService.success(
  //             `${this.mls.trans(rs.body.messageCode)}`,
  //             this.alertOptions
  //           );
  //           this.formInitStringValue = JSON.stringify(
  //             this.form.getRawValue()
  //           );
  //           this.router.navigateByUrl('/cms/profile/list/commend');
  //         }
  //       });
  //     } else {
  //       let arrayControl = Object.keys(this.form.controls)
  //       for (let i = 0; i < arrayControl.length; i++) {
  //         let invalid = this.form.get(arrayControl[i])?.status
  //         if (invalid == "INVALID") {
  //           let checkClass = document.getElementsByClassName(arrayControl[i]) as HTMLCollection
  //           let checkBasic = true;
  //           let checkCv = true;
  //           if (checkClass.length > 0 && checkBasic == true) {
  //             if (checkClass[0].classList.contains("basic")) {
  //               this.huCommendEditService.sectors[0].open = true
  //               checkBasic = false
  //             }
  //             if (checkClass[0].classList.contains("cv") && checkCv == true) {
  //               this.huCommendEditService.sectors[1].open = true
  //               checkCv = false
  //             }
  //             if (checkBasic == false && checkCv == false) {
  //               break;
  //             }
  //           }

  //         }
  //       }
  //     }
  //   }
  //   // setTimeout(() => this.checkError$.next(false), 3000);


  // }

  onFormSubmit() {
    this.checkError$.next(true);
    const request = this.form.getRawValue();

    debugger;

    // let sysActionCode = '';
    // const actualFormDeclaredFields: any[] = [];
    // Object.keys(this.form.controls).forEach((c) => {
    //   actualFormDeclaredFields.push(c);
    // });
    // actualFormDeclaredFields.push('effectDate');
    // actualFormDeclaredFields.push('signPaymentDate');

    // const sysMutationLogBeforeAfterRequest: ISysMutationLogBeforeAfterRequest =
    // {
    //   sysFunctionCode: this.routingService.currentFunction$.value?.code!,
    //   sysActionCode: sysActionCode,
    //   before: this.formInitStringValue || '""',
    //   after: JSON.stringify(this.form.getRawValue()),
    //   username: this.authService.data$.value?.userName!,
    // };

    // const mixRequest = {
    //   ...request,
    //   actualFormDeclaredFields,
    //   sysMutationLogBeforeAfterRequest,
    // };

    if (!!this.form.valid) {
      const actualFormDeclaredFields: any[] = [];
      Object.keys(this.form.controls).forEach((c) => {
        actualFormDeclaredFields.push(c);
      });
      actualFormDeclaredFields.push('effectDate');
      actualFormDeclaredFields.push('signPaymentDate');

      let sysActionCode = '';
      const sysMutationLogBeforeAfterRequest: ISysMutationLogBeforeAfterRequest =
      {
        sysFunctionCode: this.routingService.currentFunction$.value?.code!,
        sysActionCode: sysActionCode,
        before: this.formInitStringValue || '""',
        after: JSON.stringify(this.form.getRawValue()),
        username: this.authService.data$.value?.userName!,
      };

      const mixRequest = {
        ...request,
        actualFormDeclaredFields,
        sysMutationLogBeforeAfterRequest,
      };

      if (!!this.huCommendEditService.commendId) {
        if (!!this.form.valid) {
          this.huCommendEditService.update(mixRequest).subscribe((x: any) => {
            if (x.ok == true && x.body.statusCode == 200) {

              this.formInitStringValue = JSON.stringify(
                this.form.getRawValue()
              );
              this.router.navigateByUrl('/cms/profile/list/commend');
            }
          });
        }
      } else {
        if (!!this.form.valid) {
          this.huCommendEditService.create(mixRequest).subscribe((rs: any) => {
            if (rs.ok == true && rs.body.statusCode == 200) {

              this.formInitStringValue = JSON.stringify(
                this.form.getRawValue()
              );
              this.router.navigateByUrl('/cms/profile/list/commend');
            }
          });
        } else {
          let arrayControl = Object.keys(this.form.controls)
          for (let i = 0; i < arrayControl.length; i++) {
            let invalid = this.form.get(arrayControl[i])?.status
            if (invalid == "INVALID") {
              let checkClass = document.getElementsByClassName(arrayControl[i]) as HTMLCollection
              let checkBasic = true;
              let checkCv = true;
              if (checkClass.length > 0 && checkBasic == true) {
                if (checkClass[0].classList.contains("basic")) {
                  this.huCommendEditService.sectors[0].open = true
                  checkBasic = false
                }
                if (checkClass[0].classList.contains("cv") && checkCv == true) {
                  this.huCommendEditService.sectors[1].open = true
                  checkCv = false
                }
                if (checkBasic == false && checkCv == false) {
                  break;
                }
              }
            }
          }
        }
      }
      // setTimeout(() => this.checkError$.next(false), 3000);
    }
  }

  ngAfterViewInit(): void {
    console.log(this.form.get('id')?.value);

    this.commendId = this.huCommendEditService.commendId;
    if (!!this.commendId) {
      this.form.get('id')?.setValue(this.commendId);
      this.subsctiptions.push(
        this.appService
          .get(api.HU_COMMEND_READ_BY_ID + this.commendId.toString())
          .subscribe((x: any) => {
            if (x.ok && x.status == 200) {
              let resObj = x.body.innerBody;

              this.form.patchValue(resObj);
              console.log(resObj.year);
              if (resObj.year != null) {
                let objYear = {
                  value: resObj.year,
                  text: resObj.year.toString(),
                };
                this.yearGetByIdObject$.next(objYear);
              }

              let objSign = {
                value: resObj.signId,
                fullname: resObj.signerName,
              };
              this.employeeGetByIdObject$.next(objSign);

              let objSignName = {
                value: resObj.signPaymentId,
                fullname: resObj.signPaymentName,
              };
              /* #region: Assign value to attachment fields when controlType = ATTACHMENT */
              this.attachmentBuffer.valueToShow =
                resObj[this.attachmentBuffer.assignTo!];

              /* #endregion: Assign value to basic fields when controlType = ATTACHMENT */
              this.paymentAttachmentBuffer.valueToShow =
                resObj[this.paymentAttachmentBuffer.assignTo!]

              this.employeePaymentGetByIdObject$.next(objSignName);

              this.employeeObjectList$.next(resObj.employeeList); // Gan lai employeeObjectList
              if (resObj.statusPaymentId === 994) {
                // this.positionName.readonly = false;
                // to do SYS_OTHER_LIST_CODE not ID
                this.form.disable();
              }

              this.formInitStringValue = JSON.stringify(
                this.form.getRawValue()
              );
            }
          })
      );
    }

    setTimeout(() => {
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
                this.groupOptionsSignerPositionPayment$.next(options);
              }
            }
          })
      ) // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()
    });
  }
  createForm() {
    this.form = this.coreControlService.toFormGroup(this.sections);
    this.subsctiptions.push(
      this.appService
        .get(api.AT_SALARY_PERIOD_GET_YEAR)
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string }[] = [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g,
                  text: g.toString(),
                });
              });
              return options;
            } else {
              return [];
            }
          })
        )
        .subscribe((response) => {
          this.yearOptions$.next(response);
          this.loading = false;
        })
    );

    this.subsctiptions.push(
      this.form.get('isTax')?.valueChanges.subscribe((x) => {
        this.monthTax.hidden = !!!x;
      })!
    );
    this.subsctiptions.push(
      this.form.get('effectDate')?.valueChanges.subscribe((x) => {
        this.form.get('signPaymentDate')?.setValue(x);
      })!
    );
    this.subscriptions.push(
      this.form.get('commendObjId')?.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {
        if (!!x) {
          this.form.get('employeeIds')?.enable();
          this.checkObjectItem = true
        } else {
          this.form.get('employeeIds')?.disable();
          this.checkObjectItem = false;
        }
      })!
    )

  }
  onClickItem(e: any) {
    if (!!this.checkObjectItem) {
      console.log(this.checkObjectItem);
    }
    else {
      this.alertService.warn(this.mls.trans(EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_MUST_CHOOSE_EMPLOYEE_OBJ), this.alertOptions)
    }
  }
}
