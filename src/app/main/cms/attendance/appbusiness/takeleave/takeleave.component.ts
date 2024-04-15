import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
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
import { L10n, setCulture } from "@syncfusion/ej2-base";
import {
  FilterService,
  GridComponent,
} from "@syncfusion/ej2-angular-grids";
import { DataStateChangeEventArgs } from "@syncfusion/ej2-angular-grids";
import { ToolbarItem, ToolbarInterface, CalculatePayroll } from "src/app/_models/index";
import { CoreService } from "src/app/services/core.service";
import { ConfigService } from "src/app/services/config.service";
import {
  ListBoxComponent,
  CheckBoxSelection,
} from "@syncfusion/ej2-angular-dropdowns";
ListBoxComponent.Inject(CheckBoxSelection);
import { DropDownList } from "@syncfusion/ej2-angular-dropdowns";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
const _ = require("lodash");
import { takeUntil } from "rxjs/operators";
import { Splitter, SplitterComponent } from "@syncfusion/ej2-angular-layouts";
import { FieldSettingsModel } from "@syncfusion/ej2-dropdowns";
import { Notification } from "src/app/common/notification";
setCulture("en");

@Component({
  selector: "cms-takeleave",
  templateUrl: "./takeleave.component.html",
  styleUrls: ["./takeleave.component.scss"],
  providers: [FilterService],
  encapsulation: ViewEncapsulation.None,
})
export class TakeLeaveComponent implements OnInit, OnDestroy {
  // Varriable Language
  languages: any;
  selectedLanguage: any;

  public dropInstance!: DropDownList;
  // View child Grid
  @ViewChild("overviewgrid", { static: false })
  public gridInstance!: GridComponent;


  @ViewChild('splitterInstance', { static: false })
  splitterObj!: SplitterComponent;

  public onCreated() {
    let splitterObj1 = new Splitter({
      height: '100%',
      paneSettings: [
        { size: '94%', min: '20%' },
        { size: '6%', min: '6%' }
      ],
      orientation: 'Vertical'
    });
    splitterObj1.appendTo('#vertical_splitter');
  }
  public fields: FieldSettingsModel = { text: "name", value: "id" };
  // Toolbar Item
  public toolbar!: ToolbarInterface[];
  // Khai báo data
  public data: Observable<DataStateChangeEventArgs>;
  public state!: DataStateChangeEventArgs;
  public flagStatusEmp: any;
  editForm!: FormGroup;
  // list filter

  // Private
  private _unsubscribeAll: Subject<any>;
  pageIndex: number = 0;
  button: any;
  field: any;
  nodeSelected: any;
  lstYear = [];
  lstPeriodId: any;
  model = new CalculatePayroll();
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
    private _formBuilder: FormBuilder,
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
    this.editForm = this._formBuilder.group({
      yearId: ["", [Validators.required]],
      periodId: ["", [Validators.required]]
    });
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Set the selected language from default languages
    this.selectedLanguage = _.find(this.languages, {
      id: this._translateService.currentLang,
    });
    

    this.getListYear();
    // Load List Data
    this._coreService.organization
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((model: any) => {
        this.nodeSelected = model.id;
        this.getListData();
      });
    setTimeout(() => {
      this._coreService.organizationSelect.next(true);
    }, 100);
  }

  toolItems$ = new BehaviorSubject<any[]>([
    ToolbarItem.SUM_WORK,
    ToolbarItem.EXPORT_EXCEL
  ])

  // GetListData
  getListData = (): void => {
    const state = { skip: 0, take: 20 };
    var extraParams: any = [];
    if (this.nodeSelected) {
      extraParams.push({
        field: "orgId",
        value: this.nodeSelected,
      });
      extraParams.push({
        field: "year",
        value: this.model.yearId,
      });
    }

    this._coreService.execute(state, "hr/timeSheetMonthly/ListEntitlement", extraParams);
  };

  getListYear() {
    this._coreService
      .Get("hr/SalaryPeriod/GetYear")
      .subscribe((res: any) => {
        this.lstYear = res.data;
        this.model.yearId = res.data[0].id;
        this.getListData();
      });
  }
  GetEmp = (e: any) => {
    this.flagStatusEmp = e.checked;
    this.getListData();
  }

  changeYear(e: any) {
    if (e.isInteracted) {
      this.model.yearId = e.value;
      this.getListData();
    }
  }

  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.pageIndex = Math.floor(state.skip! / state.take!);
    let extraParams: any[] = [];
    if (this.nodeSelected) {
      extraParams.push({
        field: "orgId",
        value: this.nodeSelected,
      });
    }

    this._coreService.execute(state, "hr/timeSheetMonthly/ListEntitlement", extraParams);
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
    switch (buttonId) {
      case ToolbarItem.EXPORT_EXCEL:
        this.gridInstance.excelExport();
        break;
      case ToolbarItem.SUM_WORK:      
        if (!this.model.yearId) {
          this.notification.warning("Chưa chọn năm");
          return;
        }
        if (!this.model.periodId) {
          this.notification.warning("Chưa chọn kỳ lương");
          return;
        }
        this._coreService
          .Post("hr/timeSheetMonthly/CalEntitlement", this.model)
          .subscribe((res: any) => {
            if (res.statusCode == 400) {
              this.notification.checkErrorMessage(res.error);
            } else {
              this.notification.success("Tính lương thành công");
              this.getListData();
            }
          });
        break;
      default:
        break;
    }
  };

  ngOnDestroy() {
    clearTimeout(this.button);
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
