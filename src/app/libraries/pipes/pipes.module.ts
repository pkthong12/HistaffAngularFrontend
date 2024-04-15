import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableCellPipe } from './table-cell.pipe';
import { NormalizeHumanNamePipe } from './normalize-human-name.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    TableCellPipe,
    NormalizeHumanNamePipe,
    FilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TableCellPipe,
    NormalizeHumanNamePipe,
    FilterPipe
  ]
})
export class PipesModule { }
