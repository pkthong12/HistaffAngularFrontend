import {
  Component,
  ViewChild,
  TemplateRef,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";

import { RandomAvatarService } from 'src/app/services/random-avatar.service';

import { BehaviorSubject, filter } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { alertOptions } from 'src/app/constants/alertOptions';
import { AlertService } from "src/app/libraries/alert/alert.service";
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from "src/app/libraries/core-page-list/core-page-list.component";
import { ICoreTableColumnItem } from "src/app/libraries/core-table/core-table.component";
import { EnumCoreTablePipeType } from "src/app/libraries/core-table/EnumCoreTablePipeType";
import { BaseComponent } from "src/app/libraries/base-component/base/base.component";
import { MultiLanguageService } from "src/app/services/multi-language.service";
import { EnumFilterOperator, EnumSortDirection, IFilterOperator, IInOperator, ISortItem } from "src/app/interfaces/IQueryListRequest";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { api } from "src/app/constants/api/apiDefinitions";
import { ICoreButtonVNS } from "src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS";
import { EnumCoreButtonVNSCode } from "src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode";
import { OrganizationService } from "src/app/services/organization.service";
import { ICoreParamControl } from "src/app/libraries/core-header-params/enum-and-interfaces";
import { EnumFormBaseContolType } from "src/app/libraries/core-form/core-form/enum-interfaces";
import { IFormatedResponse } from "src/app/interfaces/IFormatedResponse";
import { AppService } from "src/app/services/app.service";
import { IAlertOptions } from "src/app/libraries/alert/alert/alert.model";
import { CorePageListService, IGenerateTemplateRequest } from "src/app/libraries/core-page-list/core-page-list.service";
import { HttpClient } from "@angular/common/http";
import { EvaluateDialogService } from "../../applist/hu-evaluate/evaluate-dialog/valuate-dialog.service";


@Component({
  selector: "cms-profile-wage",
  templateUrl: "./wage.component.html",
  styleUrls: ["./wage.component.scss"],
})
export class WageComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() hideHeader!: boolean;

  @ViewChild('avatar') avatar!: TemplateRef<any>;
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  id: any;
  /* START: Local filter params */
  orgIds!: number[];
  /* END: Local filter params */

  listInstance!: number;
  paramRows!: ICoreParamControl[][];
  selectedIds: number[] = [];
  /*
  Properties being passed to core-page-list
  */

  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };

  title = EnumTranslateKey.UI_COMPONENT_TITLE_WAGE
  outerParam$ = new BehaviorSubject<any>(null);

  datePeriodComparisonFor: string = 'effectDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey  = EnumTranslateKey.NULL;
  statusInclusionFor: string = 'empWorkStatus';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EMPLOYEE_STATUS;
  workStatusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;
  outerFilterOperators!: IFilterOperator[];
  outerInOperators: IInOperator[] = [];

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_WAGE_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_WAGE_DELETE_IDS,
    toggleApproveIds: api.HU_WAGE_CHANGESTATUSAPPROVE
  }

  avatarTemplate!: TemplateRef<any>;

  generateTemplateRequest!: IGenerateTemplateRequest;
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL,
    EnumCoreButtonVNSCode.NONE_HEADER_UPDATE
  ];

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_JOB_ORDER_NUM,
      field: 'jobOrderNum',
      type: 'string',
      align: 'right',
      width: 0,
      hidden: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_STATUS,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 120,

    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EFFECTDATE,
      field: 'effectDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'right',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EXPIREDATE,
      field: 'expireDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_TYPE_NAME,
      field: 'typeName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_DECISIONNO,
      field: 'decisionNo',
      type: 'string',
      align: 'left',
      width: 110,
    },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_TAXTABLE,
    //   field: 'taxTableName',
    //   type: 'string',
    //   align: 'left',
    //   width: 100,
    // },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_REGION,
    //   field: 'regionName',
    //   type: 'date',
    //   pipe: EnumCoreTablePipeType.DATE,
    //   align: 'center',
    //   width: 100,
    // },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_TYPE_NAME,
    //   field: 'salaryType',
    //   type: 'string',
    //   align: 'left',
    //   width: 100,
    // },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_SCALE_NAME,
    //   field: 'salaryScaleName',
    //   type: 'string',
    //   align: 'left',
    //   hidden: true,
    //   width: 200,
    // },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_RANK_NAME,
    //   field: 'salaryRankName',
    //   type: 'string',
    //   align: 'left',
    //   hidden: true,
    //   width: 200,
    // },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_LEVEL_NAME,
    //   field: 'salaryLevelName',
    //   type: 'string',
    //   align: 'left',
    //   hidden: true,
    //   width: 200,
    // },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_COEFFICIENT,
    //   field: 'coefficient',
    //   type: 'string',
    //   pipe: EnumCoreTablePipeType.NUMBER,
    //   align: 'center',
    //   width: 70,
    // },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SAL_PERCENT,
    //   field: 'salPercent',
    //   type: 'string',
    //   pipe: EnumCoreTablePipeType.NUMBER,
    //   align: 'left',
    //   width: 70,
    // },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EXPIRE_UPSAL_DATE,
      field: 'expireUpsalDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_REASON_UPSAL,
      field: 'reasonUpsal',
      type: 'string',
      align: 'left',
      width: 110,
    },
  ]

  defaultAvatar!: string;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private ras: RandomAvatarService,
    private router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private appService: AppService,
    private alertService: AlertService,
    private corePageListService: CorePageListService,
    private http: HttpClient,
    public evaluateDialogService: EvaluateDialogService
  ) {
    super(mls);
    this.defaultAvatar = ras.get();

    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
  }

  ngAfterViewInit(): void {
    const filter = this.columns.filter(c => c.field === 'avatar');
    if (!!filter.length) filter[0].templateRef = this.avatar;
    const stickerFilter = this.columns.filter(c => c.field === 'statusName');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds
      }
    ]
  }

  onInstanceCreated(event: number) {
    this.listInstance = event;
  }
  onNgModelChange = (ngModel: string, value: any) => {

  }
  override ngOnInit(): void {
    this.subscriptions.push(
      this.evaluateDialogService.dialogConfirmed$.pipe(
        filter(x => !!x)
      ).subscribe(x => {
        if(!!x?.confirmed){
          this.UpdateUpsal();
        }
      })
    )    
    this.paramRows = [
      [
        {
          flexSize: 6,
          name: 'effectUpsalDate',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label: this.datePeriodComparisonForLabelKey,
          controlType: EnumFormBaseContolType.DATEPICKER,
        },
        {

          flexSize: 6,
          name: 'reasonUpsal',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_REASON_UPSAL,
          controlType: EnumFormBaseContolType.TEXTBOX,
        }
      ]
    ];


    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: 'HU_WORKING_HSL_PC',
        lang: x
      }
    })
  }

  onSelectedIdsChangeeee(e: number[]): void {
    this.selectedIds = e;
  }
  UpdateUpsal(): void {
    if (this.selectedIds == null || this.selectedIds.length == 0) {
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_TITLE_WAGE_IDS_NULL"), this.alertOptions);
    }
    this.subscriptions.push( // <== Inner push this.paramRows[0][0].ngModel.toLocaleDateString('en-US')
      this.appService
        .post('/api/HuWorking/UpdateUpsal', { ids: this.selectedIds, dateCal: this.evaluateDialogService.dateInput$.value.toLocaleDateString('en-US'), reasonUpsal: this.evaluateDialogService.reason$.value })
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            // reload màn hình  
            const listInstances = this.corePageListService.instances.filter(
              (y) => y.instanceNumber === this.listInstance
            );
            if (!!listInstances.length) {
              listInstances[0].reloadFlag$.next(
                !!!listInstances[0].reloadFlag$.value
              );
            }

            // end reload màn hình
            const body: IFormatedResponse = res.body
            return this.alertService.success(this.mls.trans(body.messageCode), this.alertOptions);
          }
        }))
  }
  onRowClick(e: any) {
    this.id = e.id
  }
  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_PRINT:
        debugger;

        let filename= '';
        this.http.get(api.HU_DECISION_FILE_NAME+this.id.toString()).subscribe((response: any) => {
          filename = response.innerBody; 
        });


        this.http.get(api.HU_DECISION_PRINT, {
          responseType: 'blob',
          params: { id: this.id.toString() }
        }).subscribe((response: Blob) => {
          if (response.type === 'application/octet-stream') {
            const downloadUrl = URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', filename+'.doc');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
          }
          else {
            const reader = new FileReader();
            reader.onload = () => {
              const jsonBody = reader.result as string;
              const data = JSON.parse(jsonBody);
              if (data.statusCode == 200) {
                this.alertService.success(data.messageCode, alertOptions);
              }
              else {
                this.alertService.error(data.messageCode, alertOptions);
              }
            };
            reader.readAsText(response);
          }

        });
        break;
      case EnumCoreButtonVNSCode.HEADER_UPDATE:
        this.evaluateDialogService.createNew(EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATE_UPDATE_DATA, undefined, undefined, undefined,
          EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATE_INPUT_REASON, undefined, false, true,)
        break;
      default:
    }
  }
}