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
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';
import { SeProcessApproveComponent } from './se-processapprove.component';
import { CoreFormModule } from 'src/app/libraries/core-form/core-form.module';

const routes: Routes = [
  {
    path: '',
    component: SeProcessApproveComponent,
  },
  // {
  //   path: ':id',
  //   component: SeProcessApproveEditComponent,
  //   canDeactivate: [CanDeactivateGuard],
  // },
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
    CoreFormModule,
    CoreListModule,
  ],
  declarations: [SeProcessApproveComponent],
  providers: [AppService],
})
export class SeProcessApproveModule {}
