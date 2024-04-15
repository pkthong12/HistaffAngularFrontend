import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreCheckboxComponent } from './core-checkbox/core-checkbox.component';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [
    CoreCheckboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppPipesModule,
    TooltipModule,
  ],
  exports: [
    CoreCheckboxComponent,
  ]
})
export class CoreCheckboxModule { }
