import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutsideCompanyRoutingModule } from './outside-company-routing.module';
import { OutsideCompanyComponent } from './outside-company.component';

import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    OutsideCompanyComponent
  ],
  imports: [
    CommonModule,
    OutsideCompanyRoutingModule,
    AppPipesModule
  ]
})
export class OutsideCompanyModule { }
