import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreFormComponent } from './core-form/core-form.component';
//import { CoreControlComponent } from './core-form/core-control.component';

import { CoreControlModule } from '../core-control/core-control.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { PipesModule } from '../pipes/pipes.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreButtonGroupVnsModule } from '../core-button-group-vns/core-button-group-vns.module';

@NgModule({
  declarations: [
    CoreFormComponent,
    //CoreControlComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreControlModule,
    AppPipesModule,
    PipesModule,
    CoreButtonGroupVnsModule
  ],
  exports: [
    CoreFormComponent
  ]
})
export class CoreFormModule { }
