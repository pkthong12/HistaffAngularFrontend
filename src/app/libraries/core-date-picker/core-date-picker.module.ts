import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreDatePickerComponent } from './core-date-picker/core-date-picker.component';

import { FormsModule } from '@angular/forms';
import { CoreMonthPickerModule } from '../core-month-picker/core-month-picker.module';
import { CoreYearPickerModule } from '../core-year-picker/core-year-picker.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    CoreDatePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreMonthPickerModule,
    CoreYearPickerModule,
    AppPipesModule,
  ],
  exports: [
    CoreDatePickerComponent
  ]
})
export class CoreDatePickerModule { }
