import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Inject,
  AfterViewInit,
  TemplateRef,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, Routes } from '@angular/router';

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
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { ToolbarItem, ToolbarInterface } from 'src/app/_models/index';
import { CoreService } from 'src/app/services/core.service';
import { ConfigService } from 'src/app/services/config.service';
import { ModalService } from 'src/app/services/modal.service';
import { Query } from '@syncfusion/ej2-data';
import {
  ListBoxComponent,
  CheckBoxSelection,
} from '@syncfusion/ej2-angular-dropdowns';
ListBoxComponent.Inject(CheckBoxSelection);
import { IpServiceService } from 'src/app/services/ip-service.service';

import {
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICorePageListEditRouting,
} from 'src/app/libraries/core-page-list/core-page-list.component';
import {
  ECoreTableToolClass,
  ECoreTableToolCode,
  ICoreTableColumnItem,
  ICoreTableToolItem,
} from 'src/app/libraries/core-table/core-table.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import {
  EnumFilterOperator,
  IFilterOperator,
} from 'src/app/interfaces/IQueryListRequest';
import { api } from 'src/app/constants/api/apiDefinitions';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { IAlertOptions } from 'src/app/libraries/alert/alert/alert.model';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { ShiftEditComponent } from './edit/shift-edit.component';
import { alertOptions } from 'src/app/constants/alertOptions';
import { ICoreButtonVNS } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { EnumCoreButtonVNSCode } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';
const _ = require('lodash');
setCulture('en');

@Component({
  selector: 'cms-app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss'],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class ShiftComponent extends BaseComponent implements AfterViewInit {

  title = EnumTranslateKey.UI_COMPONENT_TITLE_SHIFT;

  @ViewChild('isBoquacc') isBoquacc!: TemplateRef<any>;
  @ViewChild('isNight') isNight!: TemplateRef<any>;
  @ViewChild('isSunday') isSunday!: TemplateRef<any>;
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;
  stichkerTemplate!: TemplateRef<any>;

  headerFirstRowHeight: number = 50;
  corePageListInstanceNumber!: number;
  outerParam$ = new BehaviorSubject<any>(null);

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_SHIFT_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.AT_SHIFT_DELETE_IDS,
    toggleActiveIds: api.AT_SHIFT_TOGGLE_ACTIVE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: 'Shift.ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_IS_ACTIVE,
      field: 'isActiveStr',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 70,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 230,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_TIME_TYPE_ID,
      field: 'timeTypeName',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_HOURS_START,
      field: 'hoursStart',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.TIME_HHMM,
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_HOURS_STOP,
      field: 'hoursStop',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.TIME_HHMM,
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_BREAKS_FROM,
      field: 'breaksFrom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.TIME_HHMM,
      width: 70,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_BREAKS_TO,
      field: 'breaksTo',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.TIME_HHMM,
      width: 80,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_TIME_LATE,
      field: 'timeLate',
      type: 'string',
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_TIME_EARLY,
      field: 'timeEarly',
      type: 'string',
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_IS_BREAK,
      field: 'isBoquacc',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      hideSearchBox: true,
      width: 80,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_IS_SUNDAY,
      field: 'isSunday',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      hideSearchBox: true,
      width: 70,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_IS_NIGHT,
      field: 'isNight',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      hideSearchBox: true,
      width: 60,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_MIN_HOUR,
      field: 'minHoursWork',
      type: 'string',
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_REMARK,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_IS_ACTIVE,
    //   field: 'isActive',
    //   type: 'string',
    //   align: 'left',
    //   pipe: EnumCoreTablePipeType.BOOLEAN_TO_ACTIVE_INACTIVE,
    //   width: 150,
    // },
    
  ];
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
  };

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(mls);
    this.corePageListInstanceNumber = new Date().getTime();
  }
  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'isBoquacc')[0].templateRef =
      this.isBoquacc;
    this.columns.filter((c) => c.field === 'isSunday')[0].templateRef =
      this.isSunday;
    this.columns.filter((c) => c.field === 'isNight')[0].templateRef =
      this.isNight;
    this.columns.filter((c) => c.field === 'isActiveStr')[0].templateRef = this.sticker
  }

  // onRowDoubleClick(e: any) {
  //   console.log(e);
  //   if (!e.isActive) {
  //     this.alertService.error(
  //       this.mls.trans(
  //         EnumTranslateKey.UI_NOTIFICATION_CAN_NOT_EDIT_RECORD_NOT_APPROVE
  //       ),
  //       alertOptions
  //     );
  //   } else {
  //     this.router.navigate(
  //       [
  //         {
  //           outlets: {
  //             corePageListAux: [
  //               btoa(e.id),
  //               { listInstance: this.corePageListInstanceNumber },
  //             ],
  //           },
  //         },
  //       ],
  //       { relativeTo: this.route }
  //     );
  //   }
  // }

  // onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
  //   switch (e.code) {
  //     case EnumCoreButtonVNSCode.HEADER_CREATE:
  //       this.router.navigate(
  //         [
  //           {
  //             outlets: {
  //               corePageListAux: [
  //                 btoa('0'),
  //                 { listInstance: this.corePageListInstanceNumber },
  //               ],
  //             },
  //           },
  //         ],
  //         { relativeTo: this.route }
  //       );
  //       break;
  //     default:
  //       break;
  //   }
  // }
}
