
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Subscription, map } from "rxjs";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { BaseEditComponent } from "src/app/libraries/base-edit/base-edit/base-edit.component";
import { ICoreDropdownOption } from "src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component";
import { EnumFormBaseContolType, ICoreFormSection } from "src/app/libraries/core-form/core-form/enum-interfaces";
import { ICorePageEditCRUD } from "src/app/libraries/core-page-edit/core-page-edit.component";
import { DialogService } from "src/app/services/dialog.service";
import { api } from "src/app/constants/api/apiDefinitions";
import { ICoreButtonVNS } from "src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS";
import { EnumCoreButtonVNSCode } from "src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode";
import { EnumIconClass } from "src/app/enum/EnumIconClass";
import { EnumStyleButtonClass } from "src/app/enum/EnumStyleButtonClass";
import { AppService } from "src/app/services/app.service";

@Component({
    selector: "sys-groupfunction-edit",
    templateUrl: "./groupfunction-edit.component.html",
    styleUrls: ["./groupfunction-edit.component.scss"],
  })
  export class GroupFunctionEditComponent extends BaseEditComponent {
    /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = "SYS_FUNCTION_GROUP";
  captionCode!: EnumTranslateKey;
  subsctiptions: Subscription[] = [];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'number',
              hidden : true
            }
          ],
          [
            { //set cứng applicationId = 1, trong bảng SYS_CONFIG
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_APPLICATION_ID,
              field: 'applicationId',
              value: 1,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'number',
              hidden : true
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_GROUP_NAME,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_GROUP_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },

              ]
            },
          ],
        ]
      },
    ];
  constructor(
    public override dialogService: DialogService,
    private appService: AppService,
  ) {

    super(dialogService);
    this.captionCode = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_GROUP_EDIT_TITLE;
    this.crud = {
      c: api.SYS_FUNCTION_GROUP_CREATE,
      r: api.SYS_FUNCTION_GROUP_READ,
      u: api.SYS_FUNCTION_GROUP_UPDATE,
      d: api.SYS_FUNCTION_GROUP_DELETE,
    };

  }

  ngOnInit(): void {

  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}

// import {
//   Component,
//   OnInit,
//   ViewChild,
//   ViewEncapsulation,
//   Inject,
//   AfterViewInit,
// } from "@angular/core";
// import { BehaviorSubject, Subject } from "rxjs";
// import { Router, ActivatedRoute, Params } from "@angular/router";

// // Service Translate
// import { TranslationLoaderService } from "src/app/common/translation-loader.service";
// import { TranslateService } from "@ngx-translate/core";
// // Import the locale files
// import { locale as english } from "../i18n/en";
// import { locale as vietnam } from "../i18n/vi";
// // Globals File
// import { Globals } from "src/app/common/globals";
// import { Configs } from "src/app/common/configs";
// import { Notification } from "src/app/common/notification";
// const _ = require("lodash");
// import { L10n, setCulture } from "@syncfusion/ej2-base";
// import {
//   FilterService,
//   VirtualScrollService,
// } from "@syncfusion/ej2-angular-grids";
// import { ToolbarItem, ToolbarInterface } from "src/app/_models/index";
// import { SalaryLevel } from "src/app/_models/app/cms/index";

// import { CoreService } from "src/app/services/core.service";
// import { ConfigService } from "src/app/services/config.service";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { ModalService } from "src/app/services/modal.service";
// import { Query, Predicate, DataManager } from "@syncfusion/ej2-data";
// import { FieldSettingsModel } from "@syncfusion/ej2-dropdowns";
// import * as moment from "moment";
// const async = require("async");
// const $ = require("jquery");
// setCulture("en");

// @Component({
//   selector: "app-salarylevel-edit",
//   templateUrl: "./salarylevel-edit.component.html",
//   styleUrls: ["./salarylevel-edit.component.scss"],
//   providers: [FilterService, VirtualScrollService],
//   encapsulation: ViewEncapsulation.None,
// })
// export class SalaryLevelEditComponent implements OnInit {
//   toolItems$ = new BehaviorSubject<any[]>([

//   ])
//   // Varriable Language
//   flagState$ = new BehaviorSubject<string>('');
//   // flag show popup toolbar Back
//   flagePopup = true;
//   paramId = "";

//   model: SalaryLevel = new SalaryLevel();
//   modelTemp: SalaryLevel = new SalaryLevel();
//   languages: any;
//   selectedLanguage: any;
//   mode: any;
//   editForm!: FormGroup;
//   public query = new Query();
//   public fields: FieldSettingsModel = { value: "id", text: "name" };

//   // Toolbar Item
//   public toolbar!: ToolbarInterface[];

//   // Private
//   private _unsubscribeAll: Subject<any>;
//   lstSalaryRankId: any;
//   lstSalaryScaleId: any;


//   constructor(
//     private _coreService: CoreService,
//     private modalService: ModalService,
//     private notification: Notification,
//     private globals: Globals,
//     public configs: Configs,
//     public router: Router,
//     private _formBuilder: FormBuilder,
//     public activatedRoute: ActivatedRoute,
//     private _translateService: TranslateService,
//     private _configService: ConfigService,
//     private _tlaTranslationLoaderService: TranslationLoaderService
//   ) {
//     // Get Route Param
//     this.activatedRoute.params.subscribe((params: Params) => {
//       const paramId = params["id"];
//       // Nếu trạng thái chỉnh sửa thì Get dữ liệu
//       if (paramId !== "new") {
//         const objParam = window.atob(paramId);
//         const paramUrl = JSON.parse(objParam);
//         if (paramUrl && paramUrl.id) {
//           this.paramId = paramUrl.id;
//           this.flagState$.next(paramUrl.type);
//         } else {
//           // Xu ly redirect
//           this.router.navigate(["/errors/404"]);
//         }
//       } else {
//         this.flagState$.next("new");
//       }
//     });

//     // Set language
//     this.languages = this.globals.languages;

//     this._configService._configSubject.next("true");
//     // Load file language
//     this._tlaTranslationLoaderService.loadTranslations(vietnam, english);

//     this.editForm = this._formBuilder.group({
//       name: ["", [Validators.required, Validators.maxLength(51),this.globals.noWhitespaceValidator]],
//       code: [
//         "",
//         [
//           Validators.required,
//           Validators.maxLength(31),
//           this.globals.checkExistSpace,
//         ],
//       ],
//       salaryRankId: ["", [Validators.required]],
//       salaryScaleId: ["", [Validators.required]],
//       monney: ["", [Validators.required]],
//       coefficient: ["", [Validators.required]],
//       orders: [""],
//       note: [""],
//     });

//     // Set the private defaults
//     this._unsubscribeAll = new Subject();
//     L10n.load(this.configs.languageGrid);
//   }


//   ngOnInit(): void {
//     // Set the selected language from default languages
//     this.selectedLanguage = _.find(this.languages, {
//       id: this._translateService.currentLang,
//     });
//

//     this.flagState$.subscribe(x => {
//       let toolbarList: any[] = [];
//       if (x === "view") {
//         toolbarList = [ToolbarItem.BACK, ToolbarItem.EDIT];
//         this.editForm.disable();
//       }
//       if (x === "new") {
//         toolbarList = [ToolbarItem.BACK, ToolbarItem.SAVE];
//       }
//       if (x === "edit") {
//         toolbarList = [ToolbarItem.BACK, ToolbarItem.SAVE];
//         this.editForm.get("code")!.disable();
//       }
//       this.toolItems$.next(toolbarList)
//     })

//     async.waterfall(
//       [
//         (cb: any) => {
//           if (this.paramId) {
//             this._coreService
//               .Get("hr/SalaryLevel/get?id=" + this.paramId)
//               .subscribe((res: any) => {
//                 this.modelTemp = res.data;
//                 cb();
//               });
//           } else {
//             cb();
//           }
//         },
//         (cb: any) => {
//           this._coreService.Get("hr/SalaryScale/GetList").subscribe((res: any) => {
//             this.lstSalaryScaleId = res.data;
//             cb();
//           });
//         },
//         (cb: any) => {
//           if (this.paramId) {
//             this._coreService
//               .Get(
//                 "hr/Salaryrank/GetList?scaleId=" + this.modelTemp.salaryScaleId
//               )
//               .subscribe((res: any) => {
//                 this.lstSalaryRankId = res.data;
//                 cb();
//               });
//           }
//         },
//       ],
//       (err: any, ok: any) => {
//         this.model = _.cloneDeep(this.modelTemp);
//         //delete this.modelTemp;
//       }
//     );

//     this.mode = "CheckBox";
//   }

//   // Event Click Toolbar
//   clickToolbar = (itemButton: any): void => {
//     const buttonId = itemButton.id;
//     switch (buttonId) {
//       case ToolbarItem.BACK:
//         if (this.editForm.dirty && this.editForm.touched) {
//           this.flagePopup = false;
//         }
//         if (
//           (this.editForm.dirty && this.editForm.touched) ||
//           this.flagePopup === false
//         ) {
//           this.modalService.open("confirm-back-modal");
//         }
//         if (this.flagePopup === true) {
//           this.router.navigate(["cms/profile/list/salarylevel"]);
//         }
//         break;
//       case ToolbarItem.ADD:
//         break;
//       case ToolbarItem.SAVE:
//         this.saveData();
//         break;
//       case ToolbarItem.EDIT:
//         this.flagState$.next("edit");
//         this.flagePopup = true;
//         this.editForm.enable();
//         this.editForm.get("code")!.disable();
//         break;
//       case ToolbarItem.DELETE:
//         break;
//       case ToolbarItem.COPY:
//         break;
//       default:
//         break;
//     }
//   };
//   // lưu data open popup
//   saveData = () => {
//     if (!this.editForm.valid) {
//       this.notification.warning("Form chưa hợp lệ !");
//       this.editForm.markAllAsTouched();
//       return;
//     }

//     let param = this.convertModel(this.model);

//     if (this.flagState$.value === "new") {
//       this._coreService.Post("hr/salarylevel/add", param).subscribe(
//         (res: any) => {
//           //check error
//           if (res.statusCode == 400) {
//             this.notification.checkErrorMessage(res.message);
//           } else {
//             this.notification.addSuccess();
//             this.router.navigate(["/cms/profile/list/salarylevel"]);
//           }
//         },
//         (error: any) => {
//           this.notification.addError();
//         }
//       );
//     } else {
//       this._coreService.Post("hr/salarylevel/Update", param).subscribe(
//         (res: any) => {
//           //check error
//           if (res.statusCode == 400) {
//             this.notification.checkErrorMessage(res.message);
//           } else {
//             this.notification.editSuccess();
//             this.router.navigate(["/cms/profile/list/salarylevel"]);
//           }
//         },
//         (error: any) => {
//           this.notification.editError();
//         }
//       );
//     }
//   };
//   convertModel(param: any) {
//     let model = _.cloneDeep(param);
//     model.dateEffect = moment(model.dateEffect).format("MM/DD/YYYY");
//     return model;
//   }
//   changeSalaryScale(e: any) {
//     if (e.e) {
//       this._coreService
//         .Get("hr/Salaryrank/GetList?scaleId=" + e.itemData.id)
//         .subscribe((res: any) => {
//           this.model.salaryRankId = null;
//           this.lstSalaryRankId = res.data;
//         });
//     }
//   }

//   // change date
//   changeDate = (model: any) => {
//     setTimeout(() => {
//       const idDate = "#" + model + "_input";
//       const value = $(idDate).val();
//       var patt = new RegExp(
//         "q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m"
//       );
//       if (value.length === 0) {
//         this.editForm.get(model)!.setErrors({ required: true });
//         return;
//       } else if (value.length > 0 && patt.test(value.toLowerCase()) === true) {
//         this.editForm.get(model)!.setErrors({ incorrect: true });
//         return;
//       } else if (value.length > 10) {
//         this.editForm.get(model)!.setErrors({ incorrect: true });
//         return;
//       } else {
//         this.editForm.get(model)!.clearValidators();
//       }
//       if (
//         value &&
//         ((value.length === 8 && value.indexOf("/") === -1) ||
//           (value.length === 6 && value.indexOf("/") === -1) ||
//           (value.length === 10 && value.indexOf("/") > -1))
//       ) {
//         if (value.indexOf("-") === -1) {
//           const returnDate = this.globals.replaceDate(value);
//           // (this.model as any)[model] = returnDate;
//           if (returnDate && returnDate.length > 0) {
//             $(idDate).val(returnDate);
//             const dateParts: any = returnDate.split("/");
//             (this.model as any)[model] = new Date(
//               +dateParts[2],
//               dateParts[1] - 1,
//               +dateParts[0]
//             );
//             this.editForm.get(model)!.clearValidators();
//           }
//         }
//       }
//     }, 200);
//   };
//   // confirm delete
//   confirmDelete = (status: any): void => {
//     if (status === "cancel") {
//       this.modalService.close("confirm-delete-modal");
//     } else {
//       this._coreService
//         .Delete("app-item/delete-many?ids=" + this.model.id, {
//           ip_address: "123456",
//           channel_code: "W",
//         })
//         .subscribe((success: any) => {
//           this.notification.deleteSuccess();
//           this.modalService.close("confirm-delete-modal");
//           this.router.navigate(["/cms/profile/list/salarylevel"]);
//         });
//     }
//   };
//   confirmBack = (status: any): void => {
//     if (status === "cancel") {
//       this.modalService.close("confirm-back-modal");
//     } else {
//       this.modalService.close("confirm-back-modal");
//       this.router.navigate(["/cms/profile/list/salarylevel"]);
//     }
//   };
//   // filter type
//   // change date
//   public onFiltering(e: any, a: any) {
//     e.preventDefaultAction = true;
//     const predicate = new Predicate("name", "contains", e.text, true, true);
//     this.query = new Query();
//     this.query = e.text !== "" ? this.query.where(predicate) : this.query;
//     e.updateData(a, this.query);
//   }
// }

// import {
//   Component,
//   OnInit,
//   ViewChild,
//   ViewEncapsulation,
//   Inject,
//   AfterViewInit,
// } from "@angular/core";
// import { Subject } from "rxjs";
// import { Router, ActivatedRoute, Params } from "@angular/router";

// import { TranslationLoaderService } from "src/app/common/translation-loader.service";
// import { TranslateService } from "@ngx-translate/core";
// import { locale as english } from "../i18n/en";
// import { locale as vietnam } from "../i18n/vi";
// import { Globals } from "src/app/common/globals";
// import { Configs } from "src/app/common/configs";
// import { Notification } from "src/app/common/notification";
// const _ = require("lodash");
// import { L10n, setCulture } from "@syncfusion/ej2-base";
// import {
//   FilterService,
//   VirtualScrollService,
// } from "@syncfusion/ej2-angular-grids";
// import { ToolbarItem, ToolbarInterface } from "src/app/_models/index";
// import { GroupFunction } from "src/app/_models/app/list/index";

// import { CoreService } from "src/app/services/core.service";
// import { ConfigService } from "src/app/services/config.service";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { ModalService } from "src/app/services/modal.service";
// import { Query, Predicate, DataManager } from "@syncfusion/ej2-data";
// import { FieldSettingsModel } from "@syncfusion/ej2-dropdowns";
// const async = require("async");
// setCulture("en");

// @Component({
//   selector: "app-groupfunction-edit",
//   templateUrl: "./groupfunction-edit.component.html",
//   styleUrls: ["./groupfunction-edit.component.scss"],
//   providers: [FilterService, VirtualScrollService],
//   encapsulation: ViewEncapsulation.None,
// })
// export class GroupFunctionEditComponent implements OnInit {
//   flagState = "";
//   flagePopup = true;
//   paramId = "";

//   model: GroupFunction = new GroupFunction();
//   modelTemp: GroupFunction = new GroupFunction();
//   languages: any;
//   selectedLanguage: any;

//   editForm!: FormGroup;
//   public query = new Query();
//   public fields: FieldSettingsModel = { value: "id", text: "name" };

//   public toolbar!: ToolbarInterface[];

//   private _unsubscribeAll: Subject<any>;
//   lstApplication: any;


//   constructor(
//     private _coreService: CoreService,
//     private modalService: ModalService,
//     private notification: Notification,
//     private globals: Globals,
//     public configs: Configs,
//     public router: Router,
//     private _formBuilder: FormBuilder,
//     public activatedRoute: ActivatedRoute,
//     private _translateService: TranslateService,
//     private _configService: ConfigService,
//     private _tlaTranslationLoaderService: TranslationLoaderService
//   ) {
//     this.activatedRoute.params.subscribe((params: Params) => {
//       const paramId = params["id"];
//       if (paramId !== "new") {
//         const objParam = window.atob(paramId);
//         const paramUrl = JSON.parse(objParam);
//         if (paramUrl && paramUrl.id) {
//           this.paramId = paramUrl.id;
//           this.flagState = paramUrl.type;
//         } else {
//           this.router.navigate(["/errors/404"]);
//         }
//       } else {
//         this.flagState = "new";
//       }
//     });

//     this.languages = this.globals.languages;

//     this._configService._configSubject.next("true");
//     this._tlaTranslationLoaderService.loadTranslations(vietnam, english);

//     this.editForm = this._formBuilder.group({
//       code: [
//         "",
//         [
//           Validators.required,
//           Validators.maxLength(30),
//           Validators.pattern(/^[-+\/.,_a-zA-Z0-9]+$/),
//         ],
//       ],
//       name: [
//         "",
//         [
//           Validators.required,
//           this.globals.noWhitespaceValidator,
//           Validators.maxLength(300),
//         ],
//       ],
//       applicationId: ["", Validators.maxLength(500)],
//     });

//     this._unsubscribeAll = new Subject();
//     L10n.load(this.configs.languageGrid);
//   }


//   ngOnInit(): void {
//   //   this.selectedLanguage = _.find(this.languages, {
//   //     id: this._translateService.currentLang,
//   //   });


//   //   this.buildToolbar();

//   //   if (this.flagState === "view") {
//   //     this.editForm.disable();
//   //   }
//   //   if (this.flagState === "edit") {
//   //     this.editForm.get("code")!.disable();
//   //   }
//   //   async.waterfall(
//   //     [
//   //       (cb: any) => {
//   //         if (this.paramId) {
//   //           this._coreService
//   //             .Get("author/groupfunction/get?id=" + this.paramId)
//   //             .subscribe((res: any) => {
//   //               this.modelTemp = res.data;
//   //               cb();
//   //             });
//   //         } else {
//   //           cb();
//   //         }
//   //       },
//   //       (cb: any) => {
//   //         this._coreService
//   //           .Get("package/otherlist/getApplication")
//   //           .subscribe((res: any) => {
//   //             this.lstApplication = res.data;
//   //             cb();
//   //           });
//   //       },
//   //     ],
//   //     (err: any, ok: any) => {
//   //       this.model = _.cloneDeep(this.modelTemp);
//   //     }
//   //   );
//   // }

//   // buildToolbar = () => {
//   //   setTimeout(() => {
//   //     let toolbarList: any[] = [];
//   //     if (this.flagState === "view") {
//   //       toolbarList = [
//   //         ToolbarItem.BACK,
//   //         ToolbarItem.EDIT,
//   //         ToolbarItem.DELETE,
//   //         ToolbarItem.COPY,
//   //         ToolbarItem.PRINT,
//   //       ];
//   //     }
//   //     if (this.flagState === "new") {
//   //       toolbarList = [
//   //         ToolbarItem.BACK,
//   //         ToolbarItem.ADD,
//   //         ToolbarItem.SAVE,
//   //         ToolbarItem.PRINT,
//   //       ];
//   //     }
//   //     if (this.flagState === "edit") {
//   //       toolbarList = [
//   //         ToolbarItem.BACK,
//   //         ToolbarItem.ADD,
//   //         ToolbarItem.SAVE,
//   //         ToolbarItem.PRINT,
//   //         ToolbarItem.DELETE,
//   //       ];
//   //     }
//   //     this.toolbar = this.globals.buildToolbar(
//   //       "app-GroupFunction-edit",
//   //       toolbarList
//   //     );
//   //   }, 200);
//   // };

//   // clickToolbar = (itemButton: any): void => {
//   //   const buttonId = itemButton.id;
//   //   switch (buttonId) {
//   //     case ToolbarItem.BACK:
//   //       if (this.editForm.dirty && this.editForm.touched) {
//   //         this.flagePopup = false;
//   //       }
//   //       if (
//   //         (this.editForm.dirty && this.editForm.touched) ||
//   //         this.flagePopup === false
//   //       ) {
//   //         this.modalService.open("confirm-back-modal");
//   //       }
//   //       if (this.flagePopup === true) {
//   //         this.router.navigate(["cms/system/groupfunction"]);
//   //       }
//   //       break;
//   //     case ToolbarItem.ADD:
//   //       break;
//   //     case ToolbarItem.SAVE:
//   //       this.saveData();
//   //       break;
//   //     case ToolbarItem.EDIT:
//   //       this.flagState = "edit";
//   //       this.flagePopup = true;
//   //       this.editForm.enable();
//   //       this.editForm.get("code")!.disable();
//   //       this.buildToolbar();
//   //       break;
//   //     case ToolbarItem.DELETE:
//   //       break;
//   //     case ToolbarItem.COPY:
//   //       break;
//   //     default:
//   //       break;
//   //   }
//   // };
//   // saveData = () => {
//   //   if (!this.editForm.valid) {
//   //     this.notification.warning("Lưu không thành công!");
//   //     this.editForm.markAllAsTouched();
//   //   } else {
//   //     if (this.flagState === "new") {
//   //       this._coreService
//   //         .Post("author/groupfunction/add", this.model)
//   //         .subscribe(
//   //           (res: any) => {
//   //             if (res.statusCode == 200) {
//   //               this.notification.addSuccess();
//   //               this.router.navigate(["/cms/system/groupfunction"]);
//   //             } else {
//   //               this.notification.addError();
//   //             }
//   //           },
//   //           (error: any) => {
//   //             this.notification.addError();
//   //           }
//   //         );
//   //     } else {
//   //       this._coreService
//   //         .Post("author/groupfunction/update", this.model)
//   //         .subscribe(
//   //           (res: any) => {
//   //             if (res.statusCode == 200) {
//   //               this.notification.editSuccess();
//   //               this.router.navigate(["/cms/system/groupfunction"]);
//   //             } else {
//   //               this.notification.addError();
//   //             }
//   //           },
//   //           (error: any) => {
//   //             this.notification.editSuccess();
//   //           }
//   //         );
//   //     }
//   //   }
//   // };

//   // confirmDelete = (status: any): void => {
//   //   if (status === "cancel") {
//   //     this.modalService.close("confirm-delete-modal");
//   //   } else {
//   //     this._coreService
//   //       .Delete("app-item/delete-many?ids=" + this.model.id, {
//   //         ip_address: "123456",
//   //         channel_code: "W",
//   //       })
//   //       .subscribe((success: any) => {
//   //         this.notification.deleteSuccess();
//   //         this.modalService.close("confirm-delete-modal");
//   //         this.router.navigate(["/cms/system/groupfunction"]);
//   //       });
//   //   }
//   // };
//   // confirmBack = (status: any): void => {
//   //   if (status === "cancel") {
//   //     this.modalService.close("confirm-back-modal");
//   //   } else {
//   //     this.modalService.close("confirm-back-modal");
//   //     this.router.navigate(["/cms/system/groupfunction"]);
//   //   }
//   // };

//   // public onFiltering(e: any, a: any) {
//   //   e.preventDefaultAction = true;
//   //   const predicate = new Predicate("name", "contains", e.text, true, true);
//   //   this.query = new Query();
//   //   this.query = e.text !== "" ? this.query.where(predicate) : this.query;
//   //   e.updateData(a, this.query);
//   // }
// }
