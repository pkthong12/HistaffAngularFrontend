import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorePageHeaderComponent } from './core-page-header/core-page-header.component';

import { CoreButtonGroupModule } from '../core-button-group/core-button-group.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CoreButtonGroupVnsModule } from '../core-button-group-vns/core-button-group-vns.module';

@NgModule({
  declarations: [
    CorePageHeaderComponent
  ],
  imports: [
    CommonModule,
    CoreButtonGroupModule,
    AppPipesModule,
    CoreButtonGroupVnsModule
  ],
  exports: [
    CorePageHeaderComponent
  ]
})
export class CorePageHeaderModule { }
