import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreButtonGroupVnsComponent } from './core-button-group-vns/core-button-group-vns.component';
import { CoreButtonVnsComponent } from './core-button-vns/core-button-vns.component';

import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [
    CoreButtonGroupVnsComponent,
    CoreButtonVnsComponent
  ],
  imports: [
    CommonModule,
    AppPipesModule,
    TooltipModule,
  ],
  exports: [
    CoreButtonGroupVnsComponent,
    CoreButtonVnsComponent,
  ]
})
export class CoreButtonGroupVnsModule { }
