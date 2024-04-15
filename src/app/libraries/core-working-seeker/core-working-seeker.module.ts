import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreWorkingSeekerComponent } from './core-working-seeker/core-working-seeker.component';

import { FormsModule } from '@angular/forms';
import { CoreOrgTreeModule } from '../core-org-tree/core-org-tree.module';
import { CorePageListModule } from '../core-page-list/core-page-list.module';



@NgModule({
  declarations: [
    CoreWorkingSeekerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreOrgTreeModule,
    CorePageListModule,    
  ],
  exports: [
    CoreWorkingSeekerComponent,
  ]
})
export class CoreWorkingSeekerModule { }
