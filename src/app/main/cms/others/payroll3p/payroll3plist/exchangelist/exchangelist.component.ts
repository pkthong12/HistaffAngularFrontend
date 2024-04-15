import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Subject } from "rxjs";
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
import {
  ListBoxComponent,
  CheckBoxSelection,
} from "@syncfusion/ej2-angular-dropdowns";
ListBoxComponent.Inject(CheckBoxSelection);
import { IpServiceService } from "src/app/services/ip-service.service";

const _ = require("lodash");
import { TreeViewComponent } from "@syncfusion/ej2-angular-navigations";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OtherList } from "src/app/_models/app/list/otherlist";
setCulture("en");

@Component({
  selector: "cms-3p-exchangelist",
  templateUrl: "./exchangelist.component.html",
  styleUrls: ["./exchangelist.component.scss"],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class ExchangeListComponent implements OnInit {
  // Varriable Language
  languages: any;
  selectedLanguage: any;
  flagState = "view"
  nodeSelectId!: any;
  modelAdd!: any;
  editForm!: FormGroup;

  @ViewChild("overviewgrid", { static: false })
  public gridInstance!: GridComponent;

  @ViewChild("listTreeObj", { static: true })
  public listTreeObj!: TreeViewComponent;
  

  field: any;
  // list data
  public lstType: any[] = [];

  // Toolbar Item
  public toolbar!: ToolbarInterface[];
  // Khai báo data
  public data!: any[];

  // Private
  private _unsubscribeAll: Subject<any>;
  pageIndex: number = 0;
  nodeSelected: any;

  /**
   * Constructor
   *
   */
  constructor(
    private _coreService: CoreService,
    private notification: Notification,
    private globals: Globals,
    public configs: Configs,
    public router: Router,
    private _translateService: TranslateService,
    private _configService: ConfigService,
    private ip: IpServiceService,
    private _tlaTranslationLoaderService: TranslationLoaderService,
    private _formBuilder: FormBuilder,
  ) {
    // Set language
    this.languages = this.globals.languages;

    this._configService._configSubject.next("true");
    // Load file language
    this._tlaTranslationLoaderService.loadTranslations(vietnam, english);

    // Set the private defaults
    this._unsubscribeAll = new Subject();
    L10n.load(this.configs.languageGrid);
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Set the selected language from default languages
    this.selectedLanguage = _.find(this.languages, {
      id: this._translateService.currentLang,
    });
    

    // Build toolbar
    this.buildToolbar();
 

    this.GetListType();
  }
 

  // Build Toolbar
  buildToolbar = () => {
    const toolbarList = [ToolbarItem.ADD, ToolbarItem.EDIT];
    this.toolbar = this.globals.buildToolbar(
      "cms-3p-exchangelist",
      toolbarList
    );
  };

  GetListType(){
    this._coreService.Get("hr/otherlist/GetPA3PExchange").subscribe((res: any) =>{
      if(res.statusCode == "200")
      {
        this.lstType = res.data;
        this.field = {
          dataSource: res.data,
          id: "id",
          text: 'name'
        }
      }
    })
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
        if(this.nodeSelectId)
        {
          const objParamAdd = { id: this.nodeSelectId , type: "new" };
          const paramAdd = window.btoa(JSON.stringify(objParamAdd));
          this.router.navigate(["/cms/others/payroll3p/payroll3plist/exchangelist/", paramAdd]);
        }
        else
        {
          this.notification.warning("Chưa chọn loại danh mục!");
        }
        break;
      case ToolbarItem.EDIT:
        if (selectDeletes && selectDeletes.length > 0) {
          this.modelAdd = selectDeletes[0];
          const objParamAdd = { id: this.modelAdd.id, type: "edit" };
          const paramAdd = window.btoa(JSON.stringify(objParamAdd));
          this.router.navigate(["/cms/others/payroll3p/payroll3plist/exchangelist/", paramAdd]);
        } else {
          this.notification.warning("notify.NO_RECORD_SELECT");
        }
        break;
      case ToolbarItem.LOCK:
        if (selectDeletes && selectDeletes.length > 0) {
          let ids = selectDeletes.map((i: any) => i.id);
          this._coreService
            .Post("hr/otherlist/changestatus", ids)
            .subscribe((res: any) => {
              if (res.statusCode == 200) {
                this.notification.lockSuccess();
                this.getData(this.nodeSelectId)
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

  OtherSelecting = (e: any) =>{
    let findItem = this.lstType.find(x => x.id == Number(e.nodeData.id));
    this.nodeSelectId = findItem.id;
    if(findItem)
    {
      this._coreService.Get("hr/ExchangeList/GetAll?typeId=" + findItem.id).subscribe((res:any)=>{
          this.data = res.data;
          this.gridInstance.refresh();
      })
    }
  }
 getData(id: any){
  this._coreService.Get("hr/ExchangeList/GetAll?typeId=" + id).subscribe((res:any)=>{
    this.data = res.data;
    this.gridInstance.refresh();
})
 }

  viewRecord = (event: any) =>{
    this.modelAdd = event.rowData;
    const objParamAdd = { id: this.modelAdd.id, type: "view" };
    const paramAdd = window.btoa(JSON.stringify(objParamAdd));
    this.router.navigate([
      "/cms/others/payroll3p/payroll3plist/exchangelist/",
      paramAdd,
    ]);
  }
  setButtonStatus = (e: any) =>{

  }
}
