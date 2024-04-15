import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import {
  ECoreTableToolClass,
  ECoreTableToolCode,
  ICoreTableColumnItem,
  ICoreTableToolItem,
} from 'src/app/libraries/core-table/core-table.component';

import {
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICorePageListEditRouting,
} from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { api } from 'src/app/constants/api/apiDefinitions';
import { BehaviorSubject, Subject } from 'rxjs';
import { FilterService } from '@syncfusion/ej2-angular-grids';
import {
  EnumFilterOperator,
  EnumSortDirection,
  IFilterOperator,
  IInOperator,
  ISortItem,
} from 'src/app/interfaces/IQueryListRequest';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'cms-app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss'],
  providers: [FilterService],
})
export class DisciplineComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  orgIds!: number[];

  outerParam$ = new BehaviorSubject<any>(null);
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL,
    },
  ];
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || [],
    },
  ];
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_DISCIPLINE;

  datePeriodComparisonFor: string = 'effectDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_FROM_DATE_FILTER;
  statusInclusionFor: string = 'empStatusId';
  statusInclusionForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_CORE_PARAMS_EMPLOYEE_STATUS_IN;
  statusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_DISCIPLINE_QUERY_LIST,
  };
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_DISCIPLINE_DELETE_IDS,
    toggleApproveIds: api.HU_DISCIPLINE_CHANGESTATUSAPPROVE,
  };
  headerFirstRowHeight: number = 60
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_STATUS,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_NO,
      field: 'decisionNo',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_EFFECT_DATE,
      field: 'effectDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EXPIRE_DATE,
      field: 'expireDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_ISSUED_DATE,
      field: 'issuedDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_TYPE,
      field: 'disciplineTypeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_REASON,
      field: 'reason',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250,
    },
    
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  constructor(private organizationService: OrganizationService) {
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map((x) =>
      newOrgIds.push(Number(x))
    );
    this.onOrgIdsChange(newOrgIds);
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
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    const stickerFilter = this.columns.filter(c => c.field === 'statusName');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }
  ngOnDestroy(): void { }
}
