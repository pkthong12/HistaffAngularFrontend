import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkingRoutingModule } from './working-routing.module';
import { WorkingComponent } from './working.component';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';


@NgModule({
  declarations: [
    WorkingComponent
  ],
  imports: [
    CommonModule,
    WorkingRoutingModule,
    AppPipesModule
  ]
})
export class WorkingModule { }
