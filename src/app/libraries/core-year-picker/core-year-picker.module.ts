import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreYearPickerComponent } from './core-year-picker/core-year-picker.component';



@NgModule({
  declarations: [
    CoreYearPickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CoreYearPickerComponent
  ]
})
export class CoreYearPickerModule { }
