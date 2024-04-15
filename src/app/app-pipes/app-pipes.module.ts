import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './translate.pipe';
import { MapAvatarToServerPipe } from './map-avatar-to-server.pipe';

@NgModule({
  declarations: [
    TranslatePipe,
    MapAvatarToServerPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TranslatePipe,
    MapAvatarToServerPipe,
  ]
})
export class AppPipesModule { }
