import {
  Component,
  ViewEncapsulation,
  AfterViewInit,
} from "@angular/core";
import { BehaviorSubject } from "rxjs";

import {setCulture } from "@syncfusion/ej2-base";
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
const _ = require("lodash");
setCulture("en");

@Component({
  selector: "cms-app-kpigroup",
  templateUrl: "./kpigroup.component.html",
  styleUrls: ["./kpigroup.component.scss"],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class KpiGroupComponent extends BaseComponent implements AfterViewInit {


  /* START: Local filter params */
  orgId!: number;
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]

  outerParam$ = new BehaviorSubject<any>(null);

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.PA_KPI_GROUP_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.PA_KPI_GROUP_DELETE_IDS
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: 'KpiGroup.ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 0,
    },
    {
      caption: 'KpiGroup.name',
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: 'KpiGroup.orders',
      field: 'orders',
      type: 'string',
      align: 'right',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 100,
    },
    {
      caption: 'KpiGroup.isActive',
      field: 'isActive',
      type: 'string',
      align: 'left',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_ACTIVE_INACTIVE,
      width: 150,
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
    
  }
}
// import {
//   Component,
//   OnInit,
//   ViewChild,
//   ViewEncapsulation,
//   Inject,
// } from "@angular/core";
// import { Subject } from "rxjs";
// import { Observable } from "rxjs";
// import { Router } from "@angular/router";

// // Service Translate
// import { TranslationLoaderService } from "src/app/common/translation-loader.service";
// import { TranslateService } from "@ngx-translate/core";
// // Import the locale files
// import { locale as english } from "./i18n/en";
// import { locale as vietnam } from "./i18n/vi";
// // Globals File
// import { Globals } from "src/app/common/globals";
// import { Configs } from "src/app/common/configs";
// import { Notification } from "src/app/common/notification";
// import { L10n, setCulture } from "@syncfusion/ej2-base";
// import {
//   FilterService,
//   GridComponent,
//   VirtualScrollService,
// } from "@syncfusion/ej2-angular-grids";
// import { DataStateChangeEventArgs } from "@syncfusion/ej2-angular-grids";
// import { ToolbarItem, ToolbarInterface } from "src/app/_models/index";
// import { CoreService } from "src/app/services/core.service";
// import { ConfigService } from "src/app/services/config.service";
// import { ModalService } from "src/app/services/modal.service";
// import { Query, Predicate, DataManager } from "@syncfusion/ej2-data";
// import { FieldSettingsModel } from "@syncfusion/ej2-dropdowns";
// import {
//   ListBoxComponent,
//   CheckBoxSelection,
// } from "@syncfusion/ej2-angular-dropdowns";
// ListBoxComponent.Inject(CheckBoxSelection);
// import { IpServiceService } from "src/app/services/ip-service.service";
// import {
//   FilterSettingsModel,
//   IFilter,
//   Filter,
// } from "@syncfusion/ej2-angular-grids";
// import { DropDownList } from "@syncfusion/ej2-angular-dropdowns";
// import { createElement } from "@syncfusion/ej2-base";

// const _ = require("lodash");
// setCulture("en");

// @Component({
//   selector: "cms-profile-kpigroup",
//   templateUrl: "./kpigroup.component.html",
//   styleUrls: ["./kpigroup.component.scss"],
//   providers: [FilterService, VirtualScrollService],
//   encapsulation: ViewEncapsulation.None,
// })
// export class KpiGroupComponent implements OnInit {
//   // Varriable Language
//   languages: any;
//   selectedLanguage: any;

//   public dropInstance!: DropDownList;
//   // View child Grid
//   @ViewChild("overviewgrid", { static: false })
//   public gridInstance!: GridComponent;

//   // View child filter
//   @ViewChild("filterMenu", { static: false })
//   public filterMenu!: ListBoxComponent;

//   public fields: FieldSettingsModel = { text: "name", value: "id" };
//   public fieldsCode: FieldSettingsModel = { text: "name", value: "code" };

//   // Toolbar Item
//   public toolbar!: ToolbarInterface[];
//   // Khai báo data
//   public data: Observable<DataStateChangeEventArgs>;
//   public state!: DataStateChangeEventArgs;
//   public modelAdd: any;
//   public modelDelete: Array<any> = [];
//   // query auto complete
//   public query = new Query();
//   // list filter

//   // Private
//   private _unsubscribeAll: Subject<any>;
//   pageIndex: number = 0;
//   button: any;
//   field: any;
//   nodeSelected: any;
//   /**
//    * Constructor
//    *
//    */
//   constructor(
//     private _coreService: CoreService,
//     private modalService: ModalService,
//     private notification: Notification,
//     private globals: Globals,
//     public configs: Configs,
//     public router: Router,
//     private _translateService: TranslateService,
//     private _configService: ConfigService,
//     private ip: IpServiceService,
//     private _tlaTranslationLoaderService: TranslationLoaderService
//   ) {
//     this.data = _coreService;
//     // Set language
//     this.languages = this.globals.languages;

//     this._configService._configSubject.next("true");
//     // Load file language
//     this._tlaTranslationLoaderService.loadTranslations(vietnam, english);

//     // Set the private defaults
//     this._unsubscribeAll = new Subject();
//     L10n.load(this.configs.languageGrid);
//   }

//   /**
//    * On init
//    */
//   ngOnInit(): void {
//     // Set the selected language from default languages
//     this.selectedLanguage = _.find(this.languages, {
//       id: this._translateService.currentLang,
//     });
//     

//     // Build toolbar
//     this.buildToolbar();
//     // Load List Data
//     this.getListData();
//   }

//   viewRecord = (event: any) => {
//     this.modelAdd = event.rowData;
//     const objParamAdd = { id: this.modelAdd.id, type: "view" };
//     const paramAdd = window.btoa(JSON.stringify(objParamAdd));
//     this.router.navigate(["/cms/payroll/list/kpigroup/", paramAdd]);
//   };

//   // Build Toolbar
//   buildToolbar = () => {
//     const toolbarList = [ToolbarItem.ADD, ToolbarItem.EDIT, ToolbarItem.DELETE];
//     this.toolbar = this.globals.buildToolbar("kpigroup", toolbarList!);
//   };
//   // filter checkbox

//   // GetListData
//   getListData = (): void => {
//     const state = { skip: 0, take: 20 };
//     this._coreService.execute(state, "KpiGroup/GetAll");
//   };

//   public dataStateChange(state: DataStateChangeEventArgs): void {
//     this.pageIndex = Math.floor(state.skip! / state.take!);
//     let extraParams: any[] = [];
//     this._coreService.execute(state, "KpiGroup/GetAll", extraParams);
//   }
//   // Số thứ tự
//   formatStt = (index: string) => {
//     return (
//       this.pageIndex * this.gridInstance.pageSettings.pageSize! +
//       parseInt(index, 0) +
//       1
//     );
//   };
//   // Event Click Toolbar
//   clickToolbar = (itemButton: any): void => {
//     const buttonId = itemButton.id;
//     let selectDeletes = this.gridInstance.getSelectedRecords();
//     switch (buttonId) {
//       case ToolbarItem.ADD:
//         this.router.navigate(["/cms/payroll/list/kpigroup/new"]);
//         break;
//       case ToolbarItem.EDIT:
//         const selectRows = this.gridInstance.getSelectedRecords();
//         if (selectRows && selectRows.length > 0) {
//           this.modelAdd = selectRows[0];
//           const objParamAdd = { id: this.modelAdd.id, type: "edit" };
//           const paramAdd = window.btoa(JSON.stringify(objParamAdd));
//           this.router.navigate(["/cms/payroll/list/kpigroup/", paramAdd]);
//         } else {
//           this.notification.warning("notify.NO_RECORD_SELECT");
//         }
//         break;
//       case ToolbarItem.DELETE:
//         if (selectDeletes && selectDeletes.length > 0) {
//           let ids = selectDeletes.map((i: any) => i.id);
//           this._coreService
//             .Post("KpiGroup/ChangeStatus", ids)
//             .subscribe((res: any) => {
//               if (res.statusCode == 200) {
//                 this.notification.deleteSuccess();
//                 this.gridInstance.refresh();
//               } else {
//                 this.notification.lockError();
//               }
//             });
//         } else {
//           this.notification.warning("notify.NO_RECORD_SELECT");
//         }
//         break;
//       case ToolbarItem.LOCK:
//         if (selectDeletes && selectDeletes.length > 0) {
//           let ids = selectDeletes.map((i: any) => i.id);
//           this._coreService
//             .Post("KpiGroup/ChangeStatus", ids)
//             .subscribe((res: any) => {
//               if (res.statusCode == 200) {
//                 this.notification.lockSuccess();
//                 this.gridInstance.refresh();
//               } else {
//                 this.notification.lockError();
//               }
//             });
//         } else {
//           this.notification.warning("notify.NO_RECORD_SELECT");
//         }
//         break;
//       default:
//         break;
//     }
//   };

//   confirmDelete = (status: any): void => {
//     if (status === "cancel") {
//       this.modalService.close("confirm-delete-modal");
//     } else {
//       let lstDeleteIds = _.map(this.modelDelete, "id").toString();
//       if (lstDeleteIds.length > 0) {
//         this._coreService
//           .Delete("app-item/delete-many?ids=" + lstDeleteIds, {
//             ip_address: "123456",
//             channel_code: "W",
//           })
//           .subscribe((success: any) => {
//             this.notification.deleteSuccess();
//             this.modalService.close("confirm-delete-modal");
//             this.gridInstance.clearSelection();
//             this.gridInstance.refresh();
//           });
//       }
//     }
//   };
//   ngOnDestroy() {
//     clearTimeout(this.button);
//     this._unsubscribeAll.next(null);
//     this._unsubscribeAll.complete();
//   }
//   // disbale button chon nhieu ban ghi
//   setButtonStatus = (event: any) => {
//     if (!this.button) {
//       this.button = setTimeout(() => {
//         // đếm số bản ghi select
//         const rowSelects = this.gridInstance.getSelectedRecords();
//         const rowSelectCounts = rowSelects.length;
//         // Nếu count > 1 thì disable toolbar
//         if (rowSelectCounts > 1) {
//           for (let i = 0; i < this.toolbar.length; i++) {
//             //disable sửa
//             if (this.toolbar[i].id === ToolbarItem.EDIT) {
//               this.toolbar[i].isDisable = true;
//             }
//           }
//         } else {
//           for (let i = 0; i < this.toolbar.length; i++) {
//             // enabled sửa
//             if (this.toolbar[i].id === ToolbarItem.EDIT) {
//               this.toolbar[i].isDisable = false;
//             }
//           }
//         }
//       }, 200);
//     }
//   };
// }
