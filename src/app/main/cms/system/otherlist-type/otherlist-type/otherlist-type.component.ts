import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { EnumFilterOperator, IFilterOperator } from 'src/app/interfaces/IQueryListRequest';
import { ICoreListOption } from 'src/app/libraries/core-list/core-list/core-list.component';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';

@Component({
  selector: 'app-otherlist-type',
  templateUrl: './otherlist-type.component.html',
  styleUrls: ['./otherlist-type.component.scss']
})
export class OtherlistTypeComponent implements OnInit {

  @Input() hideHeader!: boolean;
  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_ORTHERLIST_TYPE

  outerParam$ = new BehaviorSubject<any>(null);
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_OTHERLIST_TYPE_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_OTHERLIST_TYPE_DELETE_IDS,
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_OTHERLIST_TYPE_CODE, 
      field: 'code',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_OTHERLIST_TYPE_NAME, 
      field: 'name',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_OTHERLIST_TYPE_STATUS, 
      field: 'status',
      type: 'string',
      align: 'left',
      width: 400,
    },
  ];

  defaultAvatar!: string;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
  ) {
  }
  ngOnInit(): void {
    
  }
}
