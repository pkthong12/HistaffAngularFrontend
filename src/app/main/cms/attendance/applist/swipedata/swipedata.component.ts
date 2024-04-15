import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { IGenerateTemplateRequest } from 'src/app/libraries/core-page-list/core-page-list.service';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-swipedata',
  templateUrl: './swipedata.component.html',
  styleUrls: ['./swipedata.component.scss'],
  providers: [FilterService],
})
export class SwipeDataComponent extends BaseComponent implements OnInit, OnDestroy {
  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SWIPE_DATA;

  outerParam$ = new BehaviorSubject<any>(null);
  datePeriodComparisonFor: string = 'workingDay';
  datePeriodComparisonForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_FROM_DATE_FILTER;
  statusInclusionFor: string = 'statusId';
  statusInclusionForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_STATUS_ID;
  statusOptionsApi: api = api.DEMO_ATTACHMENT_GET_ATTACHMENT_STATUS_LIST;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_SWIPE_DATA_QUERY_LIST,
  };

  orgIds!: number[];
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL,
    }
  ]
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ]

  crud: ICorePageListCRUD = {
    deleteIds: api.AT_SWIPE_DATA_QUERY_DELETE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE,
      field: 'jobOrderNum',
      type: 'string',
      align: 'center',
      hidden: true,
      width: 0,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 30,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_EMPLOYEE_CODE,
      field: 'emplCode',
      type: 'string',
      align: 'left',
      width: 90,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_EMPLOYEE_NAME,
      field: 'emplName',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption:
        EnumTranslateKey.UI_LABEL_TIME_IMPORT_POSITION_NAME,
      field: 'posName',
      type: 'string',
      align: 'left',
      width: 320,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_ORGANIZATION_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 170,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_TERMINAL,
      field: 'terminalCode',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_ITIME_ID,
      field: 'itimeId',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_ATTENDENCE_DAY,
      field: 'workingDay',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'right',
      width: 100,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_ATTENDENCE_HOUR,
      field: 'valTime',
      type: 'time',
      pipe: EnumCoreTablePipeType.TIME_HHMM,
      align: 'center',
      width: 132,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_PLACE,
      field: 'addressPlace',
      type: 'string',
      align: 'left',
      width: 110,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };

  generateTemplateRequest!: IGenerateTemplateRequest;

  outerSort: ISortItem[] = [
    {
      field: 'workingDay',
      sortDirection: EnumSortDirection.DESC
    }
  ];

  constructor(public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
    ) {
    super(mls);
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
  }

  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: 'AT_SWIPE_DATA',
        lang: x
      }
    })
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

}