import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreTableComponent } from './core-table.component';

import { CoreButtonGroupModule } from '../core-button-group/core-button-group.module';
import { ThreedotsModule } from '../threedots/threedots.module';
import { PipesModule } from '../pipes/pipes.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { CoreLoadingSurfaceModule } from '../core-loading-surface/core-loading-surface.module';
import { CoreButtonGroupVnsModule } from '../core-button-group-vns/core-button-group-vns.module';

@NgModule({
  declarations: [
    CoreTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreButtonGroupModule,
    ThreedotsModule,
    PipesModule,
    AppPipesModule,
    DirectiveModule,
    TooltipModule,
    CoreLoadingSurfaceModule,
    CoreButtonGroupVnsModule,
  ],
  exports: [
    CoreTableComponent,
  ]
})
export class CoreTableModule { }
