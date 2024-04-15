import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorePaginationComponent } from './core-pagination/core-pagination.component';



@NgModule({
  declarations: [
    CorePaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CorePaginationComponent
  ]
})
export class CorePaginationModule { }
