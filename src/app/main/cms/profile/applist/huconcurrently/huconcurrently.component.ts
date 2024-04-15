import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { EnumFilterOperator, IFilterOperator, IInOperator } from 'src/app/interfaces/IQueryListRequest';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

@Component({
  selector: 'app-huconcurrently',
  templateUrl: './huconcurrently.component.html',
  styleUrls: ['./huconcurrently.component.scss']
})
export class HuconcurrentlyComponent extends BaseComponent {
  orgIds!: number[];
  outerParam$ = new BehaviorSubject<any>(null);

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_CONCURRENTLY_QUERRY_LIST_CONCURRENT,
  };
  title = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY;
  crud!: ICorePageListCRUD;
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
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

  constructor(public override mls: MultiLanguageService) {
    super(mls)
    this.crud = {
      deleteIds: api.HU_CONCURRENTLY_DELETE_IDS,
    };
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
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_FULLNAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_POSTION_TITLE,
      field: 'positionConcurrentName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_ORG_NAME,
      field: 'orgConcurrentName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_EFFECTIVE_DATE,
      field: 'effectiveDate',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_EXPIRATION_DATE,
      field: 'expirationDate',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_STATUS,
      field: 'status',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },

  ]

}
