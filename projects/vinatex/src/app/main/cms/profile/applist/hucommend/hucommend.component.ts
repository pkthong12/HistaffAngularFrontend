import { Component, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICoreChecklistOption, ICorePageListApiDefinition, ICorePageListEditRouting, ICorePageListCRUD, ISortItem, EnumSortDirection, ICoreTableColumnItem, EnumCoreTablePipeType, IGenerateTemplateRequest, MultiLanguageService, OrganizationService, IInOperator, ICoreButtonVNS, EnumCoreButtonVNSCode, ICoreButtonDropdownOption, AppService, CoreButtonGroupService, AlertService, alertOptions } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";
import { HuCommendEditService } from "./hucommend-edit/hucommendeditservice";

@Component({
  selector: 'app-hucommend',
  templateUrl: './hucommend.component.html',
  styleUrls: ['./hucommend.component.scss'],
})
export class HucommendComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  attachmentStatusOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  dataButtonPrints : ICoreButtonDropdownOption[] = []
  selectedIds!: number[];
  /* Bellow are three props to pass to CoreCommonParamKit */
  datePeriodComparisonFor: string = 'createdDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_DATE;
  statusInclusionFor: string = 'statusId';
  statusInclusionForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_STATUS_ID;
  statusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;
  outerParam$ = new BehaviorSubject<any>(null);
  orgIds!: number[];
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_COMMEND_QUERY_LIST,
  };
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_COMMEND_EMPLOYEE_DELETE_IDS,
    toggleApproveIds: api.HU_COMMEND_APPROVE_ACTIVE
  };
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  headerFirstRowHeight: number = 60;
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_COMMEND_OBJ_ID,
      field: 'commendObjName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_STATUS_ID,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 240,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_NO,
      field: 'no',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SIGN_DATE,
      field: 'signDate',
      type: 'date',
      align: 'center',
      width: 130,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_COMMEND_ORG_LEVEL,
      field: 'orgLevelName',
      type: 'string',
      align: 'left',
      width: 180,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_REASON,
      field: 'reason',
      type: 'string',
      align: 'left',
      width: 240,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_PAYMENT_NO,
      field: 'paymentNo',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SIGN_PAYMENT_DATE,
      field: 'signPaymentDate',
      type: 'date',
      align: 'center',
      width: 130,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_REWARD_LEVEL,
      field: 'rewardLevelName',
      type: 'string',
      align: 'left',
      width: 180,
    },

  ];

  generateTemplateRequest!: IGenerateTemplateRequest;

  constructor(
    public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
    private huCommendEditService: HuCommendEditService,
    private appService : AppService,
    private coreButtonGroupService : CoreButtonGroupService,
    private alertService : AlertService
  ) {
    super(mls);
    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map((x) =>
      newOrgIds.push(Number(x))
    );
    this.onOrgIdsChange(newOrgIds);
  }

  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: 'HU_COMMEND',
        lang: x
      }
    })
  }

  ngAfterViewInit(): void {
    const stickerFilter = this.columns.filter(c => c.field === 'statusName');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    setTimeout(() => {
      this.subscriptions.push(
        this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "COMMEND_INFORMATION_PRINTING_FORM").subscribe(x => {
          let vals = x.body.innerBody
          vals.map(x => {
            x.codeName = x.code + '-'+ x.name
          })
          vals.forEach(element => {
            let dataButtonPrint : ICoreButtonDropdownOption = {
              childCaptionCode : element.codeName,
              childIconWrapperClass : '',
              childCode: element.codeName,
              childIconClass: ''
            }
            this.dataButtonPrints.push(dataButtonPrint)
          });

          this.coreButtonGroupService.headerButtonPrintDropdownOptions$.next(this.dataButtonPrints)
        })
      )
    })
  }
  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || [],
    },
  ];
  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        this.huCommendEditService.commendId = 0
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        break;
        case EnumCoreButtonVNSCode.HEADER_DROPDOWN_PRINT:
        
      if (this.selectedIds.length > 1) {
        this.alertService.warn(this.mls.trans('PRINT_ONE_RECORD'), alertOptions);
        return;
      } else if(this.selectedIds.length == 0){
        this.alertService.warn(this.mls.trans(EnumTranslateKey.REPORT_SELECTED_NOT_NULL), alertOptions);
        return;
      }
      else {
        const fileName = e.childCodeClicked;
        const request = {
          fileName : fileName,
          id : this.selectedIds[0],
          viewName : "COMMEND"
        }
        this.appService
          .blobPost(api.EXPORT_WORD_BY_TEMPLATE,request)
          .subscribe((x: any) => {
            let downloadLink = document.createElement("a");
            downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
            downloadLink.setAttribute("download", fileName +'.doc');
            document.body.appendChild(downloadLink);
            downloadLink.click();
          });
      }
      break;
      default:
      break;
    }
  }  
  onRowClick(e: any) {
    this.huCommendEditService.commendId = e.commendId;
  }
  onSelectedIdsChange(e : number[]){
   this.selectedIds = e 
  }
}
