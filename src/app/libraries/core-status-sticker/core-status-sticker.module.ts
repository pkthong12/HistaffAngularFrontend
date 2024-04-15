import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreStatusStickerComponent } from './core-status-sticker/core-status-sticker.component';

import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [
    CoreStatusStickerComponent
  ],
  imports: [
    CommonModule,
    AppPipesModule,
    TooltipModule
  ],
  exports: [CoreStatusStickerComponent]
})
export class CoreStatusStickerModule { }
