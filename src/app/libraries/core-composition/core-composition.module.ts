import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreCompositionComponent } from './core-composition/core-composition.component';
import { ThreedotsModule } from '../threedots/threedots.module';

import { CoreReducerIconModule } from '../core-reducer-icon/core-reducer-icon.module';

@NgModule({
  declarations: [
    CoreCompositionComponent
  ],
  imports: [
    CommonModule,
    ThreedotsModule,
    CoreReducerIconModule
  ],
  exports: [
    CoreCompositionComponent
  ]
})
export class CoreCompositionModule { }
