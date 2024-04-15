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

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TerminalComponent extends BaseComponent implements AfterViewInit  {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /* START: Local filter params */
  orgId!: number;
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]
  outerParam$ = new BehaviorSubject<any>(null);

  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_TERMINAL;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_TERMINAL_QUERY_LIST,
  };

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.AT_TERMINAL_DELETE_IDS,
    toggleActiveIds: api.AT_TERMINAL_TOGGLE_ACTIVE_IDS,
  };

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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_CODE,
      field: 'terminalCode',
      type: 'string',
      align: 'left',
      width: 145,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_NAME,
      field: 'terminalName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_ADDRESS_PLACE,
      field: 'addressPlace',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_IP,
      field: 'terminalIp',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_PORT,
      field: 'terminalPort',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_LAST_TIME_STATUS,
      field: 'lastTimeStatus',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_TERMINAL_STATUS,
      field: 'terminalStatus',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_TERMINAL_ROW,
      field: 'terminalRow',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_LAST_TIME_UPDATE,
      field: 'lastTimeUpdate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
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
    this.columns.filter((c) => c.field === 'status')[0].templateRef = this.sticker
    
  }
}
