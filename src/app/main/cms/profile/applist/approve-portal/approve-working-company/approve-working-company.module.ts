import { NgModule } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CommonModule } from '@angular/common';
import { ApproveWorkingCompanyComponent } from './approve-working-company.component';
import { ApproveWorkingCompanyRoutingModule } from './approve-working-company-routing.module';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';

import { CoreTabsModule } from 'src/app/libraries/core-tabs/core-tabs.module';
import { CorePageViewModule } from 'src/app/libraries/core-page-view/core-page-view.module';
import { ApproveHuWorkingComponent } from './approve-hu-working/approve-hu-working.component';

import { CoreAttachmentModule } from 'src/app/libraries/core-attachment/core-attachment.module';

@NgModule({
  imports: [
    // thêm CommonModule
    // để có chức năng điều hướng Pop Up
    CommonModule,
    
    TlaSharedModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    CorePageHeaderModule,
    ApproveWorkingCompanyRoutingModule,
    CoreOrgTreeModule,
    CoreAttachmentModule,
    CoreTabsModule,
    CorePageViewModule,
  ],

  declarations: [
    ApproveWorkingCompanyComponent,

    // thứ tự 01: Quá trình công tác
    ApproveHuWorkingComponent
  ],
  providers: [CoreService]
})
export class ApproveWorkingCompanyModule { }
