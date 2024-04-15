import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysFunctionUrlMapperRoutingModule } from './sys-function-url-mapper-routing.module';
import { SysFunctionUrlMapperComponent } from './sys-function-url-mapper.component';

import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';


@NgModule({
  declarations: [
    SysFunctionUrlMapperComponent
  ],
  imports: [
    CommonModule,
    SysFunctionUrlMapperRoutingModule,
    CorePageEditModule,
  ]
})
export class SysFunctionUrlMapperModule { }
