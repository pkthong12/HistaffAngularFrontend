import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';

import { FunctionIgnoreRoutingModule } from './function-ignore-routing.module';
import { FunctionIgnoreComponent } from './function-ignore/function-ignore.component';
import { FunctionIgnoreEditComponent } from './function-ignore-edit/function-ignore-edit.component';


@NgModule({
  declarations: [
    FunctionIgnoreComponent,
    FunctionIgnoreEditComponent
  ],
  imports: [
    CommonModule,
    FunctionIgnoreRoutingModule,
    CorePageListModule,
    CorePageEditModule,
  ]
})
export class FunctionIgnoreModule { }
