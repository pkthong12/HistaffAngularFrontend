import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreLoadingSurfaceComponent } from './core-loading-surface/core-loading-surface.component';

import { ThreedotsModule } from '../threedots/threedots.module';

@NgModule({
  declarations: [
    CoreLoadingSurfaceComponent
  ],
  imports: [
    CommonModule,
    ThreedotsModule
  ],
  exports: [CoreLoadingSurfaceComponent]
})
export class CoreLoadingSurfaceModule { }
