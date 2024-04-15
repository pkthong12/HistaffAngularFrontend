import { Component, OnInit, TemplateRef } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from 'src/app/libraries/core-page-list/core-page-list.component';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

@Component({
  selector: 'app-sys-action',
  templateUrl: './sys-action.component.html',
  styleUrls: ['./sys-action.component.scss']
})
export class SysActionComponent extends BaseComponent implements OnInit {
  title = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_ACTION_TITLE;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_ACTION_QUERY_LIST,
  }

  avatarTemplate!: TemplateRef<any>;
  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_ACTION_DELETE_IDS
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_ACTION_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 500
    },
    /*
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_ACTION_NAME_VN,
      field: 'nameVn',
      type: 'string',
      align: 'left',
      width: 500
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_ACTION_NAME_EN,
      field: 'nameEn',
      type: 'string',
      align: 'left',
      width: 500
    },
    */
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
