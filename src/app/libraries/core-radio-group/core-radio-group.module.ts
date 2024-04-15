import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRadioGroupComponent } from './core-radio-group/core-radio-group.component';

import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    CoreRadioGroupComponent
  ],
  imports: [
    CommonModule,
    AppPipesModule
  ],
  exports: [
    CoreRadioGroupComponent
  ]
})
export class CoreRadioGroupModule { }
