import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreOrgTreeComponent } from './core-org-tree/core-org-tree.component';

import { FormsModule } from '@angular/forms';
import { CoreLoadingSurfaceModule } from '../core-loading-surface/core-loading-surface.module';
import { CoreCheckboxModule } from '../core-checkbox/core-checkbox.module';
import { CoreReducerIconModule } from '../core-reducer-icon/core-reducer-icon.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [
    CoreOrgTreeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreLoadingSurfaceModule,
    CoreCheckboxModule,
    CoreReducerIconModule,
    AppPipesModule,
    TooltipModule,
  ],
  exports: [
    CoreOrgTreeComponent
  ]
})
export class CoreOrgTreeModule { }
