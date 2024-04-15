import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';

import { TimeTypeRoutingModule } from './timetype-routing.module';
import { TimeTypeComponent } from './timetype/timetype.component';
import { TimeTypeEditComponent } from './timetype-edit/timetype-edit.component';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';


@NgModule({
  declarations: [
    TimeTypeComponent,
    TimeTypeEditComponent
  ],
  imports: [
    CommonModule,
    TimeTypeRoutingModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    CoreStatusStickerModule
  ]
})
export class TimeTypeModule { }
