import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreControlComponent } from './core-control/core-control.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { PipesModule } from '../pipes/pipes.module';
import { CoreDropdownModule } from '../core-dropdown/core-dropdown.module';
import { CoreListModule } from '../core-list/core-list.module';
import { CoreChecklistModule } from '../core-checklist/core-checklist.module';
import { CoreFormControlSeekerModule } from '../core-form-control-seeker/core-form-control-seeker.module';
import { CoreCheckboxModule } from '../core-checkbox/core-checkbox.module';
import { CoreFileUploaderModule } from '../core-file-uploader/core-file-uploader.module';
import { CoreAttachmentModule } from '../core-attachment/core-attachment.module';
import { CoreGridBufferModule } from '../core-grid-buffer/core-grid-buffer.module';
import { CoreDatePickerModule } from '../core-date-picker/core-date-picker.module';
import { CoreOrgTreeModule } from '../core-org-tree/core-org-tree.module';
import { CoreRadioGroupModule } from '../core-radio-group/core-radio-group.module';
import { CoreMccModule } from '../core-mcc/core-mcc.module';
import { CoreMonthSelectorModule } from '../core-month-selector/core-month-selector.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { CoreCurrencyInputModule } from '../core-currency-input/core-currency-input.module';

@NgModule({
  declarations: [
    CoreControlComponent
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
    CoreAttachmentModule,
    CoreGridBufferModule,
    CoreDatePickerModule,
    CoreOrgTreeModule,
    CoreRadioGroupModule,
    CoreMccModule,
    CoreMonthSelectorModule,
    TooltipModule,
    CoreCurrencyInputModule,
 ],
  exports: [CoreControlComponent]
})
export class CoreControlModule { }
