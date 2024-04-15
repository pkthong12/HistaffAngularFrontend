import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisciplineRoutingModule } from './discipline-routing.module';
import { DisciplineComponent } from './discipline.component';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';


@NgModule({
  declarations: [
    DisciplineComponent
  ],
  imports: [
    CommonModule,
    DisciplineRoutingModule,
    AppPipesModule
  ]
})
export class DisciplineModule { }
