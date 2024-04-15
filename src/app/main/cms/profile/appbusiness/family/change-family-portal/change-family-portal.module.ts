import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeFamilyPortalComponent } from './change-family-portal.component';
import { RouterModule } from '@angular/router';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CoreAccordionModule } from 'src/app/libraries/core-accordion/core-accordion.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreFileUploaderModule } from 'src/app/libraries/core-file-uploader/core-file-uploader.module';
import { CoreControlModule } from 'src/app/libraries/core-control/core-control.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { ChangeInfoRoutingModule } from '../../staffprofile/change-info/change-info-routing.module';



@NgModule({
  declarations: [
    ChangeFamilyPortalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CorePageHeaderModule,
    CoreAccordionModule,
    FormsModule,
    ReactiveFormsModule,
    CoreFileUploaderModule,
    CoreControlModule,
    CoreButtonGroupVnsModule,
    ChangeInfoRoutingModule
  ]
})
export class ChangeFamilyPortalModule { }
