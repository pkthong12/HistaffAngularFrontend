import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavigatorComponent } from './navigator/navigator.component';
import { ItemComponent } from './navigator/item.component';

import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { CoreLineModule } from '../core-line/core-line.module';
import { CoreLoadingSurfaceModule } from '../core-loading-surface/core-loading-surface.module';

@NgModule({
  declarations: [
    NavigatorComponent,
    ItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppPipesModule,
    DirectiveModule,
    TooltipModule,
    CoreLineModule,
    CoreLoadingSurfaceModule
  ],
  exports: [
    NavigatorComponent,
    ItemComponent
  ]
})
export class NavigatorModule { }
