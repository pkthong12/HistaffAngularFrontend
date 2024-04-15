import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Inject,
  TemplateRef,
} from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
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
import {
  ListBoxComponent,
  CheckBoxSelection,
} from "@syncfusion/ej2-angular-dropdowns";
ListBoxComponent.Inject(CheckBoxSelection);
import { IpServiceService } from "src/app/services/ip-service.service";

import { DropDownList } from "@syncfusion/ej2-angular-dropdowns";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from "src/app/libraries/core-page-list/core-page-list.component";
import { ICoreTableColumnItem } from "src/app/libraries/core-table/core-table.component";
import { api } from "src/app/constants/api/apiDefinitions";
import { MultiLanguageService } from "src/app/services/multi-language.service";
import { BaseComponent } from "src/app/libraries/base-component/base/base.component";


@Component({
  selector: "cms-sys-groupfunction",
  templateUrl: "./groupfunction.component.html",
  styleUrls: ["./groupfunction.component.scss"],
  ///providers: [FilterService, VirtualScrollService],
})
export class GroupFunctionComponent extends BaseComponent implements OnInit {
  title = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_GROUP_TITLE;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_FUNCTION_GROUP_QUERY_LIST,
  }

  avatarTemplate!: TemplateRef<any>;
  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_FUNCTION_GROUP_DELETE_IDS
  }
 
  
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      // width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_GROUP_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 500
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_GROUP_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 500
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



  /*
  toolItems$ = new BehaviorSubject<any[]>([
    ToolbarItem.ADD,
    ToolbarItem.EDIT,
    ToolbarItem.LOCK,
  ])
  // Varriable Language
  languages: any;
  selectedLanguage: any;

  public dropInstance!: DropDownList;
  // View child Grid
  @ViewChild("overviewgrid", { static: false })
  public gridInstance!: GridComponent;

  // View child filter
 

  // Toolbar Item
  public toolbar!: ToolbarInterface[];
  // Khai báo data
  public data: Observable<DataStateChangeEventArgs>;
  public state!: DataStateChangeEventArgs;
  public modelAdd: any;
  public modelDelete: Array<any> = [];
  // query auto complete
  public query = new Query();
  // list filter

  // Private
  private _unsubscribeAll: Subject<any>;
  pageIndex: number = 0;
  button: any;

  constructor(
    private _coreService: CoreService,
    private modalService: ModalService,
    private notification: Notification,
    private globals: Globals,
    public configs: Configs,
    public router: Router,
    private _translateService: TranslateService,
    private _configService: ConfigService,
    private ip: IpServiceService,
    private _tlaTranslationLoaderService: TranslationLoaderService
  ) {
    this.data = _coreService;
    // Set language
    this.languages = this.globals.languages;

    this._configService._configSubject.next("true");
    // Load file language
    this._tlaTranslationLoaderService.loadTranslations(vietnam, english);

    // Set the private defaults
    this._unsubscribeAll = new Subject();
    L10n.load(this.configs.languageGrid);
  }


  ngOnInit(): void {
    // Set the selected language from default languages
    this.selectedLanguage = _.find(this.languages, {
      id: this._translateService.currentLang,
    });
    

    // Load List Data
    this.getListData();
  }

  viewRecord = (event: any) => {
    this.modelAdd = event.rowData;
    const objParamAdd = { id: this.modelAdd.id, type: "view" };
    const paramAdd = window.btoa(JSON.stringify(objParamAdd));
    this.router.navigate(["/cms/profile/list/salarylevel/", paramAdd]);
  };

  // GetListData
  getListData = (): void => {
    const state = { skip: 0, take: 20 };
    this._coreService.execute(state, "hr/salarylevel/GetAll");
  };

  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.pageIndex = Math.floor(state.skip! / state.take!);
    let extraParams: any[] = [];
    this._coreService.execute(state, "hr/salarylevel/GetAll", extraParams);
  }
  // Số thứ tự
  formatStt = (index: string) => {
    return (
      this.pageIndex * this.gridInstance.pageSettings.pageSize! +
      parseInt(index, 0) +
      1
    );
  };
  // Event Click Toolbar
  clickToolbar = (itemButton: any): void => {
    const buttonId = itemButton.id;
    let selectDeletes = this.gridInstance.getSelectedRecords();
    switch (buttonId) {
      case ToolbarItem.ADD:
        this.router.navigate(["/cms/profile/list/salarylevel/new"]);
        break;
      case ToolbarItem.EDIT:
        const selectRows = this.gridInstance.getSelectedRecords();
        if (selectRows && selectRows.length > 0) {
          this.modelAdd = selectRows[0];
          const objParamAdd = { id: this.modelAdd.id, type: "edit" };
          const paramAdd = window.btoa(JSON.stringify(objParamAdd));
          this.router.navigate(["/cms/profile/list/salarylevel/", paramAdd]);
        } else {
          this.notification.warning("notify.NO_RECORD_SELECT");
        }
        break;
      case ToolbarItem.DELETE:
        if (selectDeletes && selectDeletes.length > 0) {
          this.modelDelete = selectDeletes;
          let checkHieuLuc = false;
          for (let i = 0; i < this.modelDelete.length; i++) {
            if (this.modelDelete[i].status.name === "Hiệu lực") {
              checkHieuLuc = true;
            }
          }
          if (checkHieuLuc) {
            this.notification.warning(
              "Hệ thống không cho phép xóa dữ liệu có trạng thái Hiệu lực!"
            );
            return;
          }
          this.modalService.open("confirm-delete-modal");
        } else {
          this.notification.warning("notify.NO_RECORD_SELECT");
        }
        break;
      case ToolbarItem.LOCK:
        if (selectDeletes && selectDeletes.length > 0) {
          let ids = selectDeletes.map((i: any) => i.id);
          this._coreService
            .Post("hr/salarylevel/ChangeStatus", ids)
            .subscribe((res: any) => {
              if (res.statusCode == 200) {
                this.notification.lockSuccess();
                this.gridInstance.refresh();
              } else {
                this.notification.lockError();
              }
            });
        } else {
          this.notification.warning("notify.NO_RECORD_SELECT");
        }
        break;
      default:
        break;
    }
  };

  confirmDelete = (status: any): void => {
    if (status === "cancel") {
      this.modalService.close("confirm-delete-modal");
    } else {
      let lstDeleteIds = _.map(this.modelDelete, "id").toString();
      if (lstDeleteIds.length > 0) {
        this._coreService
          .Delete("app-item/delete-many?ids=" + lstDeleteIds, {
            ip_address: "123456",
            channel_code: "W",
          })
          .subscribe((success: any) => {
            this.notification.deleteSuccess();
            this.modalService.close("confirm-delete-modal");
            this.gridInstance.clearSelection();
            this.gridInstance.refresh();
          });
      }
    }
  };
   ngOnDestroy() {
    clearTimeout(this.button);
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  // disbale button chon nhieu ban ghi
  setButtonStatus = (event: any) => {
    if (!this.button) {
      this.button = setTimeout(() => {
        // đếm số bản ghi select
        const rowSelects = this.gridInstance.getSelectedRecords();
        const rowSelectCounts = rowSelects.length;
        // Nếu count > 1 thì disable toolbar
        if (rowSelectCounts > 1) {
          for (let i = 0; i < this.toolbar.length; i++) {
            //disable sửa
            if (this.toolbar[i].id === ToolbarItem.EDIT) {
              this.toolbar[i].isDisable = true;
            }
          }
        } else {
          for (let i = 0; i < this.toolbar.length; i++) {
            // enabled sửa
            if (this.toolbar[i].id === ToolbarItem.EDIT) {
              this.toolbar[i].isDisable = false;
            }
          }
        }
      }, 200);
    }
  };
  */
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

// import { TranslationLoaderService } from "src/app/common/translation-loader.service";
// import { TranslateService } from "@ngx-translate/core";
// import { locale as english } from "./i18n/en";
// import { locale as vietnam } from "./i18n/vi";
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
//   selector: "cms-app-groupfunction",
//   templateUrl: "./groupfunction.component.html",
//   styleUrls: ["./groupfunction.component.scss"],
//   providers: [FilterService, VirtualScrollService],
//   encapsulation: ViewEncapsulation.None,
// })
// export class GroupFunctionComponent implements OnInit {
  // languages: any;
  // selectedLanguage: any;
  // ipAddress: string = "";
  // public sorting: string = "Ascending";
  // public filterType!: IFilter;
  // public filterStatus!: IFilter;
  // public dropInstance!: DropDownList;
  // @ViewChild("overviewgrid", { static: false })
  // public gridInstance!: GridComponent;

  // @ViewChild("filterMenu", { static: false })
  // public filterMenu!: ListBoxComponent;

  // public isFilter = false;
  // public search: {
  //   searchField: string,
  //   type: string,
  //   code: string,
  //   name: string,
  //   status: null | any,    
  // } = {
  //   searchField: "",
  //   type: "",
  //   code: "",
  //   name: "",
  //   status: null,
  // };
  // public typeSearch = "advance";

  // public isShowChooseFilter = false;
  // public fields: FieldSettingsModel = { text: "name", value: "id" };
  // public fieldsCode: FieldSettingsModel = { text: "name", value: "code" };

  // public selection = {
  //   showCheckbox: true,
  //   showSelectAll: true,
  // };
  // public lastChooseFilter: any[] = [];
  // public lstFilters = [
  //   {
  //     id: "type",
  //     name: "Loại danh mục",
  //   },
  //   {
  //     id: "code",
  //     name: "Mã",
  //   },
  //   {
  //     id: "name",
  //     name: "Tên",
  //   },
  //   {
  //     id: "status",
  //     name: "Trạng thái",
  //   },
  // ];

  // public showHideSearch = {
  //   type: false,
  //   code: false,
  //   name: false,
  //   status: false,
  // };

  // public toolbar!: ToolbarInterface[];
  // public data: Observable<DataStateChangeEventArgs>;
  // public state!: DataStateChangeEventArgs;
  // public modelAdd: any;
  // public modelDelete: Array<any> = [];
  // public query = new Query();
  // public lstType: any[] = [];
  // public lstStatus = [];
  // public lstStatusOrigin = [];

  // private _unsubscribeAll: Subject<any>;
  // pageIndex: number = 0;

  // constructor(
  //   private _coreService: CoreService,
  //   private modalService: ModalService,
  //   private notification: Notification,
  //   private globals: Globals,
  //   public configs: Configs,
  //   public router: Router,
  //   private _translateService: TranslateService,
  //   private _configService: ConfigService,
  //   private ip: IpServiceService,
  //   private _tlaTranslationLoaderService: TranslationLoaderService
  // ) {
  //   this.data = _coreService;
  //   this.languages = this.globals.languages;

  //   this._configService._configSubject.next("true");
  //   this._tlaTranslationLoaderService.loadTranslations(vietnam, english);

  //   this._unsubscribeAll = new Subject();
  //   L10n.load(this.configs.languageGrid);
  // }


  // ngOnInit(): void {
  //   this.selectedLanguage = _.find(this.languages, {
  //     id: this._translateService.currentLang,
  //   });
    

  //   this.buildToolbar();
  //   this.getListData();
  //   this.filterType = {
  //     ui: {
  //       create: (args: { target: Element; column: object }) => {
  //         const flValInput: HTMLElement = createElement("input", {
  //           className: "flm-input",
  //         });
  //         args.target.appendChild(flValInput);
  //         this.dropInstance = new DropDownList({
  //           dataSource: this.lstType,
  //           fields: { text: "name", value: "code" },
  //           placeholder: "",
  //           popupHeight: "200px",
  //         });
  //         this.dropInstance.appendTo(flValInput);
  //       },
  //       write: (args: {
  //         column: object;
  //         target: Element;
  //         parent: any;
  //         filteredValue: string;
  //       }) => {
  //         this.dropInstance.value = args.filteredValue;
  //       },
  //       read: (args: {
  //         target: Element;
  //         column: any;
  //         operator: string;
  //         fltrObj: Filter;
  //       }) => {
  //         args.fltrObj.filterByColumn(
  //           "type_code",
  //           args.operator,
  //           this.dropInstance.value
  //         );
  //       },
  //     },
  //   };

  //   this.filterStatus = {
  //     ui: {
  //       create: (args: { target: Element; column: object }) => {
  //         const flValInput: HTMLElement = createElement("input", {
  //           className: "flm-input",
  //         });
  //         args.target.appendChild(flValInput);
  //         this.dropInstance = new DropDownList({
  //           dataSource: this.lstStatus,
  //           fields: { text: "name", value: "id" },
  //           placeholder: "",
  //           popupHeight: "200px",
  //         });
  //         this.dropInstance.appendTo(flValInput);
  //       },
  //       write: (args: {
  //         column: object;
  //         target: Element;
  //         parent: any;
  //         filteredValue: string;
  //       }) => {
  //         this.dropInstance.value = args.filteredValue;
  //       },
  //       read: (args: {
  //         target: Element;
  //         column: any;
  //         operator: string;
  //         fltrObj: Filter;
  //       }) => {
  //         args.fltrObj.filterByColumn(
  //           "status_id",
  //           args.operator,
  //           this.dropInstance.value
  //         );
  //       },
  //     },
  //   };
  // }

  // viewRecord = (event: any) => {
  //   this.modelAdd = event.rowData;
  //   const objParamAdd = { id: this.modelAdd.id, type: "view" };
  //   const paramAdd = window.btoa(JSON.stringify(objParamAdd));
  //   this.router.navigate(["/cms/system/groupfunction/", paramAdd]);
  // };

  // buildToolbar = () => {
  //   const toolbarList = [
  //     ToolbarItem.ADD,
  //     ToolbarItem.EDIT,
  //     ToolbarItem.DELETE,
  //     ToolbarItem.LOCK,
  //   ];
  //   this.toolbar = this.globals.buildToolbar(
  //     "sys-app-GroupFunction",
  //     toolbarList
  //   );
  // };
  // showHideBttonFilter = () => {
  //   if (this.isShowChooseFilter === true) {
  //     this.isShowChooseFilter = false;
  //   } else {
  //     this.isShowChooseFilter = true;

  //     setTimeout(() => {
  //       let itemCheck = [];
  //       for (let i = 0; i < this.lstFilters.length; i++) {
  //         if ((this.showHideSearch as any)[this.lstFilters[i].id] === true) {
  //           itemCheck.push(this.lstFilters[i]);
  //         }
  //       }
  //       if (itemCheck.length > 0) {
  //         let valueChecks = _.map(itemCheck, "name");
  //         this.filterMenu.selectItems(valueChecks);
  //       }
  //     }, 100);
  //   }
  //   document.getElementById("overviewgrid_ccdlg")!.hidden = true;
  // };
  // showHideFilter = (status: any) => {
  //   if (status === "ok") {
  //     if (this.filterMenu.value && this.filterMenu.value.length > 0) {
  //       this.lastChooseFilter = this.filterMenu.value;
  //       for (let i = 0; i < this.lstFilters.length; i++) {
  //         const indexFilter = _.findIndex(this.filterMenu.value, (item: any) => {
  //           return item === this.lstFilters[i].id;
  //         });

  //         if (indexFilter > -1) {
  //           (this.showHideSearch as any)[this.lstFilters[i].id] = true;
  //         } else {
  //           (this.showHideSearch as any)[this.lstFilters[i].id] = false;
  //         }
  //       }
  //       this.isFilter = true;
  //     } else {
  //       this.isFilter = false;
  //       for (let i = 0; i < this.lstFilters.length; i++) {
  //         (this.showHideSearch as any)[this.lstFilters[i].id] = false;
  //       }
  //     }
  //     this.isShowChooseFilter = false;
  //     if (this.showHideSearch.status === true) {
  //       this.search.status = 4;
  //     } else {
  //       this.search.status = null;
  //     }
  //   } else {
  //     this.isShowChooseFilter = false;
  //   }
  // };
  // showColumnChoose = () => {
  //   document.getElementById("overviewgrid_ccdlg")!.hidden = false;
  //   this.isShowChooseFilter = false;
  //   const widthWindow = window.innerWidth;
  //   let width = widthWindow - 600;
  //   if (this.isFilter) {
  //     this.gridInstance.columnChooserModule.openColumnChooser(width, -280);
  //   } else {
  //     this.gridInstance.columnChooserModule.openColumnChooser(width, -15);
  //   }
  // };

  // searchAdvanceFilter = (): void => {
  //   this.search.searchField = "";
  //   this.gridInstance.clearSelection();
  //   const state = { skip: 0, take: 10 };
  //   let extraParams: any[] = [];

  //   extraParams.push({
  //     field: "code",
  //     value: this.search.code || "",
  //   });

  //   extraParams.push({
  //     field: "name",
  //     value: this.search.name || "",
  //   });

  //   extraParams.push({
  //     field: "type_code",
  //     value: this.search.type || null,
  //   });

  //   extraParams.push({
  //     field: "status_id",
  //     value: this.search.status || null,
  //   });
  //   this.typeSearch = "advance";
  //   setTimeout(() => {
  //     this._coreService.execute(state, "app-item/search", extraParams);
  //   }, 500);
  // };

  // getListData = (): void => {
  //   const state = { skip: 0, take: 20 };
  //   this._coreService.execute(state, "author/groupfunction/getall");
  // };

  // public dataStateChange(state: DataStateChangeEventArgs): void {
  //   this.pageIndex = Math.floor(state.skip! / state.take!);
  //   let extraParams: any[] = [];
  //   this._coreService.execute(
  //     state,
  //     "author/groupfunction/getall",
  //     extraParams
  //   );
  // }
  // formatStt = (index: string) => {
  //   return (
  //     this.pageIndex * this.gridInstance.pageSettings.pageSize! +
  //     parseInt(index, 0) +
  //     1
  //   );
  // };
  // clickToolbar = (itemButton: any): void => {
  //   const buttonId = itemButton.id;
  //   let selectDeletes = this.gridInstance.getSelectedRecords();
  //   switch (buttonId) {
  //     case ToolbarItem.ADD:
  //       this.router.navigate(["/cms/system/groupfunction/new"]);
  //       break;
  //     case ToolbarItem.EDIT:
  //       const selectRows = this.gridInstance.getSelectedRecords();
  //       if (selectRows && selectRows.length > 0) {
  //         this.modelAdd = selectRows[0];
  //         const objParamAdd = { id: this.modelAdd.id, type: "edit" };
  //         const paramAdd = window.btoa(JSON.stringify(objParamAdd));
  //         this.router.navigate([
  //           "/cms/system/groupfunction/",
  //           paramAdd,
  //         ]);
  //       } else {
  //         this.notification.warning("notify.NO_RECORD_SELECT");
  //       }
  //       break;
  //     case ToolbarItem.DELETE:
  //       if (selectDeletes && selectDeletes.length > 0) {
  //         this.modelDelete = selectDeletes;
  //         let checkHieuLuc = false;
  //         for (let i = 0; i < this.modelDelete.length; i++) {
  //           if (this.modelDelete[i].status.name === "Hiệu lực") {
  //             checkHieuLuc = true;
  //           }
  //         }
  //         if (checkHieuLuc) {
  //           this.notification.warning(
  //             "Hệ thống không cho phép xóa dữ liệu có trạng thái Hiệu lực!"
  //           );
  //           return;
  //         }
  //         this.modalService.open("confirm-delete-modal");
  //       } else {
  //         this.notification.warning("notify.NO_RECORD_SELECT");
  //       }
  //       break;
  //     case ToolbarItem.LOCK:
  //       if (selectDeletes && selectDeletes.length > 0) {
  //         let ids = selectDeletes.map((i: any) => i.id);
  //         this._coreService
  //           .Post("author/groupfunction/changestatus", ids)
  //           .subscribe((res: any) => {
  //             if (res.statusCode == 200) {
  //               this.notification.lockSuccess();
  //               this.gridInstance.refresh();
  //             } else {
  //               this.notification.lockError();
  //             }
  //           });
  //       } else {
  //         this.notification.warning("notify.NO_RECORD_SELECT");
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // confirmDelete = (status: any): void => {
  //   if (status === "cancel") {
  //     this.modalService.close("confirm-delete-modal");
  //   } else {
  //     let lstDeleteIds = _.map(this.modelDelete, "id").toString();
  //     if (lstDeleteIds.length > 0) {
  //       this._coreService
  //         .Delete("app-item/delete-many?ids=" + lstDeleteIds, {
  //           ip_address: "123456",
  //           channel_code: "W",
  //         })
  //         .subscribe((success: any) => {
  //           this.notification.deleteSuccess();
  //           this.modalService.close("confirm-delete-modal");
  //           this.gridInstance.clearSelection();
  //           this.gridInstance.refresh();
  //         });
  //     }
  //   }
  // };
  // setButtonStatus = (event: any) => {
  //   setTimeout(() => {
  //     const rowSelects = this.gridInstance.getSelectedRecords();
  //     const rowSelectCounts = rowSelects.length;
  //     if (rowSelectCounts > 1) {
  //       for (let i = 0; i < this.toolbar.length; i++) {
  //         if (this.toolbar[i].id === ToolbarItem.EDIT) {
  //           this.toolbar[i].isDisable = true;
  //         }
  //       }
  //     } else {
  //       for (let i = 0; i < this.toolbar.length; i++) {
  //         if (this.toolbar[i].id === ToolbarItem.EDIT) {
  //           this.toolbar[i].isDisable = false;
  //         }
  //       }
  //     }
  //   }, 200);
  // };
  // public onFilteringType(e: any) {
  //   e.preventDefaultAction = true;
  //   const predicate = new Predicate("name", "contains", e.text, true, true);
  //   this.query = new Query();
  //   this.query = e.text !== "" ? this.query.where(predicate) : this.query;
  //   e.updateData(this.lstType, this.query);
  // }
  // public onFilteringStatus(e: any) {
  //   e.preventDefaultAction = true;
  //   const predicate = new Predicate("name", "contains", e.text, true, true);
  //   this.query = new Query();
  //   this.query = e.text !== "" ? this.query.where(predicate) : this.query;
  //   e.updateData(this.lstStatus, this.query);
  // }


  // ngOnInit(): void {
    
  // }

// }




