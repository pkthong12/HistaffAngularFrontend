import { Component, ViewEncapsulation, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import {
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICorePageListEditRouting,
} from 'src/app/libraries/core-page-list/core-page-list.component';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumSortDirection, ISortItem } from 'src/app/interfaces/IQueryListRequest';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';

@Component({
  selector: 'cms-setup-time-emp',
  templateUrl: './setuptimeemp.component.html',
  styleUrls: ['./setuptimeemp.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SetupTimeEmpComponent
  extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /* START: Local filter params */
  orgId!: number;
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]
  outerParam$ = new BehaviorSubject<any>(null);
  headerFirstRowHeight: number = 50
  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_SETUP_TIME_EMP;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_SETUP_TIME_EMP_QUERY_LIST,
  };

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.AT_SETUP_TIME_EMP_DELETE_IDS,
    toggleActiveIds: api.AT_SETUP_TIME_EMP_TOGGLE_ACTIVE_IDS,
  }

  // Sắp xếp lưới hiển thị theo cấp chức danh
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 90,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 170,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_EMPLOYEE_POSITION,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_ORGANIZATION_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_NUMBER_SWIPECARD,
      field: 'numberSwipecard',
      type: 'string',
      align: 'center',
      width: 120,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EFFECT_DATE,
      field: 'startDateHl',
      type: 'string',
      align: 'left',
      width: 120,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_EXPIRATION_DATE,
      field: 'endDateHl',
      type: 'string',
      align: 'left',
      width: 140,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_STATUS,
      field: 'status',
      type: 'string',
      align: 'left',
      width: 100,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_DESCRIPTION,
      field: 'note',
      type: 'string',
      align: 'left',
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
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(public override mls: MultiLanguageService) {
    super(mls);
  }



  onOrgIdChange(orgId: number) {
    if (!!this.outerParam$.value) {
      const newOuterParam = JSON.parse(JSON.stringify(this.outerParam$.value));
      newOuterParam['orgId'] = orgId;
      this.outerParam$.next(newOuterParam);
    } else {
      this.outerParam$.next({ orgId });
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }
}