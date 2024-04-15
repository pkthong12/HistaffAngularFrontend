import { Component, OnInit, OnDestroy, TemplateRef, ViewEncapsulation, AfterViewInit, ViewChild} from '@angular/core';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';

import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { api } from 'src/app/constants/api/apiDefinitions';
import { AppService } from 'src/app/services/app.service';
import { CorePageListService } from 'src/app/libraries/core-page-list/core-page-list.service';
import { ICoreButtonVNS } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { EnumCoreButtonVNSCode } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';

@Component({
  selector: 'app-hu-ward',
  templateUrl: './hu-ward.component.html',
  styleUrls: ['./hu-ward.component.scss']
})
export class HuWardComponent implements OnInit, AfterViewInit , OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_WARD;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_WARD_QUERY_LIST,
  }

  avatarTemplate!: TemplateRef<any>;

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_WARD_DELETE_IDS,
    toggleActiveIds: api.HU_WARD_TOGGLER_ACTIVE_IDS
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
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WARD_IS_ACTIVE,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WARD_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WARD_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DISTRICT_NAME,
      field: 'districtName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PROVINCE_NAME,
      field: 'provinceName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_NATION_NAME,
      field: 'nationName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WARD_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300
    },
    
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    private appService: AppService,
    public corePageListService : CorePageListService
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() =>{
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })  
  }

  ngOnDestroy(): void {
  }


}
