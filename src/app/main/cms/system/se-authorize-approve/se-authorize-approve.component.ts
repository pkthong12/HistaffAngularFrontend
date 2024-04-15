import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { IFilterOperator, EnumFilterOperator, IInOperator } from 'src/app/interfaces/IQueryListRequest';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import {
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICorePageListEditRouting,
} from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'cms-app-se-authorize-approve',
  templateUrl: './se-authorize-approve.component.html',
  styleUrls: ['./se-authorize-approve.component.scss'],
})
export class SeAuthorizeApproveComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SE_AUTHORIZE_APPROVE;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SE_AUTHORIZE_APPROVE_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.SE_AUTHORIZE_APPROVE_DELETE_IDS,
  };

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
  columns: ICoreTableColumnItem[] = [
    {
      caption: 'id',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_PROCESS,
      field: 'processName',
      type: 'number',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_FROM_DATE,
      field: 'fromDate',
      type: 'number',
      align: 'left',
      pipe: EnumCoreTablePipeType.DATE,
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_TO_DATE,
      field: 'toDate',
      type: 'number',
      align: 'left',
      pipe: EnumCoreTablePipeType.DATE,
      width: 250,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(public override mls: MultiLanguageService, private organizationService: OrganizationService) {
    super(mls);
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map((x) => newOrgIds.push(Number(x)));
    this.onOrgIdsChange(newOrgIds);
  }
  ngAfterViewInit(): void {}

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }
}
