import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
  Input,
} from "@angular/core";
import { Subject } from "rxjs";
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
import { DataStateChangeEventArgs } from "@syncfusion/ej2-angular-grids";
import { ToolbarInterface } from "src/app/_models/index";
import { CoreService } from "src/app/services/core.service";
import { ConfigService } from "src/app/services/config.service";
const _ = require("lodash");
import { takeUntil } from "rxjs/operators";
import {
  GridComponent,
  SelectionSettingsModel,
} from "@syncfusion/ej2-angular-grids";
import { ModalService } from "src/app/services/modal.service";
setCulture("en");

@Component({
  selector: "cms-app-modalsemp",
  templateUrl: "./modalsemp.component.html",
  styleUrls: ["./modalsemp.component.scss"],
  providers: [],
  encapsulation: ViewEncapsulation.None,
})
export class ModalsEmpComponent implements OnInit {
  // Varriable Language
  languages: any;
  selectedLanguage: any;
  @Input() id!: string;
  @Input() model: any;

  @ViewChild("overviewgrid", { static: false })
  public gridInstance!: GridComponent;

  public field = {};
  // Toolbar Item
  public toolbar!: ToolbarInterface[];
  private status: number = -1;
  // Khai báo data
  public data: Observable<DataStateChangeEventArgs>;
  public state: DataStateChangeEventArgs = { skip: 0, take: 20 };
  public selectionOptions!: SelectionSettingsModel;
  // Private
  private _unsubscribeAll: Subject<any>;
  pageIndex: number = 0;
  nodeSelected: any;
  element: any;
  param: any;
  terminate: number = 0;

  /**
   * Constructor
   *
   */
  constructor(
    private _coreServiceEmp: CoreService,
    private notification: Notification,
    private globals: Globals,
    public configs: Configs,
    public router: Router,
    private _translateService: TranslateService,
    private _configService: ConfigService,
    private _tlaTranslationLoaderService: TranslationLoaderService,
    private modalService: ModalService,
    private el: ElementRef
  ) {
    // Set language
    this.languages = this.globals.languages;
    this.data = _coreServiceEmp;
    this._configService._configSubject.next("true");
    // Load file language
    this._tlaTranslationLoaderService.loadTranslations(vietnam, english);
    // Set the private defaults
    this._unsubscribeAll = new Subject();
    L10n.load(this.configs.languageGrid);
    this.element = el.nativeElement;
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Set the selected language from default languages
    this.selectedLanguage = _.find(this.languages, {
      id: this._translateService.currentLang,
    });
    
    // Load List Data
    this.modalService.add(this);
  }

  // open modal
  open(param?: any): void {
    if (this.status == -1) {
      this.status = 1;
      this._coreServiceEmp.organization
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((model: any) => {
          this.nodeSelected = model.id;
          this.getListData();
        });
      setTimeout(() => {
        this._coreServiceEmp.organizationSelect.next(true);
      }, 100);
    }
    this.status = 1;

    if (param && param.multiselect) {
      this.selectionOptions = {
        type: "Multiple",
        enableSimpleMultiRowSelection: true
      };
    } else if (param && !param.multiselect) {
      this.selectionOptions = {
        type: "Single",
        enableSimpleMultiRowSelection: true
      };
    }

    if (param.selected) {
      let data = this.gridInstance.getCurrentViewRecords();
      let index = _.findIndex(data, { id: param.selected });
      this.gridInstance.selectRow(index);
    }
    this.param = param;
    this.element.style.display = "block";
    document.body.classList.add("gohr-modal-open");
  }

  // close modal
  close(): void {
    this.status = 0;
    this.gridInstance.clearSelection();
    this.element.style.display = "none";
    document.body.classList.remove("gohr-modal-open");
    this.modalService.modalStatus.next("close");
  }
  maximize() {
  }
  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  choise() {
    this.status = 0;
    let x: any = this.gridInstance.getSelectedRecords();
    if (x.length == 0) {
      this.notification.warning("Chưa chọn nhân viên");
      return;
    }
    if (this.param.multiselect && this.param.multiselect == true) {
      this.modalService.employee.next(x);
    }
    else {
      this.modalService.employee.next(x[0]);
    }
    this.modalService.close("cms-app-modalsemp");


    // switch (this.param.state) {
    //case "leavejob":

    //  break;
    //}
  }

  getListData = (): void => {
    if (this.status == 1) {
      var extraParams: any = [];
      if (this.nodeSelected) {
        extraParams.push({
          field: "orgId",
          value: this.nodeSelected,
        });
      }
      extraParams.push({
        field: "WorkStatusId",
        value: this.terminate,
      });


      this._coreServiceEmp.execute(this.state, "hr/Employee/GetPopup", extraParams);
    }
  };
  GetEmp = (e: any) => {
    if (e.checked == true) {
      this.terminate = 1;
    }
    else {
      this.terminate = 0;
    }
    this.getListData();
  }
  public dataStateChange(state: DataStateChangeEventArgs): void {
    if (this.status == 1) {
      this.state = state;
      this.pageIndex = Math.floor(state.skip! / state.take!);
      let extraParams: any[] = [];
      if (this.nodeSelected) {
        extraParams.push({
          field: "orgId",
          value: this.nodeSelected,
        });
      }
      extraParams.push({
        field: "WorkStatusId",
        value: this.terminate,
      });
      this._coreServiceEmp.execute(state, "hr/Employee/GetPopup", extraParams);
    }
  }
}
