import {
  Component,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// Service Translate
import { TranslationLoaderService } from 'src/app/common/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
// Import the locale files
import { locale as english } from './i18n/en';
import { locale as vietnam } from './i18n/vi';
// Globals File
import { Globals } from 'src/app/common/globals';
import { Configs } from 'src/app/common/configs';
import { Notification } from 'src/app/common/notification';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import {
  FilterService,
  GridComponent,
  VirtualScrollService,
} from '@syncfusion/ej2-angular-grids';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-grids';
import { ToolbarItem, ToolbarInterface } from 'src/app/_models/index';
import { Query } from '@syncfusion/ej2-data';
import {
  ListBoxComponent,
  CheckBoxSelection,
} from '@syncfusion/ej2-angular-dropdowns';
ListBoxComponent.Inject(CheckBoxSelection);
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { HttpResponse } from '@angular/common/http';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import {
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICorePageListEditRouting,
} from 'src/app/libraries/core-page-list/core-page-list.component';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { ICoreButtonVNS } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { EnumCoreButtonVNSCode } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { IAlertOptions } from 'src/app/libraries/alert/alert/alert.model';
import { AppService } from 'src/app/services/app.service';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
setCulture('en');

@Component({
  selector: 'cms-app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class JobComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  orgId!: number;
  
  selectedIds: number[] = [];
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]

  outerParam$ = new BehaviorSubject<any>(null);

  alertOptions: IAlertOptions = {
    autoClose: false,
    keepAfterRouteChange: true
  };
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_JOB_QUERY_LIST,
  };
  title = EnumTranslateKey.UI_COMPONENT_TITLE_JOB;
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_JOB_DELETE_IDS,
    toggleActiveIds: api.HU_JOB_CHANGESTATUS
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_IS_ACTIVE,
      field: 'actflg',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 110,
      hidden:true
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_NAMEVN,
      field: 'nameVN',
      type: 'string',
      align: 'left',
      width: 350,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_NAMEEN,
      field: 'nameEN',
      type: 'string',
      align: 'left',
      width: 350,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_PURPOSE,
      field: 'purpose',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_JOB_FAMILY,
      field: 'jobFamilyID',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
   
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(public override mls: MultiLanguageService,
    private alertService : AlertService,
    private appService: AppService) {
    super(mls);
  }
  ngAfterViewInit(): void {
    const stickerFilter = this.columns.filter(c => c.field === 'actflg');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }
  
}
