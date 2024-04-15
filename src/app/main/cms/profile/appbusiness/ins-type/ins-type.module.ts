import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsTypeComponent } from './ins-type.component';
import { InsTypeRoutingModule } from './ins-type.routing';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { InsTypeEditComponent } from './ins-type-edit/ins-type-edit.component';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';

@NgModule({
  declarations: [InsTypeComponent, InsTypeEditComponent],
  imports: [
    CommonModule,
    InsTypeRoutingModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    CoreStatusStickerModule
  ],
})
export class InsTypeModule {}
