import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
  Inject,
} from "@angular/core";
//import { Subject } from "rxjs";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

// Service Translate
import { TranslationLoaderService } from "src/app/common/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
// Import the locale files
import { locale as english } from "./i18n/en";
import { locale as vietnam } from "./i18n/vi";
import { BehaviorSubject, Subject } from "rxjs";
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
import { BaseComponent } from "src/app/libraries/base-component/base/base.component";
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from "src/app/libraries/core-page-list/core-page-list.component";
import { api } from "src/app/constants/api/apiDefinitions";
import { ECoreTableToolClass, ECoreTableToolCode, ICoreTableColumnItem, ICoreTableToolItem } from "src/app/libraries/core-table/core-table.component";
import { MultiLanguageService } from "src/app/services/multi-language.service";

import {
  ListBoxComponent,
  CheckBoxSelection,
} from "@syncfusion/ej2-angular-dropdowns";
ListBoxComponent.Inject(CheckBoxSelection);

import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { EnumCoreTablePipeType } from "src/app/libraries/core-table/EnumCoreTablePipeType";

const _ = require("lodash");
setCulture("en");

@Component({
  selector: "cms-app-groupposition",
  templateUrl: "./groupposition.component.html",
  styleUrls: ["./groupposition.component.scss"],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class GroupPositionComponent extends BaseComponent {

  title = EnumTranslateKey.UI_COMPONENT_TITLE_GROUP_POSITION;

  /* START: Local filter params */
  orgId!: number;
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]
  outerParam$ = new BehaviorSubject<any>(null);



  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_GROUP_POSITION_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_GROUP_POSITION_DELETE_IDS
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: 'GroupPosition.ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_POSITION_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_POSITION_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 500,
    },  
   
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_POSITION_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_POSITION_STATUS,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 100
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