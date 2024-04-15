import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MutationLogRoutingModule } from './mutation-log-routing.module';
import { MutationLogComponent } from './mutation-log/mutation-log.component';

import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';

@NgModule({
  declarations: [
    MutationLogComponent
  ],
  imports: [
    CommonModule,
    MutationLogRoutingModule,
    CorePageListModule
  ]
})
export class MutationLogModule { }
