import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreControlNoGridBufferComponent } from './core-control-no-grid-buffer/core-control-no-grid-buffer.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { PipesModule } from '../pipes/pipes.module';
import { CoreDropdownModule } from '../core-dropdown/core-dropdown.module';
import { CoreListModule } from '../core-list/core-list.module';
import { CoreChecklistModule } from '../core-checklist/core-checklist.module';
import { CoreFormControlSeekerModule } from '../core-form-control-seeker/core-form-control-seeker.module';
import { CoreCheckboxModule } from '../core-checkbox/core-checkbox.module';
import { CoreFileUploaderModule } from '../core-file-uploader/core-file-uploader.module';
import { CoreDatePickerModule } from '../core-date-picker/core-date-picker.module';


@NgModule({
  declarations: [
    CoreControlNoGridBufferComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppPipesModule,
    PipesModule,
    CoreDropdownModule,
    CoreListModule,
    CoreChecklistModule,
    CoreFormControlSeekerModule,
    CoreCheckboxModule,
    CoreFileUploaderModule,
    CoreDatePickerModule,
  ],
  exports: [CoreControlNoGridBufferComponent]
})
export class CoreControlNoGridBufferModule { }
