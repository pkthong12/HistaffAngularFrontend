import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
  Inject,
  TemplateRef,
} from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

// Service Translate
import { TranslationLoaderService } from "src/app/common/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
// Import the locale files
import { locale as english } from "./i18n/en";
import { locale as vietnam } from "./i18n/vi";
// Globals File
import { Globals } from "src/app/common/globals";
import { Configs } from "src/app/common/configs";
import { Notification } from "src/app/common/notification";
import { L10n, setCulture } from "@syncfusion/ej2-base";

import {
  FilterService,
  GridComponent,
  VirtualScrollService,

} from "@syncfusion/ej2-angular-grids";
import { DataStateChangeEventArgs } from "@syncfusion/ej2-angular-grids";
import { ToolbarItem, ToolbarInterface } from "src/app/_models/index";
import { CoreService } from "src/app/services/core.service";
import { ConfigService } from "src/app/services/config.service";
import { ModalService } from "src/app/services/modal.service";
import { Query } from "@syncfusion/ej2-data";
import { FieldSettingsModel } from "@syncfusion/ej2-dropdowns";
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from "src/app/libraries/core-page-list/core-page-list.component";
import { ECoreTableToolClass, ECoreTableToolCode, ICoreTableColumnItem, ICoreTableToolItem } from "src/app/libraries/core-table/core-table.component";
import { BehaviorSubject, Subject } from "rxjs";
import { EnumCoreTablePipeType } from "src/app/libraries/core-table/EnumCoreTablePipeType";
import { BaseComponent } from "src/app/libraries/base-component/base/base.component";
import { MultiLanguageService } from "src/app/services/multi-language.service";
import { EnumFilterOperator, IFilterOperator } from "src/app/interfaces/IQueryListRequest";
import { api } from "src/app/constants/api/apiDefinitions";
import {
  ListBoxComponent,
  CheckBoxSelection,
} from "@syncfusion/ej2-angular-dropdowns";
ListBoxComponent.Inject(CheckBoxSelection);
import { IpServiceService } from "src/app/services/ip-service.service";

import { DropDownList } from "@syncfusion/ej2-angular-dropdowns";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";

const _ = require("lodash");
setCulture("en");

@Component({
  selector: "cms-app-salaryscale",
  templateUrl: "./salaryscale.component.html",
  styleUrls: ["./salaryscale.component.scss"],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class SalaryScaleComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('isTableScore') isTableScore!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /* START: Local filter params */
  orgId!: number;
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_SCALE

  outerParam$ = new BehaviorSubject<any>(null);
  headerFirstRowHeight: number = 50;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_SALARY_SCALE_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_SALARY_SCALE_DELETE_IDS,
    toggleActiveIds: api.HU_SALARY_SCALE_TOGGLE_ACTIVE_IDS,
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 400,
    },
    {
      // trường trạng thái
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'isActive',
      hidden: true,
      type: 'boolean',
      align: 'left',
      width: 10,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_IS_ACTIVE,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_EFFECTIVE_DATE,
      field: 'effectiveDate',
      type: 'string',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_EXPIRATION_DATE,
      field: 'expirationDate',
      type: 'string',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_IS_TABLE_SCORE,
      field: 'isTableScore',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      width: 130,
      readonly:true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
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
  ngAfterViewInit(): void {
    this.columns.filter(c => c.field === 'isTableScore')[0].templateRef = this.isTableScore;
    const stickerFilter = this.columns.filter(c => c.field === 'status');
        if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }

  onOrgIdChange(orgId: number) {
    if (!!this.outerParam$.value) {
      const newOuterParam = JSON.parse(JSON.stringify(this.outerParam$.value))
      newOuterParam['orgId'] = orgId;
      this.outerParam$.next(newOuterParam);
    } else {
      this.outerParam$.next({ orgId });
    }
  }
}
