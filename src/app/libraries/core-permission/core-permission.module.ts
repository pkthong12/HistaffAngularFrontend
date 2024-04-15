import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CorePermissionComponent } from './core-permission/core-permission.component';

import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { CorePageListContentModule } from "src/app/libraries/core-page-list-content/core-page-list-content.module";
import { CoreTabsModule } from "src/app/libraries/core-tabs/core-tabs.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { CoreCompositionModule } from "src/app/libraries/core-composition/core-composition.module";
import { CoreListLazyModule } from "src/app/libraries/core-list-lazy/core-list-lazy.module";
import { DirectiveModule } from "src/app/directives/directive.module";
import { AppPipesModule } from "src/app/app-pipes/app-pipes.module";
import { CoreTagsModule } from "src/app/libraries/core-tags/core-tags.module";
import { CorePermissionActionsModule } from "src/app/libraries/core-permission-actions/core-permission-actions.module";
import { CoreConfirmDialogModule } from '../core-confirm-dialog/core-confirm-dialog.module';
import { CoreApiProgressModule } from '../core-api-progress/core-api-progress.module';

@NgModule({
  declarations: [
    CorePermissionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LibrariesModule,
    CoreOrgTreeModule,
    CorePageListContentModule,
    CoreTabsModule,
    CorePageHeaderModule,
    CoreCompositionModule,
    CoreListLazyModule,
    DirectiveModule,
    AppPipesModule,
    CoreTagsModule,
    CorePermissionActionsModule,
    CoreConfirmDialogModule,
    CoreApiProgressModule
  ],
  exports: [CorePermissionComponent]
})
export class CorePermissionModule { }
