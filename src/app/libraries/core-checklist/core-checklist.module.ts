import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreChecklistComponent } from './core-checklist/core-checklist.component';
import { CoreCheckboxModule } from '../core-checkbox/core-checkbox.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from '../tooltip/tooltip.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    CoreChecklistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
    ReactiveFormsModule,
    CoreCheckboxModule,
    AppPipesModule,
  ],
  exports: [
    CoreChecklistComponent
  ]

})
export class CoreChecklistModule { }
