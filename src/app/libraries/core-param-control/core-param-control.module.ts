import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreParamControlComponent } from './core-param-control/core-param-control.component';

import { FormsModule } from '@angular/forms';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { PipesModule } from '../pipes/pipes.module';
import { CoreDropdownModule } from '../core-dropdown/core-dropdown.module';
import { CoreChecklistModule } from '../core-checklist/core-checklist.module';
// import { CoreFormControlSeekerModule } from '../core-form-control-seeker/core-form-control-seeker.module';
import { CoreCheckboxModule } from '../core-checkbox/core-checkbox.module';
import { CoreDatePickerModule } from '../core-date-picker/core-date-picker.module';

@NgModule({
  declarations: [
    CoreParamControlComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppPipesModule,
    PipesModule,
    CoreDropdownModule,
    CoreChecklistModule,
    // CoreFormControlSeekerModule,
    CoreCheckboxModule,
    CoreDatePickerModule,
  ],
  exports: [CoreParamControlComponent]
})
export class CoreParamControlModule { }
