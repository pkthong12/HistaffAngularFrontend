import {
  Component,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';

import { setCulture } from '@syncfusion/ej2-base';
import {
  FilterService,
  VirtualScrollService,
} from "@syncfusion/ej2-angular-grids";
import {
  ListBoxComponent,
  CheckBoxSelection,
} from "@syncfusion/ej2-angular-dropdowns";
ListBoxComponent.Inject(CheckBoxSelection);
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from "src/app/libraries/core-page-list/core-page-list.component";
import { ICoreTableColumnItem } from "src/app/libraries/core-table/core-table.component";

import { BaseComponent } from "src/app/libraries/base-component/base/base.component";
import { MultiLanguageService } from "src/app/services/multi-language.service";
import { api } from "src/app/constants/api/apiDefinitions";
import { EnumCoreTablePipeType } from "src/app/libraries/core-table/EnumCoreTablePipeType";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { EnumSortDirection, ISortItem } from 'src/app/interfaces/IQueryListRequest';

const _ = require("lodash");
setCulture("en");

@Component({
  selector: 'app-insregion',
  templateUrl: './insregion.component.html',
  styleUrls: ['./insregion.component.scss'],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class InsRegionComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  orgId!: number;


  outerParam$ = new BehaviorSubject<any>(null);
  title = EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGION;
  outerSort: ISortItem[] = [
    {
      field: 'areaName',
      sortDirection: EnumSortDirection.ASC
    },
    {
      field: 'effectDate',
      sortDirection: EnumSortDirection.DESC
    },
  ];
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.INS_REGION_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.INS_REGION_DELETE_IDS,
    toggleActiveIds: api.INS_REGION_TOGGLE_ACTIVE_IDS
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
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_IS_ACTIVE,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_NAME,//ten vung
      field: 'areaName',
      type: 'string',
      align: 'left',
      width: 70,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_EFFECT_DATE,
      field: 'effectDate',
      pipe: EnumCoreTablePipeType.DATE,
      type: 'date',
      align: 'right',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_EXPRIVED_DATE,
      field: 'exprivedDate',
      pipe: EnumCoreTablePipeType.DATE,
      type: 'date',
      align: 'left',
      hidden: true,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_MONEY,
      field: 'money',
      type: 'string',
      align: 'right',
      width: 180,
      pipe: EnumCoreTablePipeType.NUMBER,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_CEILING_UI,
      field: 'ceilingUi',
      type: 'string',
      align: 'right',
      width: 180,
      pipe: EnumCoreTablePipeType.NUMBER,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 500
    }
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  constructor(
    public override mls: MultiLanguageService,
  ) {
    super(mls);
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }

}
