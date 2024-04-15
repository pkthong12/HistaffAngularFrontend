import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreScrollLazyComponent } from './core-scroll-lazy/core-scroll-lazy.component';



@NgModule({
  declarations: [
    CoreScrollLazyComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CoreScrollLazyComponent]
})
export class CoreScrollLazyModule { }
