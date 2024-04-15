
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreContractSeekerComponent } from './core-contract-seeker/core-contract-seeker.component';

import { FormsModule } from '@angular/forms';
import { CoreOrgTreeModule } from '../core-org-tree/core-org-tree.module';
import { CorePageListModule } from '../core-page-list/core-page-list.module';


@NgModule({
  declarations: [
    CoreContractSeekerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreOrgTreeModule,
    CorePageListModule,
  ],
  exports: [
    CoreContractSeekerComponent
  ]
})
export class CoreContractSeekerModule { }
