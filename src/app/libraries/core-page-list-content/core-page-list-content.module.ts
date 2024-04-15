import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreTableModule } from '../core-table/core-table.module';
import { CorePaginationFullModule } from '../core-pagination-full/core-pagination-full.module';

import { CorePageListContentComponent } from './core-page-list-content/core-page-list-content.component';


@NgModule({
  declarations: [
    CorePageListContentComponent
  ],
  imports: [
    CommonModule,
    CoreTableModule,
    CorePaginationFullModule,
  ],
  exports: [
    CorePageListContentComponent
  ]
})
export class CorePageListContentModule { }
