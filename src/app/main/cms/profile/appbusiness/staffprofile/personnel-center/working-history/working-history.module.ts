import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkingHistoryRoutingModule } from './working-history-routing.module';
import { WorkingHistoryComponent } from './working-history.component';

import { CoreTabsModule } from 'src/app/libraries/core-tabs/core-tabs.module';
import { InsideCompanyComponent } from './inside-company/inside-company.component';
import { OutsideCompanyComponent } from './outside-company/outside-company.component';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    WorkingHistoryComponent,
    InsideCompanyComponent,
    OutsideCompanyComponent
  ],
  imports: [
    CommonModule,
    WorkingHistoryRoutingModule,
    CoreTabsModule,
    AppPipesModule
  ]
})
export class WorkingHistoryModule { }
