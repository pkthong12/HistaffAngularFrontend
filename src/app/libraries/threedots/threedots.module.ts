import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreedotsComponent } from './threedots.component';

@NgModule({
  declarations: [
    ThreedotsComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ThreedotsComponent,
  ]
})
export class ThreedotsModule { }
