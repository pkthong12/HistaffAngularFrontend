import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreAccordionComponent } from './core-accordion/core-accordion.component';

import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CoreLineModule } from '../core-line/core-line.module';
import { TooltipModule } from '../tooltip/tooltip.module';
@NgModule({
  declarations: [
    CoreAccordionComponent
  ],
  imports: [
    CommonModule,
    AppPipesModule,
    CoreLineModule,
    TooltipModule,
  ],
  exports: [CoreAccordionComponent]
})
export class CoreAccordionModule { }
