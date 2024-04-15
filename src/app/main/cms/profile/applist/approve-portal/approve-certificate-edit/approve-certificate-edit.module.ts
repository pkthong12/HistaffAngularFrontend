import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { ApproveCertificateEditComponent } from './approve-certificate-edit.component';
import { ApproveCertificateEditDetailComponent } from './approve-certificate-edit-detail/approve-certificate-edit-detail.component';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { ApproveCertificateEditRoutingModule } from './approve-certificate-edit-routing.module';
import { CommonModule } from '@angular/common';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';


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
    ApproveCertificateEditRoutingModule,
    CoreOrgTreeModule
  ],
  declarations: [ApproveCertificateEditComponent,ApproveCertificateEditDetailComponent],
  providers: [CoreService],
})


export class ApproveCertificateEdittModule {}
