import { Component, OnInit, TemplateRef } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from 'src/app/libraries/core-page-list/core-page-list.component';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

@Component({
  selector: 'app-sys-function-action',
  templateUrl: './sys-function-action.component.html',
  styleUrls: ['./sys-function-action.component.scss']
})
export class SysFunctionActionComponent extends BaseComponent implements OnInit {

  title = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_ACTION_TITLE;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_FUNCTION_ACTION_QUERY_LIST,
  }

  avatarTemplate!: TemplateRef<any>;
  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_FUNCTION_ACTION_DELETE_IDS
  }
 
  
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      // width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_ACTION_FUNCTION_NAME,
      field: 'functionCode',
      type: 'string',
      align: 'left',
      width: 500
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_ACTION_ACTION_NAME,
      field: 'actionCode',
      type: 'string',
      align: 'left',
      width: 500
    },
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
  ) {
    super(mls);
  }

}
