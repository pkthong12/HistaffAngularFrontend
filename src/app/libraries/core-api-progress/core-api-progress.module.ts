import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreApiProgressComponent } from './core-api-progress/core-api-progress.component';



@NgModule({
  declarations: [
    CoreApiProgressComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CoreApiProgressComponent]
})
export class CoreApiProgressModule { }
