import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';
import { CorePageViewModule } from 'src/app/libraries/core-page-view/core-page-view.module';
import { ContractinfoComponent } from './contractinfo/contractinfo.component';
import { ContractappendixComponent } from './contractappendix/contractappendix.component';
import { CoreTabsModule } from 'src/app/libraries/core-tabs/core-tabs.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    ContractComponent,
    ContractinfoComponent,
    ContractappendixComponent
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    CorePageViewModule,
    CoreTabsModule,
    AppPipesModule
  ]
})
export class ContractModule { }
