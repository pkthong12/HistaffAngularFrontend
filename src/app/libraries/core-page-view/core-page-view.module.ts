import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorePageViewComponent } from './core-page-view/core-page-view.component';

import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CoreLoadingSurfaceModule } from '../core-loading-surface/core-loading-surface.module';
import { PipesModule } from '../pipes/pipes.module';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [
    CorePageViewComponent
  ],
  imports: [
    CommonModule,
    AppPipesModule,
    PipesModule,
    CoreLoadingSurfaceModule,
    TooltipModule
  ],
  exports: [
    CorePageViewComponent
  ]
})
export class CorePageViewModule { }
