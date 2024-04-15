import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimatedTextModule } from '../animated-text/animated-text.module';
import { ThreedotsModule } from '../threedots/threedots.module';

import { FullscreenModalLoaderComponent } from './fullscreen-modal-loader.component';

@NgModule({
  declarations: [
    FullscreenModalLoaderComponent,
  ],
  imports: [
    CommonModule,
    AnimatedTextModule,
    ThreedotsModule,
  ],
  exports: [
    FullscreenModalLoaderComponent,
  ]
})
export class FullscreenModalLoaderModule { }
