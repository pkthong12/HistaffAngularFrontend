import { Component, AfterViewInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { alertOptions } from "src/app/constants/alertOptions";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { IAuthData } from "src/app/interfaces/IAuthData";
import { AlertService } from "src/app/libraries/alert/alert.service";
import { BaseComponent } from "src/app/libraries/base-component/base/base.component";
import { EnumCoreFormControlSeekerSourceType } from "src/app/libraries/core-form-control-seeker/EnumCoreFormControlSeekerSourceType";
import { EnumFormBaseContolType, IFormBaseControl } from "src/app/libraries/core-form/core-form/enum-interfaces";
import { RecursiveService } from "src/app/libraries/services/recursive.service";
import { AuthService } from "src/app/services/auth.service";

import { LayoutService } from "src/app/services/layout.service";
import { MultiLanguageService } from "src/app/services/multi-language.service";
import { OrganizationService } from "src/app/services/organization.service";

@Component({
  selector: "app-cms-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})

export class AppDashboardComponent extends BaseComponent implements AfterViewInit, OnDestroy {

  title: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_MAIN_DASHBOARD
  height!: number;
  chartHeight!: number;
  form!: FormGroup;
  activeIds: number[] = [];

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  orgId: IFormBaseControl = {
    //Đối tượng nhân viên
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_CODE,
    field: 'orgId',
    value: '',
    controlType: EnumFormBaseContolType.SEEKER,
    seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,
    getByIdObject$: this.employeeGetByIdObject$,
    boundFrom: 'id',
    shownFrom: 'name',
    /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
    type: 'text'
  };

  constructor(
    public override mls: MultiLanguageService,
    public layoutService: LayoutService,
    public authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    public organizationService: OrganizationService,
    private recursiveService: RecursiveService,
  ) {
    super(mls)
  }


  computeChartHeight(): void {
    this.chartHeight = this.height / 2 - 35 * 2; // 35 is chart square header height
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.layoutService.contentContainerHeight$.subscribe(x => {
      this.height = x - this.layoutService.basicSpacing * 2 - this.layoutService.corePageHeaderHeight - 50;
      this.computeChartHeight();
    })

    if (!!this.authService.data$.value?.isFirstLogin) { //change password for new user
      this.router.navigate(['cms', 'change-password', btoa((this.authService.data$.value as IAuthData).refreshToken.user)]);
      this.alertService.warn(`${this.mls.trans(EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSWORD_SHOULD_BE_CHANGED)}`, alertOptions);
    }
    this.form = new FormGroup({
      orgId: new FormControl()
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.height = this.layoutService.contentContainerHeight$.value - this.layoutService.basicSpacing * 2 - this.layoutService.corePageHeaderHeight - 50; // 50 is div h50
      this.computeChartHeight();
    })
  }
  onItemDoubleClick(e: any) {
    this.activeIds = e;
  }
}
