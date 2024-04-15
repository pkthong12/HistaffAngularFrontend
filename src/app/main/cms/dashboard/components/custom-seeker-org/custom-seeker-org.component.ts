import { AfterViewInit, Component, ElementRef, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild, isDevMode } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { CoreContractSeekerComponent } from 'src/app/libraries/core-contract-seeker/core-contract-seeker/core-contract-seeker.component';
import { CoreEmployeeSeekerComponent } from 'src/app/libraries/core-employee-seeker/core-employee-seeker/core-employee-seeker.component';
import { CoreFormControlBaseComponent } from 'src/app/libraries/core-form-control-base/core-form-control-base.component';
import { EnumCoreFormControlSeekerSourceType } from 'src/app/libraries/core-form-control-seeker/EnumCoreFormControlSeekerSourceType';
import { ICoreFormControlSeekerExtraBindingModel } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { IOrgTreeItem } from 'src/app/libraries/core-org-tree/core-org-tree/IOrgTreeItem';
import { EnumCoreOrgTreeaAccessorMode } from 'src/app/libraries/core-org-tree/core-org-tree/core-org-tree.component';
import { CorePositionSeekerComponent } from 'src/app/libraries/core-position-seeker/core-position-seeker/core-position-seeker.component';
import { ICoreTableColumnItem, ICoreTableToolItem, ECoreTableToolCode, ECoreTableToolClass, ICoreTableToolClickEventEmitterData } from 'src/app/libraries/core-table/core-table.component';
import { CoreWageSeekerComponent } from 'src/app/libraries/core-wage-seeker/core-wage-seeker/core-wage-seeker.component';
import { CoreWorkingSeekerComponent } from 'src/app/libraries/core-working-seeker/core-working-seeker/core-working-seeker.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';
import { DashboardService } from '../../dashboard.service';
import { AppService } from 'src/app/services/app.service';
import { api } from 'src/app/constants/api/apiDefinitions';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';

@Component({
  selector: 'app-custom-seeker-org',
  templateUrl: './custom-seeker-org.component.html',
  styleUrls: ['./custom-seeker-org.component.scss']
})
export class CustomSeekerOrgComponent extends CoreFormControlBaseComponent implements OnInit, AfterViewInit, OnDestroy {

  lang!: string;
  treeHeight!: number;
  // ORG_TREE_CHECKBOX
  listOrgIds: number[] = [];
  accessorMode: EnumCoreOrgTreeaAccessorMode = EnumCoreOrgTreeaAccessorMode.CHECKED;

  title: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CHOOSE_UNIT;

  /* START: REQUIRED */
  @Input() boundFrom!: string; // take this field from GetById response innerBody to bind to the value
  @Input() shownFrom!: string; // take this field from GetById response innerBody to bind to the text
  /* END: REQUIRED when EMPLOYEE_SEEKER */
  @Output() onHandleClick = new EventEmitter();


  sourceOpen!: boolean;
  clearIcon: boolean = false;
  valueToShow!: string;
  showDissolved: boolean = false;
  subscriptions: Subscription[] = [];
  showClearIcon!: boolean;

  constructor(
    private mls: MultiLanguageService,
    public organizationService: OrganizationService,
    public dashboardService: DashboardService,
    private appService: AppService,
  ) {
    super();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.listOrgIds = [];

      this.subscriptions.push(
        this.mls.lang$.subscribe(x => this.lang = x),
      )
      this.dashboardService.originalIds$.subscribe(x => this.listOrgIds = x)
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

  onClickSeek(): void {
    this.sourceOpen = true;
  }

  onSelect(): void {
    console.log(this.organizationService.status$.value);


    this.listOrgIds.sort();

    if (this.listOrgIds.length > 0) {
      setTimeout(() => {
        this.appService.post(api.HU_CONTRACT_DASHBOARD_EMP_GETIDORGDISSOLVE, { orgIds: this.listOrgIds, showDissolved: this.showDissolved }).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body = x.body as IFormatedResponse
            if (body.statusCode === 200) {
              this.listOrgIds = body.innerBody;
              this.appService.post(api.HU_CONTRACT_DASHBOARD_EMP_GETNAMEORGDASHBOARD, { orgIds: this.listOrgIds }).subscribe(x => {
                if (x.ok && x.status === 200) {
                  const body = x.body as IFormatedResponse
                  if (body.statusCode === 200) {
                    this.valueToShow = body.innerBody.listName;
                  }
                }
              })
            }
          }
        })

      })

    } else {
      this.valueToShow = '';
    }
    this.dashboardService.originalIds$.next(this.listOrgIds);
    this.clearIcon = true;
    this.onHandleClick.emit(this.listOrgIds);
    this.sourceOpen = false;
  }

  onCancel(): void {
    this.sourceOpen = false;
  }

  onClickClear() {
    this.valueToShow = '';
    this.clearIcon = false;
    this.onHandleClick.emit([]);
  }
  showDissolvedEvent(e: any) {
    this.showDissolved = e;
  }
}