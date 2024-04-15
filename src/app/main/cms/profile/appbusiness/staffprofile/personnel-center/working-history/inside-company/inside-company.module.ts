import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsideCompanyRoutingModule } from './inside-company-routing.module';
import { InsideCompanyComponent } from './inside-company.component';

import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    InsideCompanyComponent
  ],
  imports: [
    CommonModule,
    InsideCompanyRoutingModule,
    AppPipesModule
  ]
})
export class InsideCompanyModule { }
