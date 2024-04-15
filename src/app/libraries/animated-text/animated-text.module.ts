import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedTextComponent } from './animated-text/animated-text.component';



@NgModule({
  declarations: [
    AnimatedTextComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AnimatedTextComponent
  ]
})
export class AnimatedTextModule { }
