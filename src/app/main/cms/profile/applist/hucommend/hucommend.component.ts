import {
  AfterViewInit,
  Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef, ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { EnumSortDirection, IInOperator, ISortItem } from 'src/app/interfaces/IQueryListRequest';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import {
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICorePageListEditRouting,
} from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { HuCommendEditService } from './hucommend-edit/hucommendeditservice';
import { ICoreChecklistOption } from 'src/app/libraries/core-checklist/core-checklist/core-checklist.component';
import { ICoreButtonVNS } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { EnumCoreButtonVNSCode } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';
import { IGenerateTemplateRequest } from 'src/app/libraries/core-page-list/core-page-list.service';

@Component({
  selector: 'app-hucommend',
  templateUrl: './hucommend.component.html',
  styleUrls: ['./hucommend.component.scss'],
})
export class HucommendComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  attachmentStatusOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_JOB_ORDER_NUM,
      field: 'jobOrderNum',
      type: 'string',
      align: 'right',
      width: 0,
      hidden: true,
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
    private huCommendEditService: HuCommendEditService
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
      default:
    }
  }  
  onRowClick(e: any) {
    this.huCommendEditService.commendId = e.commendId;
  }
}
