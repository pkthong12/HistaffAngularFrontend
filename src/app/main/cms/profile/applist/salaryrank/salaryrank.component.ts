import { Component, OnInit, OnDestroy, TemplateRef, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';

import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { Validators } from '@angular/forms';

@Component({
  selector: "cms-app-salaryrank",
  templateUrl: "./salaryrank.component.html",
  styleUrls: ["./salaryrank.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SalaryRankComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_RANK;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_SALARY_RANK_QUERY_LIST,
  }

  avatarTemplate!: TemplateRef<any>;

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_SALARY_RANK_DELETE_IDS,
    toggleActiveIds: api.HU_SALARY_RANK_TOGGLE_ACTIVE_IDS,
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_RANK_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_RANK_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_RANK_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_RANK_SCALE_NAME,
      field: 'salaryScaleName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_EFFECTIVE_DATE,
      field: 'effectiveDate',
      type: 'string',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_RANK_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 500,
    },
   
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }

  ngOnDestroy(): void {
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
// import { Query } from "@syncfusion/ej2-data";
// import {
//   ListBoxComponent,
//   CheckBoxSelection,
// } from "@syncfusion/ej2-angular-dropdowns";
// ListBoxComponent.Inject(CheckBoxSelection);
// import { IpServiceService } from "src/app/services/ip-service.service";

// import { DropDownList } from "@syncfusion/ej2-angular-dropdowns";

// const _ = require("lodash");
// setCulture("en");

// @Component({
//   selector: "cms-app-salaryrank",
//   templateUrl: "./salaryrank.component.html",
//   styleUrls: ["./salaryrank.component.scss"],
//   providers: [FilterService, VirtualScrollService],
//   encapsulation: ViewEncapsulation.None,
// })
// export class SalaryRankComponent implements OnInit {
//   // Varriable Language
//   languages: any;
//   selectedLanguage: any;

//   public dropInstance!: DropDownList;
//   // View child Grid
//   @ViewChild("overviewgrid", { static: false })
//   public gridInstance!: GridComponent;


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
//     this.router.navigate(["/cms/profile/list/salaryrank/", paramAdd]);
//   };

//   // Build Toolbar
//   buildToolbar = () => {
//     const toolbarList = [
//       ToolbarItem.ADD,
//       ToolbarItem.EDIT,
//       ToolbarItem.LOCK,
//     ];
//     this.toolbar = this.globals.buildToolbar(
//       "salaryrank",
//       toolbarList
//     );
//   };
//   // filter checkbox

//   // GetListData
//   getListData = (): void => {
//     const state = { skip: 0, take: 20 };
//     this._coreService.execute(state, "hr/salaryrank/GetAll");
//   };

//   public dataStateChange(state: DataStateChangeEventArgs): void {
//     this.pageIndex = Math.floor(state.skip! / state.take!);
//     let extraParams: any[] = [];
//     this._coreService.execute(state, "hr/salaryrank/GetAll", extraParams);
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
//         this.router.navigate(["/cms/profile/list/salaryrank/new"]);
//         break;
//       case ToolbarItem.EDIT:
//         const selectRows = this.gridInstance.getSelectedRecords();
//         if (selectRows && selectRows.length > 0) {
//           this.modelAdd = selectRows[0];
//           const objParamAdd = { id: this.modelAdd.id, type: "edit" };
//           const paramAdd = window.btoa(JSON.stringify(objParamAdd));
//           this.router.navigate(["/cms/profile/list/salaryrank/", paramAdd]);
//         } else {
//           this.notification.warning("notify.NO_RECORD_SELECT");
//         }
//         break;
//       case ToolbarItem.DELETE:
//         if (selectDeletes && selectDeletes.length > 0) {
//           this.modelDelete = selectDeletes;
//           let checkHieuLuc = false;
//           for (let i = 0; i < this.modelDelete.length; i++) {
//             if (this.modelDelete[i].status.name === "Hiệu lực") {
//               checkHieuLuc = true;
//             }
//           }
//           if (checkHieuLuc) {
//             this.notification.warning(
//               "Hệ thống không cho phép xóa dữ liệu có trạng thái Hiệu lực!"
//             );
//             return;
//           }
//           this.modalService.open("confirm-delete-modal");
//         } else {
//           this.notification.warning("notify.NO_RECORD_SELECT");
//         }
//         break;
//       case ToolbarItem.LOCK:
//         if (selectDeletes && selectDeletes.length > 0) {
//           let ids = selectDeletes.map((i: any) => i.id);
//           this._coreService
//             .Post("hr/salaryrank/ChangeStatus", ids)
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
//    ngOnDestroy() {
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
