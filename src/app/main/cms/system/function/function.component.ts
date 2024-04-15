import { Component, OnInit, OnDestroy, TemplateRef, ViewEncapsulation, AfterViewInit, ViewChild} from '@angular/core';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';

import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { api } from 'src/app/constants/api/apiDefinitions';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { EnumSortDirection, ISortItem } from 'src/app/interfaces/IQueryListRequest';

@Component({
  selector: "cms-app-Function",
  templateUrl: "./function.component.html",
  styleUrls: ["./function.component.scss"],
  encapsulation: ViewEncapsulation.None,
})

export class FunctionComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SYS_FUNCTION;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_FUNCTION_QUERY_LIST,
  }

  @ViewChild('pathFullMatch') pathFullMatchRef!: TemplateRef<any>;

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_FUNCTION_DELETE_IDS
  }

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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_MODULE_NAME,
      field: 'moduleName',
      type: 'string',
      align: 'left',
      width: 120
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_GROUP_NAME,
      field: 'groupName',
      type: 'string',
      align: 'left',
      width: 120
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_PATH,
      field: 'path',
      type: 'string',
      align: 'left',
      width: 500
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_PATH_FULL_MATCH,
      field: 'pathFullMatch',
      type: 'boolean',
      align: 'center',
      width: 100,
      templateRef: this.pathFullMatchRef,
    },

    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_STATUS,
      field: 'status',
      type: 'string',
      align: 'left',
      width: 80
    }
  ]

  defaultSort: ISortItem[] = [
    {
      field: 'moduleName',
      sortDirection: EnumSortDirection.ASC
    },
    {
      field: 'groupName',
      sortDirection: EnumSortDirection.ASC
    },
    {
      field: 'functionName',
      sortDirection: EnumSortDirection.ASC
    }
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.columns.filter(f => f.field === 'pathFullMatch')[0].templateRef = this.pathFullMatchRef;
    })
  }

}

