import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovePortalComponent } from './approve-portal.component';
import { ApprovePortalRoutingModule } from './approve-portal.routing';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CoreService } from 'src/app/services/core.service';
import { HufamilyEditModule } from './hufamily-edit/hufamily-edit.module';
import { CorePaginationModule } from 'src/app/libraries/core-pagination/core-pagination.module';
import { CorePaginationFullModule } from 'src/app/libraries/core-pagination-full/core-pagination-full.module';
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';
import { FormsModule } from '@angular/forms';
import { CoreConfirmDialogModule } from 'src/app/libraries/core-confirm-dialog/core-confirm-dialog.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { ApproveWorkingBeforeComponent } from './approve-working-before/approve-working-before.component';
import { ApproveCertificateEdittModule } from './approve-certificate-edit/approve-certificate-edit.module';
import { CoreTableModule } from 'src/app/libraries/core-table/core-table.module';
import { CoreTabsModule } from 'src/app/libraries/core-tabs/core-tabs.module';
import { ApproveStaffProfileEditComponent } from './approve-staff-profile-edit/approve-staff-profile-edit.component';
import { RouterModule } from '@angular/router';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { PipesModule } from 'src/app/libraries/pipes/pipes.module';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';



@NgModule({
  declarations: [
  
    ApproveWorkingBeforeComponent
  ],
  imports: [
    CommonModule,
    ApprovePortalRoutingModule,
    CorePageHeaderModule,
    FormsModule,
    CorePaginationModule,
    CorePaginationFullModule,
    CoreConfirmDialogModule,
    CoreCheckboxModule,
    CorePageListModule,
    ApproveCertificateEdittModule,
    CorePageListModule,
    AppPipesModule,
    PipesModule,
    CoreOrgTreeModule
  ],
  providers: [CoreService],
})
export class ApprovePortalModule { }
