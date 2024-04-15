import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrplanComponent } from './trplan.component';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { TrPlanRoutingModule } from './trplan.routing';
import { TrplanEditComponent } from './trplan-edit/trplan-edit.component';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';

@NgModule({
  declarations: [TrplanComponent, TrplanEditComponent],
  imports: [
    CommonModule,
    LibrariesModule,
    TlaSharedModule,
    CorePageListModule,
    CoreOrgTreeModule,
    CorePageEditModule,
    TrPlanRoutingModule,
    FullscreenModalLoaderModule
  ],
})
export class TrplanModule {}
