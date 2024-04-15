import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TlaSharedModule } from 'src/app/components/shared.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CoreListModule } from 'src/app/libraries/core-list/core-list.module';
import { PhaseAdvanceComponent } from './phaseadvance.component';
import { PhaseAdvanceEditComponent } from './edit/phaseadvance-edit.component';
import { AppService } from 'src/app/services/app.service';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';

const routes: Routes = [
  {
    path: "",
    component: PhaseAdvanceComponent
  },
  {
    path: ":id",
    component: PhaseAdvanceEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule,
    CorePageListModule,
    CoreListModule,
    LibrariesModule,
    CorePageHeaderModule,
    CoreOrgTreeModule,
    CorePageEditModule,
    CoreStatusStickerModule
  ],
  declarations: [PhaseAdvanceComponent, PhaseAdvanceEditComponent],
  providers: [AppService],
})
export class PhaseAdvanceModule {}
