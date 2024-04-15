import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreDropdownComponent } from './core-dropdown/core-dropdown.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreScrollModule } from '../core-scroll/core-scroll.module';
import { ThreedotsModule } from '../threedots/threedots.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    CoreDropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreScrollModule,
    ThreedotsModule,
    TooltipModule,
    AppPipesModule,
  ],
  exports: [
    CoreDropdownComponent
  ]
})
export class CoreDropdownModule { }
