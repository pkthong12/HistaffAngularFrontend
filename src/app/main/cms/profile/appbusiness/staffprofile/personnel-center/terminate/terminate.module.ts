import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerminateRoutingModule } from './terminate-routing.module';
import { TerminateComponent } from './terminate.component';

import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    TerminateComponent
  ],
  imports: [
    CommonModule,
    TerminateRoutingModule,
    AppPipesModule
  ]
})
export class TerminateModule { }
