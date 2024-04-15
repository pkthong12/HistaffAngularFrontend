import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorePositionSeekerComponent } from './core-position-seeker/core-position-seeker.component';
import { FormsModule } from '@angular/forms';
import { CoreOrgTreeModule } from '../core-org-tree/core-org-tree.module';
import { CorePageListModule } from '../core-page-list/core-page-list.module';
import { CoreStatusStickerModule } from '../core-status-sticker/core-status-sticker.module';



@NgModule({
  declarations: [
    CorePositionSeekerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreOrgTreeModule,
    CorePageListModule,
    CoreStatusStickerModule,
  ],
  exports:[
    CorePositionSeekerComponent
  ]
})
export class CorePositionSeekerModule { }
