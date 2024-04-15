import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';

import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';

@Component({
  selector: 'app-function-ignore',
  templateUrl: './function-ignore.component.html',
  styleUrls: ['./function-ignore.component.scss']
})
export class FunctionIgnoreComponent implements OnInit, OnDestroy {

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SYS_FUNCTION_IGNORE;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_FUNCTION_IGNORE_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_FUNCTION_IGNORE_DELETE_IDS
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_IGNORE_PATH,
      field: 'path',
      type: 'string',
      align: 'left',
      width: 600,
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