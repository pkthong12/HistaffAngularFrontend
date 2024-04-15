import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommendRoutingModule } from './commend-routing.module';
import { CommendComponent } from './commend.component';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';


@NgModule({
  declarations: [
    CommendComponent
  ],
  imports: [
    CommonModule,
    CommendRoutingModule,
    AppPipesModule
  ]
})
export class CommendModule { }
