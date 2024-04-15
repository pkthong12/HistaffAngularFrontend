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
import { AppService } from 'src/app/services/app.service';
import { SeProcessEditComponent } from './edit/se-process-edit.component';
import { SeProcessComponent } from './se-process.component';
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';

const routes: Routes = [
  {
    path: '',
    component: SeProcessComponent,
  },
  {
    path: ':id',
    component: SeProcessEditComponent,
    canDeactivate: [CanDeactivateGuard],
  },
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
    CoreCheckboxModule,
  ],
  declarations: [SeProcessComponent, SeProcessEditComponent],
  providers: [AppService],
})
export class SeProcessModule {}
