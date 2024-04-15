import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { Subject, Subscription } from "rxjs";
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
import { ToolbarInterface } from "src/app/_models/index";
import { CoreService } from "src/app/services/core.service";
import { ConfigService } from "src/app/services/config.service";
const _ = require("lodash");
import { TreeViewComponent } from "@syncfusion/ej2-angular-navigations";
import { ModalService } from "src/app/services/modal.service";
import { MaskedTextBoxComponent } from "@syncfusion/ej2-angular-inputs";
import { DataManager, Query, Predicate } from "@syncfusion/ej2-data";

import { AuthService } from "src/app/services/auth.service";
import { RecursiveService } from "src/app/libraries/services/recursive.service";

setCulture("en");

@Component({
  selector: "cms-app-org",
  templateUrl: "./organization.component.html",
  styleUrls: ['./organization.component.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.None,
})
export class OrganizationComponent implements OnInit, OnDestroy {
  // Varriable Language
  languages: any;
  selectedLanguage: any;
  @ViewChild("treeView", { static: true }) listTreeObj!: TreeViewComponent;
  @ViewChild("maskObj", { static: true }) maskObj!: MaskedTextBoxComponent;
  // list data source for TreeView component
  public localData: any[] = [];
  // Mapping TreeView fields property with data source properties
  public field: any;

  subscriptions: Subscription[] = [];

  // Toolbar Item
  public toolbar!: ToolbarInterface[];
  // Khai báo data
  public data!: any[];

  pageIndex: number = 0;
  nodeSelected: any;
  element: any;

  constructor(
    private _coreService: CoreService,
    private globals: Globals,
    public configs: Configs,
    public router: Router,
    private _translateService: TranslateService,
    private _configService: ConfigService,
    private _tlaTranslationLoaderService: TranslationLoaderService,
    private modalService: ModalService,
    private authService: AuthService,
    private recursiveService: RecursiveService
  ) {
    this.languages = this.globals.languages;

    this._configService._configSubject.next("true");
    this._tlaTranslationLoaderService.loadTranslations(vietnam, english);
    L10n.load(this.configs.languageGrid);
  }

  ngOnInit(): void {

    // Set the selected language from default languages
    this.selectedLanguage = _.find(this.languages, {
      id: this._translateService.currentLang,
    });
    this._translateService.use(this.selectedLanguage?.id);
    // Load List Data
    this.modalService.add(this);

    this.loadDataFromLocal();
    
    this.loadTreeView();
    
    this.subscriptions.push(
      this._coreService.organizationSelect
        .subscribe((res: any) => {
          if (res) {
            this.listTreeObj.selectedNodes = [this.localData[0].ID];
            this._coreService.organization.next({ id: this.localData[0].ID });
          }
        })
    )
  }
  loadDataFromLocal() {
    //let orgId: any = localStorage.getItem("orgIds");
    //this.localData = JSON.parse(orgId);
    this.localData  = this.authService.data$.value?.orgIds!
  }
  // Refesh data when add  organization new
  refesh() {
    this._coreService
      .Get("hr/Organization/GetOrgPermission")
      .subscribe((res: any) => {
        // Xóa những parent Id node không có trong treeView
        if (res.data && res.data.length > 0) {
          var ids = res.data.map((item: any) => item.ID);
          res.data.forEach((element: any) => {
            if (!ids.includes(element.PARENT_ID)) {
              delete element.PARENT_ID;
            }
          });
          localStorage.setItem("orgIds", JSON.stringify(res.data));
        }
      });
  }
  loadTreeView() {
    this.listTreeObj.fields = {
      dataSource: this.localData,
      id: "ID",
      parentID: "PARENT_ID",
      text: "NAME",
      hasChildren: "HAS_CHILD",
      isChecked: "IS_CHECKED",
      expanded: "EXPAND",
    };
    
  }

  //Change the dataSource for TreeView
  public changeDataSource(_: any) {
    this.listTreeObj.fields = {
      dataSource: this.localData,
      id: "ID",
      parentID: "PARENT_ID",
      text: "NAME",
      hasChildren: "HAS_CHILD",
      isChecked: "IS_CHECKED",
      expanded: "EXPAND",
    };
  }
  //Filtering the TreeNodes
  public searchNodes(args: any) {
    let _text = this.maskObj.element.value;
    let predicats = [],
      _array = [],
      _filter = [];
    if (_text == "") {
      this.changeDataSource(this.localData);
    } else {
      let predicate = new Predicate("name", "contains", _text, true);
      let filteredList = new DataManager(this.localData).executeLocal(
        new Query().where(predicate)
      );
      for (let j = 0; j < filteredList.length; j++) {
        _filter.push((filteredList[j] as any)["id"]);
        let filters = this.getFilterItems(filteredList[j], this.localData);
        for (let i = 0; i < filters.length; i++) {
          if (_array.indexOf(filters[i]) == -1 && filters[i] != null) {
            _array.push(filters[i]);
            predicats.push(new Predicate("id", "equal", filters[i], false));
          }
        }
      }
      if (predicats.length == 0) {
        this.changeDataSource([]);
      } else {
        let query = new Query().where(Predicate.or(predicats));
        let newList = new DataManager(this.localData).executeLocal(query);
        this.changeDataSource(newList);
        let proxy = this;
        setTimeout(function (this: any) {
          proxy.listTreeObj.expandAll();
        }, 100);
      }
    }
  }
  //Find the Parent Nodes for corresponding childs
  public getFilterItems(fList: any, list: any): any {
    let nodes = [];
    nodes.push(fList["id"]);
    let query2 = new Query().where("id", "equal", fList["pid"], false);
    let fList1 = new DataManager(list).executeLocal(query2);
    if (fList1.length != 0) {
      let pNode = this.getFilterItems(fList1[0], list);
      for (let i = 0; i < pNode.length; i++) {
        if (nodes.indexOf(pNode[i]) == -1 && pNode[i] != null)
          nodes.push(pNode[i]);
      }
      return nodes;
    }
    return nodes;
  }
  nodeSelecting(e: any) {
    if (e.isInteracted) {
      let id = Number(e.nodeData.id);
      this.nodeSelected = _.find(this.localData, { ID: id });
      this.nodeSelected.id = id;
      this._coreService.organization.next(this.nodeSelected);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => {
      if (x) x.unsubscribe()
    })
  }
}
