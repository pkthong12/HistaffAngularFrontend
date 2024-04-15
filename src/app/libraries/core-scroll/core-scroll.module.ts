import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreScrollComponent } from './core-scroll/core-scroll.component';



@NgModule({
  declarations: [
    CoreScrollComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CoreScrollComponent]
})
export class CoreScrollModule { }
