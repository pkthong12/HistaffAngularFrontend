import {
  AfterViewInit,
  Component,
  Input,
  TemplateRef,
  ViewChild,
} from "@angular/core";

import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from "src/app/libraries/core-page-list/core-page-list.component";
import { ICoreTableColumnItem } from "src/app/libraries/core-table/core-table.component";
import { api } from "src/app/constants/api/apiDefinitions";
import { EnumFilterOperator, EnumSortDirection, IFilterOperator, IInOperator, ISortItem } from "src/app/interfaces/IQueryListRequest";
import { BehaviorSubject, filter } from "rxjs";
import { EnumCoreTablePipeType } from "src/app/libraries/core-table/EnumCoreTablePipeType";
import { BaseComponent } from "src/app/libraries/base-component/base/base.component";
import { MultiLanguageService } from "src/app/services/multi-language.service";
import { RandomAvatarService } from "src/app/services/random-avatar.service";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumCoreButtonCode } from "src/app/libraries/core-button-group/core-button/EnumButtonCaptionCode";
import { ICoreButtonVNS } from "src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS";
import { EnumCoreButtonVNSCode } from "src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode";
import { OrganizationService } from "src/app/services/organization.service";
import { HttpClient } from '@angular/common/http';
import { CorePageListService, IGenerateTemplateRequest } from "src/app/libraries/core-page-list/core-page-list.service";
import { AlertService } from "src/app/libraries/alert/alert.service";
import { IAlertOptions } from "src/app/libraries/alert/alert/alert.model";
import { AppService } from "src/app/services/app.service";
import { IFormatedResponse } from "src/app/interfaces/IFormatedResponse";
import { ContractInforService } from "./contractinfor.service";

@Component({
  selector: "cms-profile-contractinfor",
  templateUrl: "./contractinfor.component.html",
  styleUrls: ["./contractinfor.component.scss"],
})
export class ContractInforComponent extends BaseComponent implements AfterViewInit {

  @Input() hideHeader!: boolean;

  @ViewChild('sticker') sticker!: TemplateRef<any>;
  /* START: Local filter params */
  orgIds!: number[];
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */
  datePeriodComparisonFor: string = 'startDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STARTDATE_FILTER;
  statusInclusionFor: string = 'workStatusId';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_CORE_PARAMS_EMPLOYEE_STATUS_IN;
  statusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;

  id: any;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_CONTRACT
  outerParam$ = new BehaviorSubject<any>(null);

  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL
    }
  ]
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ]
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_CONTRACT_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_CONTRACT_DELETE_IDS,
    toggleApproveIds: api.HU_CONTRACT_CHANGESTATUSAPPROVE
  }

  avatarTemplate!: TemplateRef<any>;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 10,
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
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STATUSNAME,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EMPLOYEECODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 70,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EMPLOYEENAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_ORGNAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_CONTRACTNO,
      field: 'contractNo',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_CONTRACTTYPENAME,
      field: 'contractTypeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STARTDATE,
      field: 'startDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EXPIREDATE,
      field: 'expireDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
    },

    // chắc là viết code ở đây
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_LIQUIDATION_DATE,
      field: 'liquidationDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_LIQUIDATION_REASON,
      field: 'liquidationReason',
      type: 'string',
      align: 'left',
      width: 200,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_SIGNDATE,
      field: 'signDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_SIGNERNAME,
      field: 'signerName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_SIGNERPOSITION,
      field: 'signerPosition',
      type: 'string',
      align: 'left',
      width: 250,
    },

  ]

  defaultAvatar!: string;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-list */
  generateTemplateRequest!: IGenerateTemplateRequest;
  constructor(
    public override mls: MultiLanguageService,
    private ras: RandomAvatarService,
    private router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private http: HttpClient,
    private appService: AppService,
    private corePageListService: CorePageListService,
    private contractInforService: ContractInforService,
    private alertService: AlertService
  ) {
    super(mls);
    this.defaultAvatar = ras.get();
    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
    this.corePageListInstanceNumber = new Date().getTime();
  }
  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: 'HU_CONTRACT',
        lang: x
      }
    })
  }

  ngAfterViewInit(): void {
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

  onRowClick(e: any) {
    this.id = e.id
  }

  selectedIds: number[] = [];

  listInstance!: number;

  onInstanceCreated(event: number) {
    this.listInstance = event;
  }

  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };

  employeeId!: number;

  customizeSelectedIdsChange(e: number[]): void {
    this.selectedIds = e;

    this.contractInforService.changeListEmployeeSelected(e);
    this.contractInforService.currentListEmployeeSelected.subscribe(id => this.employeeId = id[0]);
  }

  corePageListInstanceNumber!: number;

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_PRINT:



        let filename = '';
        this.http.get(api.HU_CONTRACT_GET_FILENAME + this.id.toString()).subscribe((response: any) => {
          filename = response.innerBody;
        });
        this.http.get(api.HU_CONTRACT_PRINT, {
          responseType: 'blob',
          params: { id: this.id.toString() }
        }).subscribe((response: Blob) => {
          const downloadUrl = URL.createObjectURL(response);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', filename+'.doc');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(downloadUrl);
        });
        break;
      case EnumCoreButtonVNSCode.HEADER_LIQUIDATE_CONTRACT:
        if (this.selectedIds.length != 0) {
          this.router.navigate(
            [
              {
                outlets: {
                  corePageListAux: [
                    btoa('0'),
                    { listInstance: this.corePageListInstanceNumber },
                  ],
                },
              },
            ],
            { relativeTo: this.route }
          );
        }
        else {
          // bắn ra thông báo chưa chọn bản ghi
          this.alertService.error(this.mls.trans('NO_SELECTED_ID_TO_DELETE'), this.alertOptions);
        }

        break;
      default:
    }
  }

}
