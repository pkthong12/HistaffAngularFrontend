import { AfterViewInit, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Subscription, combineLatest, map } from "rxjs";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { BaseEditComponent } from "src/app/libraries/base-edit/base-edit/base-edit.component";
import { ICoreDropdownOption } from "src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component";
import { EnumFormBaseContolType, ICoreFormSection } from "src/app/libraries/core-form/core-form/enum-interfaces";
import { ICorePageEditCRUD } from "src/app/libraries/core-page-edit/core-page-edit.component";
import { DialogService } from "src/app/services/dialog.service";
import { api } from "src/app/constants/api/apiDefinitions";
import { SalaryLevelEditService } from "./salarylevel-edit.service";
import { SalaryRankEditService } from "../../salaryrank/edit/salaryrank-edit.services";
import { ICoreButtonVNS } from "src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS";
import { EnumCoreButtonVNSCode } from "src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode";
import { EnumIconClass } from "src/app/enum/EnumIconClass";
import { EnumStyleButtonClass } from "src/app/enum/EnumStyleButtonClass";
import { AppService } from "src/app/services/app.service";
import { InsRegionEditService } from "src/app/main/cms/insurance/appbusiness/insregion/edit/insregion.edit.service";
import { EnumCoreTablePipeType } from "src/app/libraries/core-table/EnumCoreTablePipeType";

@Component({
    selector: "app-salarylevel-edit",
    templateUrl: "./salarylevel-edit.component.html",
    styleUrls: ["./salarylevel-edit.component.scss"],
    encapsulation: ViewEncapsulation.None,
  })
  export class SalaryLevelEditComponent extends BaseEditComponent {
    /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = "HU_SALARY_LEVEL";
  scaleOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  rankOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  scaleGetByIdObject$ = new BehaviorSubject<any>(null);
  scaleGetByIdApi = api.HU_SALARY_SCALE_READ;
  rankGetByIdObject$ = new BehaviorSubject<any>(null);
  rankGetByIdApi = api.HU_SALARY_RANK_READ;
  captionCode!: EnumTranslateKey;
  subsctiptions: Subscription[] = [];
  crud!: ICorePageEditCRUD;
  regionOptions$ = new BehaviorSubject<any[]>([]);
  regionGetByIdApi = api.INS_REGION_READ;
  regionGetByIdObject$ = new BehaviorSubject<any>(null);
  check: any[] = [];
  region: any[] = [];


  
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
              type: 'text',
              hidden : true
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_SCALE_NAME,
              field: 'salaryScaleId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              dropdownOptions$: this.scaleOptions$,
              getByIdObject$: this.scaleGetByIdObject$,
              getByIdApi: this.scaleGetByIdApi,
              type: 'number',
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_RANK,
              field: 'salaryRankId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              dropdownOptions$: this.rankOptions$,
              getByIdObject$: this.rankGetByIdObject$,
              getByIdApi: this.rankGetByIdApi,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                
              ]
            },
          ],
          [
            
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_NAME,
              field: 'regionId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'areaName',
              dropdownOptions$: this.regionOptions$,
              getByIdObject$: this.regionGetByIdObject$,
              getByIdApi: this.regionGetByIdApi,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                
              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly:true
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_NAME,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                
              ]
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_COEFFICIENT,
              field: 'coefficient',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_HOLDING_MONTH,
              field: 'holdingMonth',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              
            },
          ],
          
          [
            
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_TOTAL_SALARY,
              field: 'totalSalary',
              value: '',
              controlType: EnumFormBaseContolType.CURRENCY,
              
              type: 'number',
              pipe: EnumCoreTablePipeType.NUMBER,
              readonly :true,
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_LEVEL_EFFECTIVE_DATE,
              field: 'effectiveDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_LEVEL_EXPIRATION_DATE,
              field: 'expirationDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',

            },
            
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_BASIC,
              field: 'monney',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
              hidden: true
            },
          ]
        ]
      },
    ];

    

  constructor(
    public override dialogService: DialogService,
    private slrLevelService: SalaryLevelEditService,
    private slrRankService : SalaryRankEditService,
    private appService: AppService,
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_LEVEL_EDIT;

    this.crud = {
      c: api.HU_SALARY_LEVEL_CREATE,
      r: api.HU_SALARY_LEVEL_READ,
      u: api.HU_SALARY_LEVEL_UPDATE,
      d: api.HU_SALARY_LEVEL_DELETE,
    };

  }

  ngOnInit(): void {
    this.loading = true;
    
    this.slrRankService.getScales()
      .pipe(
        map((x: any) => {
          console.log(x)
          if (x.ok && x.status === 200) {
            const options: { value: number; text: string; }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            return options;
          } else {
            return [];
          }
        })
      )
      .subscribe(response => {
        this.scaleOptions$.next(response);
        this.loading = false;
      })

      this.subsctiptions.push(
        this.slrLevelService.getRegionByDateNow()
        .pipe(
          map((x : any) => {
            const options: {value: number; text: string; code: string; money: number}[] = [];
            x.body.innerBody.map((y: any) => {
              options.push({
                value : y.id,
                text: y.areaName,
                code: y.otherListCode,
                money: y.money
              })
            })
            return options;
          })
        )
        .subscribe((response) => {
          this.region = response;
          this.regionOptions$.next(response);
          this.loading = false;
        })
      )

      


  }
  ngAfterViewInit(): void{
    this.loading  = true;
    
    this.subsctiptions.push(
      this.form.get('regionId')?.valueChanges.subscribe(x => {
        if(!!x){
          this.check = this.region.filter(y => y.value == x)
          if(this.check.length > 0){
            this.form.get('monney')?.setValue(this.check[0].money)
          } else {
            this.appService.get(api.INS_REGION_READ + `?id=${this.form.get('regionId')?.value}`).subscribe(x => {
              if(!!x) {
                this.form.get('monney')?.setValue(x.body.innerBody.money)
                this.calculator()
              }
            })
          }
        }
      })!
    )
  }
  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.appService.get(api.HU_SALARY_LEVEL_GETCODE)
        .pipe(
          map((f: any) => {
            let options: string = "";
            options = f.body.innerBody.code;
            return options;
          })
        )
        .subscribe(response => {
          if(this.form.get('code')?.value == "") this.form.get('code')?.patchValue(response);
        })
    )!
    const salaryScaleControl = this.form.get('salaryScaleId');
    if(salaryScaleControl){
      this.subsctiptions.push(
        this.form.get('salaryScaleId')?.valueChanges.subscribe((x : any) => {
          if (!!x) {
            this.slrRankService.GetRankByScaleId(this.form.get('salaryScaleId')?.value)
            .pipe(
              map((x: any) => {
                console.log(x)
                if (x.ok && x.status === 200) {
                  const options: { value: number; text: string; }[] = [];
                  x.body.innerBody.map((g: any) => {
                    options.push({
                      value: g.id,
                      text: g.name
                    })
                  })
                  return options;
                } else {
                  return [];
                }
              })
            )
            .subscribe(response => {
              this.rankOptions$.next(response);
              this.loading = false;
              this.form.get('salaryRankId')?.enable()
            })
          } else {
            this.form.get('salaryRankId')?.disable() ;
          }
        })!
      )
      
    }
    // this.subsctiptions.push( 
    //   combineLatest(
    //     [this.form.controls['monney']?.valueChanges, 
    //     this.form.controls['coefficient']?.valueChanges]
    //   ).pipe(
    //     map(([q, p] :  [number, number]) => q * p))
    //     .subscribe(t => {
    //     this.form.get('totalSalary')?.setValue(t)
    //   })
    // )
    
    this.subsctiptions.push(
      this.form.get('coefficient')?.valueChanges.subscribe(x =>{
        this.calculator()
      })!
    )

    
  }



  private calculator(){
    if(this.form.get('monney')?.value != null){
      if(!!!this.form.get('coefficient')?.value){
        // this.form.get('coefficient')?.setValue(0)
        this.form.get('totalSalary')?.setValue(this.form.get('monney')?.value)
      }else{
        let totalSalary = this.form.get('coefficient')?.value * this.form.get('monney')?.value
        this.form.get('totalSalary')?.setValue(totalSalary)
      }
    }
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subsctiptions.map(x => x?.unsubscribe())
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
