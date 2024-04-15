import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { AppDashboardModule } from '../main/cms/dashboard/dashboard.module';
import { HomeComponent } from './home.component';

import { CorePageHeaderModule } from '../libraries/core-page-header/core-page-header.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppDashboardModule,
    CorePageHeaderModule
  ]
})
export class HomeModule { }
