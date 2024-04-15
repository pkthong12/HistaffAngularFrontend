import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';

import { DisciplineRoutingModule } from './discipline-routing.module';
import { DisciplineComponent } from './discipline/discipline.component';
import { DisciplineEditComponent } from './discipline-edit/discipline-edit.component';
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { TlaSharedModule } from "src/app/components/shared.module";
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';

@NgModule({
  declarations: [
    DisciplineComponent,
    DisciplineEditComponent
  ],
  imports: [
    CommonModule,
    DisciplineRoutingModule,
    LibrariesModule,
    CorePageListModule,
    CoreOrgTreeModule,
    CorePageEditModule,
    TlaSharedModule,
    CoreStatusStickerModule
  ]
})
export class DisciplineModule { }
