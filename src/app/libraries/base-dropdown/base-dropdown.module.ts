import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDropdownComponent } from './base-dropdown/base-dropdown.component';



@NgModule({
  declarations: [
    BaseDropdownComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BaseDropdownComponent
  ]
})
export class BaseDropdownModule { }
