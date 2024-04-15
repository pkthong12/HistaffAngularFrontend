import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, isDevMode } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { AppService } from 'src/app/services/app.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { PersonnelCenterService } from '../personnel-center.service';
import { ResponseService } from 'src/app/services/response.service';
import { filter } from 'rxjs';
import { alertOptions } from 'src/app/constants/alertOptions';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { EnumCoreViewItemType, ICoreViewSection } from 'src/app/libraries/core-page-view/enum-interfaces';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit{

  headers: EnumTranslateKey[] = [
    EnumTranslateKey.UI_PERSONNEL_CENTER_TAB_CONTRACTINFO,
    EnumTranslateKey.UI_PERSONNEL_CENTER_TAB_CONTRACTAPPENDIX,
  ]
  constructor(
    private personnelCenterService: PersonnelCenterService
  ) { }
  
  onCoreTabsHedaerClick(e: any): void {
    this.personnelCenterService.tabActiveIndex = e.index
    this.personnelCenterService.tabActiveHeader = e.header
  }
  ngOnInit(): void {
    this.personnelCenterService.leftMenuActiveItemIndex = 3
    this.personnelCenterService.tabActiveIndex = 0
    this.personnelCenterService.tabActiveHeader = this.headers[0]    
  }
}
