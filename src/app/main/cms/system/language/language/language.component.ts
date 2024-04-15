import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';

import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit, OnDestroy {

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_LANGUAGE;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_LANGUAGE_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_LANGUAGE_DELETE_IDS
  }

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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_LANGUAGE_KEY,
      field: 'key',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_LANGUAGE_VI,
      field: 'vi',
      type: 'string',
      align: 'left',
      width: 300
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_LANGUAGE_EN,
      field: 'en',
      type: 'string',
      align: 'left',
      width: 300
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_DATE,
      field: 'createdDate',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE_TIME
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_BY,
      field: 'createdByUsername',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_UPDATED_DATE,
      field: 'updatedDate',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE_TIME
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_UPDATED_BY,
      field: 'updatedByUsername',
      type: 'string',
      align: 'left',
      width: 150,
    },
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-list */

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
