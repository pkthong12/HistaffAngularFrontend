import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorePermissionActionsComponent } from './core-permission-actions/core-permission-actions.component';

import { CorePageListContentModule } from '../core-page-list-content/core-page-list-content.module';
import { CoreTagsModule } from '../core-tags/core-tags.module';

@NgModule({
  declarations: [
    CorePermissionActionsComponent
  ],
  imports: [
    CommonModule,
    CorePageListContentModule,
    CoreTagsModule
  ],
  exports: [
    CorePermissionActionsComponent
  ]
})
export class CorePermissionActionsModule { }
