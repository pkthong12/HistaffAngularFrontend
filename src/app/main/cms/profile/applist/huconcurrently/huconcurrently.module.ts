import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HuconcurrentlyComponent } from './huconcurrently.component';
import { HuConcurrentlyRoutingModule } from './huconcurrently.routing';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';



@NgModule({
  declarations: [
    HuconcurrentlyComponent
  ],
  imports: [
    CommonModule,
    HuConcurrentlyRoutingModule,
    CoreOrgTreeModule,
    TlaSharedModule,
    LibrariesModule,
    CorePageListModule 
  ]
})
export class HuconcurrentlyModule { }
