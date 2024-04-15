import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreButtonGroupComponent } from './core-button-group/core-button-group.component';
import { CoreButtonComponent } from './core-button/core-button.component';

import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    CoreButtonGroupComponent,
    CoreButtonComponent
  ],
  imports: [
    CommonModule,
    AppPipesModule
  ],
  exports: [
    CoreButtonGroupComponent,
  ]
})
export class CoreButtonGroupModule { }
