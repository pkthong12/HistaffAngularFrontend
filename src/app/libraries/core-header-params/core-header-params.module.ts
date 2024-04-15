import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreHeaderParamsComponent } from './core-header-params/core-header-params.component';

import { CoreParamControlModule } from '../core-param-control/core-param-control.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    CoreHeaderParamsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreParamControlModule,
    AppPipesModule
  ],
  exports: [CoreHeaderParamsComponent]
})
export class CoreHeaderParamsModule { }
