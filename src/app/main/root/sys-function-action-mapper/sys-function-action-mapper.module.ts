import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SysFunctionActionMapperRoutingModule } from './sys-function-action-mapper-routing.module';
import { SysFunctionActionMapperComponent } from './sys-function-action-mapper.component';

import { CoreIosSwitcherModule } from 'src/app/libraries/core-ios-switcher/core-ios-switcher.module';
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';

@NgModule({
  declarations: [
    SysFunctionActionMapperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SysFunctionActionMapperRoutingModule,
    CoreIosSwitcherModule,
    AppPipesModule,
    CoreButtonGroupVnsModule,
    FullscreenModalLoaderModule,
  ]
})
export class SysFunctionActionMapperModule { }
