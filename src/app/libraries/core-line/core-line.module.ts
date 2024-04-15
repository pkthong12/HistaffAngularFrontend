import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreLineComponent } from './core-line/core-line.component';



@NgModule({
  declarations: [
    CoreLineComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CoreLineComponent]
})
export class CoreLineModule { }
