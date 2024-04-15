import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';

import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';

@Component({
  selector: 'core-hrm-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit, OnDestroy {

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_CORE_HRM_OBJECT;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HRM_OBJECT_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HRM_OBJECT_DELETE_IDS
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      type: 'number',
      hidden: true,
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HRM_OBJECT_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_DATE,
      field: 'createdOn',
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
      field: 'updatedOn',
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
