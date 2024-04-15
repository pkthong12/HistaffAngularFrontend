import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CoreAccordionModule } from 'src/app/libraries/core-accordion/core-accordion.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreFileUploaderModule } from 'src/app/libraries/core-file-uploader/core-file-uploader.module';
import { CoreControlModule } from 'src/app/libraries/core-control/core-control.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { ChangeInfoComponent } from './change-info.component';
import { ChangeInfoRoutingModule } from './change-info-routing.module';

@NgModule({
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
  ],
  declarations: [ChangeInfoComponent]
})
export class ChangeInfoModule { }
