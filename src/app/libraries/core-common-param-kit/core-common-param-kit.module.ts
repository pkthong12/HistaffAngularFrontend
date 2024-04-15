import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreCommonParamKitComponent } from './core-common-param-kit/core-common-param-kit.component';

import { FormsModule } from '@angular/forms';
import { CoreHeaderParamsModule } from "src/app/libraries/core-header-params/core-header-params.module";

@NgModule({
  declarations: [
    CoreCommonParamKitComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreHeaderParamsModule,
  ],
  exports: [CoreCommonParamKitComponent]
})
export class CoreCommonParamKitModule { }
