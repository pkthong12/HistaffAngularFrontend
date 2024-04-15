import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import {
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICorePageListEditRouting,
} from 'src/app/libraries/core-page-list/core-page-list.component';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

@Component({
  selector: 'app-list-fund-source',
  templateUrl: './list-fund-source.component.html',
  styleUrls: ['./list-fund-source.component.scss'],
})
export class ListFundSourceComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_PA_LIST_FUND_SOURCE;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.PA_LIST_FUND_SOURCE_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.PA_LIST_FUND_SOURCE_DELETE_IDS,
    toggleActiveIds: api.PA_LIST_FUND_SOURCE_TOGGLE_ACTIVE_IDS,
  };

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
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LIST_FUND_SOURCE_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LIST_FUND_SOURCE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LIST_FUND_SOURCE_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 350,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LIST_FUND_SOURCE_COMPANY_NAME,
      field: 'companyName',
      type: 'string',
      align: 'left',
      width: 350,
    },
    
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LIST_FUND_SOURCE_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(public override mls: MultiLanguageService) {
    super(mls);
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.columns.filter((c) => c.field === 'status')[0].templateRef = this.sticker

    })
  }

  onOrgIdChange(orgId: number) { }
}
