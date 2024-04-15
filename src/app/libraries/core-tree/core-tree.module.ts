import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreTreeComponent } from './core-tree/core-tree.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CoreTreeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CoreTreeComponent
  ]
})
export class CoreTreeModule { }
