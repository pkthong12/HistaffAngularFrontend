import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
  Input,
  ViewChildren,
} from "@angular/core";
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
import { DataStateChangeEventArgs } from "@syncfusion/ej2-angular-grids";
import { CoreService } from "src/app/services/core.service";
import { ConfigService } from "src/app/services/config.service";
const _ = require("lodash");
import { GridComponent, } from "@syncfusion/ej2-angular-grids";

setCulture("en");

@Component({
  selector: "app-historydecision",
  templateUrl: "./historydecision.component.html",
  styleUrls: ["./historydecision.component.scss"],
  providers: [],
  encapsulation: ViewEncapsulation.None,
})
export class HistoryDecisionComponent implements OnInit {
  // Varriable Language
  languages: any;
  selectedLanguage: any;
  @Input() data : any;

  @ViewChild("overviewgridLstEmp", { static: true })
  public gridInstanceLstEmp!: GridComponent;

  // Toolbar Item
  // Khai báo data
  //public data: Observable<DataStateChangeEventArgs>;
  //public state!: DataStateChangeEventArgs;
  // Private
  private _unsubscribeAll: Subject<any>;
  pageIndex: number = 0;

  /**
   * Constructor
   *
   */
  constructor(
    private globals: Globals,
    public configs: Configs,
    public router: Router,
    private notification: Notification,
    private _translateService: TranslateService,
    private _configService: ConfigService,
    private _tlaTranslationLoaderService: TranslationLoaderService,
    private _coreService: CoreService,
    private el: ElementRef
  ) {
    // Set language
    this.languages = this.globals.languages;
    //this.data = _coreService;
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
    
    //this.getListData();
  }
  ViewRecord(param: any){
    const objParamAdd = { id: param.id, type: "view" };
    const paramAdd = window.btoa(JSON.stringify(objParamAdd));
    let Url = window.location.origin + "/cms/profile/business/decision/" + paramAdd;
    window.open(Url,"_blank")
  }
  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.pageIndex = Math.floor(state.skip! / state.take!);
  }
  // Số thứ tự
  formatStt = (index: string) => {
    return (
      this.pageIndex * this.gridInstanceLstEmp.pageSettings.pageSize! +
      parseInt(index, 0) +
      1
    );
  };
}
