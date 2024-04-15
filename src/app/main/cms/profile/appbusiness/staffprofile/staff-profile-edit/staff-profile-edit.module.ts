import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffProfileEditComponent } from './staff-profile-edit.component';
import { RouterModule } from '@angular/router';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { StaffProfileEditRoutingModule } from './staff-profile-edit-routing.module';
import { CoreAccordionModule } from 'src/app/libraries/core-accordion/core-accordion.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreFileUploaderModule } from 'src/app/libraries/core-file-uploader/core-file-uploader.module';
import { CoreControlModule } from 'src/app/libraries/core-control/core-control.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { AppPipesModule } from "../../../../../../app-pipes/app-pipes.module";
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';

@NgModule({
    declarations: [StaffProfileEditComponent],
    imports: [
        CommonModule,
        RouterModule,
        StaffProfileEditRoutingModule,
        CorePageHeaderModule,
        CoreAccordionModule,
        FormsModule,
        ReactiveFormsModule,
        CoreFileUploaderModule,
        CoreControlModule,
        CoreButtonGroupVnsModule,
        AppPipesModule,
        FullscreenModalLoaderModule
    ]
})
export class StaffProfileEditModule { }
