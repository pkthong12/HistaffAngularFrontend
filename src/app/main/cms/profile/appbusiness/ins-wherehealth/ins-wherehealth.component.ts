import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import {
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICorePageListEditRouting,
} from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';

@Component({
  selector: 'app-ins-wherehealth',
  templateUrl: './ins-wherehealth.component.html',
  styleUrls: ['./ins-wherehealth.component.scss'],
})
export class InsWherehealthComponent implements OnInit,AfterViewInit, OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_INS_WHEREHEALTH;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.INS_WHEREHEALTH_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.INS_WHEREHEALTH_DELETE_IDS,
    toggleActiveIds: api.INS_WHEREHEALTH_TOGGLE_ACTIVE_IDS
  };
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  constructor() {}
  ngOnDestroy(): void {}
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
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_WHEREHEALTH_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_WHEREHEALTH_NAME_VN,
      field: 'nameVn',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_INS_WHEREHEALTH_PROVINCE_NAME,
      field: 'provinceName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_INS_WHEREHEALTH_DISTRICT_NAME,
      field: 'districtName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_WHEREHEALTH_ADDRESS,
      field: 'address',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_WHEREHEALTH_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_WHEREHEALTH_ACTFLG,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      // đây là trạng thái
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'isActive',
      hidden: true,
      type: 'boolean',
      align: 'right',
      width: 30,
    }
  ];

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    const stickerFilter = this.columns.filter(c => c.field === 'status');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }
}
