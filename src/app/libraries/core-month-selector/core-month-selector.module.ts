import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreMonthSelectorComponent } from './core-month-selector/core-month-selector.component';

import { CoreYearPickerModule } from '../core-year-picker/core-year-picker.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    CoreMonthSelectorComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CoreYearPickerModule,
    AppPipesModule
  ],
  exports: [CoreMonthSelectorComponent]
})
export class CoreMonthSelectorModule { }
