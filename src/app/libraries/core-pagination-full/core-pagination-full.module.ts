import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorePaginationFullComponent } from './core-pagination-full/core-pagination-full.component';
import { FormsModule } from '@angular/forms';

import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    CorePaginationFullComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppPipesModule
  ],
  exports: [
    CorePaginationFullComponent
  ]
})
export class CorePaginationFullModule { }
