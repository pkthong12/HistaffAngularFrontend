import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveStaffProfileEditComponent } from './approve-staff-profile-edit.component';
import { CoreTabsModule } from 'src/app/libraries/core-tabs/core-tabs.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { ApproveCvComponent } from './approve-cv/approve-cv.component';
import { ApproveContractComponent } from './approve-contract/approve-contract.component';
import { ApproveAdditinalInfoComponent } from './approve-additinal-info/approve-additinal-info.component';
import { ApproveEducationComponent } from './approve-education/approve-education.component';
import { ApproveBankinfoComponent } from './approve-bankinfo/approve-bankinfo.component';
import { ApproveStaffProfileRoutingModule } from './approve-staff-profile-edit.routing';
import { CorePageViewModule } from 'src/app/libraries/core-page-view/core-page-view.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { PipesModule } from 'src/app/libraries/pipes/pipes.module';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { FormsModule } from '@angular/forms';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';


@NgModule({
  declarations: [
    ApproveStaffProfileEditComponent,
    ApproveCvComponent,
    ApproveContractComponent,
    ApproveAdditinalInfoComponent,
    ApproveEducationComponent,
    ApproveBankinfoComponent,
  ],
  imports: [
    CommonModule,
    CoreTabsModule,
    CorePageListModule,
    ApproveStaffProfileRoutingModule,
    CorePageViewModule,
    AppPipesModule,
    PipesModule,
    CoreOrgTreeModule,
    FormsModule,
    CorePageHeaderModule
  ]
})
export class ApproveStaffProfileEditModule { }
