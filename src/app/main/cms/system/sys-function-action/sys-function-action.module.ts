import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysFunctionActionRoutingModule } from './sys-function-action-routing.module';
import { SysFunctionActionEditComponent } from './sys-function-action-edit/sys-function-action-edit.component';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { RouterModule } from '@angular/router';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { SysFunctionActionComponent } from './sys-function-action/sys-function-action.component';


@NgModule({
  declarations: [
    SysFunctionActionComponent,
    SysFunctionActionEditComponent
  ],
  imports: [
    CommonModule,
    SysFunctionActionRoutingModule,
    TlaSharedModule,
    LibrariesModule,
    CorePageListModule,
    CorePageHeaderModule,
    RouterModule,
    CorePageEditModule,
  ]
})
export class SysFunctionActionModule { }
