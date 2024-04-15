import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreMonthPickerComponent } from './core-month-picker/core-month-picker.component';



@NgModule({
  declarations: [
    CoreMonthPickerComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CoreMonthPickerComponent
  ]
})
export class CoreMonthPickerModule { }
