import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RouterModule } from '@angular/router';

import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';

const routes = [
  {
      path: ':id',
      component: ChangePasswordComponent
  },
];

@NgModule({
  declarations: [
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    CorePageEditModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    ChangePasswordComponent
  ]
})
export class ChangePasswordModule { }
