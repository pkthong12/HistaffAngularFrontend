import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreOrgchartflexComponent } from './core-orgchartflex/core-orgchartflex.component';



@NgModule({
  declarations: [
    CoreOrgchartflexComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CoreOrgchartflexComponent]
})
export class CoreOrgchartflexModule { }
