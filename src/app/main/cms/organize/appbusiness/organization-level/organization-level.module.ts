import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationLevelComponent } from './organization-level/organization-level.component';
import { OrganizationLevelEditComponent } from './organization-level-edit/organization-level-edit.component';
import { OrganizationLevelRoutingModule } from './organization-level-routing.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';



@NgModule({
  declarations: [
    OrganizationLevelComponent,
    OrganizationLevelEditComponent,
    
  ],
  imports: [
    CommonModule,
    OrganizationLevelRoutingModule,
    CorePageEditModule,
    CorePageListModule,
    CoreStatusStickerModule
  ]
})
export class OrganizationLevelModule { }
