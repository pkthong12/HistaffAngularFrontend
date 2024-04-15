import { Component, ViewEncapsulation, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import {
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICorePageListEditRouting,
} from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';


@Component({
  selector: 'cms-app-contracttype',
  templateUrl: './contracttype.component.html',
  styleUrls: ['./contracttype.component.scss'],
})
export class ContractTypeComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('isBhxh') isBhxh!: TemplateRef<any>;
  @ViewChild('isBhyt') isBhyt!: TemplateRef<any>;
  @ViewChild('isBhtn') isBhtn!: TemplateRef<any>;
  @ViewChild('isBhtnldBnn') isBhtnldBnn!: TemplateRef<any>;
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  /* START: Local filter params */
  orgId!: number;
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]
  outerParam$ = new BehaviorSubject<any>(null);

  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_CONTRACT_TYPE;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_CONTRACT_TYPE_QUERY_LIST,
  };

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_CONTRACT_TYPE_DELETE_IDS,
    toggleActiveIds: api.HU_CONTRACT_TYPE_TOGGLE_ACTIVE_IDS,
  };

  checkboxTemplate!: TemplateRef<any>;
  


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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_TYPE,
      field: 'typeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_PERIOD,
      field: 'period',
      type: 'string',
      align: 'center',
      width: 140,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_BHXH,
      field: 'isBhxh',
      type: 'bool',
      align: 'center',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,
      readonly: true,
      // width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_BHYT,
      field: 'isBhyt',
      type: 'bool',
      align: 'center',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,
      readonly: true,
      // width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_BHTN,
      field: 'isBhtn',
      type: 'bool',
      align: 'center',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,
      readonly: true,
      // width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_BHTNLD_BNN,
      field: 'isBhtnldBnn',
      type: 'bool',
      align: 'center',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,
      readonly: true,
      // width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
    },
    
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(public override mls: MultiLanguageService) {
    super(mls);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.columns.filter((c) => c.field === 'isBhxh')[0].templateRef =
        this.isBhxh;
      this.columns.filter((c) => c.field === 'isBhyt')[0].templateRef =
        this.isBhyt;
      this.columns.filter((c) => c.field === 'isBhtn')[0].templateRef =
        this.isBhtn;
      this.columns.filter((c) => c.field === 'isBhtnldBnn')[0].templateRef =
        this.isBhtnldBnn;
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    });
  }

  onOrgIdChange(orgId: number) {
    if (!!this.outerParam$.value) {
      const newOuterParam = JSON.parse(JSON.stringify(this.outerParam$.value));
      newOuterParam['orgId'] = orgId;
      this.outerParam$.next(newOuterParam);
    } else {
      this.outerParam$.next({ orgId });
    }
  }
}
