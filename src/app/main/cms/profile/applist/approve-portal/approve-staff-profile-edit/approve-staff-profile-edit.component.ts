import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { ApproveStaffProfileService } from './approve-staff-profile-edit.service';
import { LayoutService } from 'src/app/services/layout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-approve-staff-profile-edit',
  templateUrl: './approve-staff-profile-edit.component.html',
  styleUrls: ['./approve-staff-profile-edit.component.scss']
})
export class ApproveStaffProfileEditComponent implements OnInit, AfterViewInit, OnDestroy {
  headers: EnumTranslateKey[] = [
    EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_CV,
    EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_CONTACT,
    EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_ADDITIONAL_INFO,
    EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_EDUCATION,
    EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_BANK_INFO

  ]
  title: EnumTranslateKey = EnumTranslateKey.PERSONNEL_PROFILE_APPROVE_STAFF_PROFILE;
  coreTabsHeight!: number;
  corePageListHeight!: number;
  subscriptions: Subscription[] = [];
  constructor(
    private approveStaffProflieEditService: ApproveStaffProfileService,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() =>{
      this.subscriptions.push(
        this.layoutService.contentContainerHeight$.subscribe(x =>{
          this.coreTabsHeight = x - this.layoutService.basicSpacing - this.layoutService.corePageHeaderHeight
          this.corePageListHeight = this.coreTabsHeight - this.layoutService.coreTabsHeaderLineHeight
        })
      )
    })
  }

  onCoreTabsHedaerClick(e: any): void{
    this.approveStaffProflieEditService.tabActiveIndex = e.index
    this.approveStaffProflieEditService.tabActiveHeader = e.header
  }
  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
  }
  
}
