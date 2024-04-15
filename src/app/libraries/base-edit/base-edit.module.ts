import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEditComponent } from './base-edit/base-edit.component';



@NgModule({
  declarations: [
    BaseEditComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BaseEditComponent
  ]
})
export class BaseEditModule { }
