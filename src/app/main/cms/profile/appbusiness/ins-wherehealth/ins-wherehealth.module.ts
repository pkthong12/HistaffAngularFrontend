import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsWherehealthComponent } from './ins-wherehealth.component';
import { InsWhereHealThRoutingModule } from './InsWhereHealTh.routing';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { InsWherehealthEditComponent } from './ins-wherehealth-edit/ins-wherehealth-edit.component';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';

@NgModule({
  declarations: [InsWherehealthComponent, InsWherehealthEditComponent],
  imports: [
    CommonModule,
    InsWhereHealThRoutingModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    CoreStatusStickerModule
  ],
})
export class InsWherehealthModule {}
