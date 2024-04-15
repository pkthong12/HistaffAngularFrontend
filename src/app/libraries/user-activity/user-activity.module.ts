import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserActivityComponent } from './user-activity.component';



@NgModule({
  declarations: [
    UserActivityComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserActivityComponent
  ]
})
export class UserActivityModule { }
