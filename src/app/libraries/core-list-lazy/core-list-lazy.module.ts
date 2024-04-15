import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreListLazyComponent } from './core-list-lazy/core-list-lazy.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreScrollLazyModule } from '../core-scroll-lazy/core-scroll-lazy.module';

import { ThreedotsModule } from '../threedots/threedots.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { PipesModule } from '../pipes/pipes.module';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [
    CoreListLazyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreScrollLazyModule,
    ThreedotsModule,
    AppPipesModule,
    PipesModule,
    TooltipModule
  ],
  exports: [
    CoreListLazyComponent
  ]
})
export class CoreListLazyModule { }
