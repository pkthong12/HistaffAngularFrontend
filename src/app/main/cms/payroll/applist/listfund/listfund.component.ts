import { Component, ViewEncapsulation, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import {
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICorePageListEditRouting,
} from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

import {
  FilterService,
  VirtualScrollService,
} from '@syncfusion/ej2-angular-grids';

import {
  ListBoxComponent,
  CheckBoxSelection,
} from '@syncfusion/ej2-angular-dropdowns';
import { setCulture } from '@syncfusion/ej2-base';

ListBoxComponent.Inject(CheckBoxSelection);

const _ = require('lodash');
setCulture('en');

@Component({
  selector: 'app-listfund',
  templateUrl: './listfund.component.html',
  styleUrls: ['./listfund.component.scss'],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class ListfundCompnent
  extends BaseComponent
  implements AfterViewInit
{
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /* START: Local filter params */
  orgId!: number;
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]
  outerParam$ = new BehaviorSubject<any>(null);

  title = EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTFUND;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.PA_LISTFUND_QUERY_LIST,
  };

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.PA_LISTFUND_DELETE_IDS,
    toggleActiveIds: api.PA_LISTFUND_TOGGLE_ACTIVE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'center',
      width: 30,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_LISTFUND_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_LISTFUND_CODE,
      field: 'listfundCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_LISTFUND_NAME,
      field: 'listfundName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_LISTFUND_COMPANY_NAME,
      field: 'companyName',
      type: 'string',
      align: 'left',
      width: 500,
    },
    
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_LISTFUND_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 500,
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
    this.columns.filter((c) => c.field === 'status')[0].templateRef = this.sticker
    
  }

}
