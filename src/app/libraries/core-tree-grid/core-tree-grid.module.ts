import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreTreeGridComponent } from './core-tree-grid/core-tree-grid.component';

import { ReactiveFormsModule } from '@angular/forms';

import { CoreControlModule } from '../core-control/core-control.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { PipesModule } from '../pipes/pipes.module';
import { CoreButtonGroupVnsModule } from '../core-button-group-vns/core-button-group-vns.module';
import { ThreedotsModule } from '../threedots/threedots.module';

@NgModule({
  declarations: [
    CoreTreeGridComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreControlModule,
    AppPipesModule,
    PipesModule,
    CoreButtonGroupVnsModule,
    ThreedotsModule,
  ],
  exports: [CoreTreeGridComponent]
})
export class CoreTreeGridModule { }
