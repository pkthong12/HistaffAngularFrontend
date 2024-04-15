import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtotherlistComponent } from './atotherlist.component';
import { AtotherlistEditComponent } from './atotherlist-edit/atotherlist-edit.component';
import { AtOtherListRoutingModule } from './atotherlist.routing';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { CoreService } from 'src/app/services/core.service';
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';



@NgModule({
  declarations: [
    AtotherlistComponent,
    AtotherlistEditComponent
  ],
  imports: [
    CommonModule,
    AtOtherListRoutingModule,
    CorePageEditModule,
    TlaSharedModule,
    CorePageListModule,
    CoreCheckboxModule,
    CoreStatusStickerModule
  ],
  providers: [CoreService],
  
})
export class AtotherlistModule { }
