import { Component, OnDestroy, OnInit } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';

@Component({
  selector: 'app-portal-route',
  templateUrl: './portal-route.component.html',
  styleUrls: ['./portal-route.component.scss']
})
export class PortalRouteComponent implements OnInit, OnDestroy {

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_PORTAL_ROUTE;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.PORTAL_ROUTE_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.PORTAL_ROUTE_DELETE_IDS
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PORTAL_ROUTE_PATH,
      field: 'path',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PORTAL_ROUTE_VI,
      field: 'vi',
      type: 'string',
      align: 'left',
      width: 300
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PORTAL_ROUTE_EN,
      field: 'en',
      type: 'string',
      align: 'left',
      width: 300
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
