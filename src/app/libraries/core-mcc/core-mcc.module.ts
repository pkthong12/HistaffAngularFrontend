import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreMccComponent } from './core-mcc/core-mcc.component';

import { CorePageListModule } from '../core-page-list/core-page-list.module';
import { ThreedotsModule } from '../threedots/threedots.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    CoreMccComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CorePageListModule,
    ThreedotsModule,
    TooltipModule,
    AppPipesModule,
  ],
  exports: [CoreMccComponent]
})
export class CoreMccModule { }
