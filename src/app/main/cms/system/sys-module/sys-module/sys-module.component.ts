import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from 'src/app/libraries/core-page-list/core-page-list.component';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

@Component({
  selector: 'app-sys-module',
  templateUrl: './sys-module.component.html',
  styleUrls: ['./sys-module.component.scss']
})
export class SysModuleComponent  extends BaseComponent  implements OnInit, AfterViewInit {

  @ViewChild('isActive') isActive!: TemplateRef<any>;

  title = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MODULE_TITLE;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_MODULE_QUERY_LIST,
  }

  avatarTemplate!: TemplateRef<any>;
  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_MODULE_DELETE_IDS
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MODULE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MODULE_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_IS_ACTIVE,
      field: 'isActive',
      type: 'boolean',
      align: 'center',
      width: 100,
      templateRef: this.isActive
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

  ngAfterViewInit():void{
    this.columns.filter(c => c.field === 'isActive')[0].templateRef = this.isActive
  }

}
