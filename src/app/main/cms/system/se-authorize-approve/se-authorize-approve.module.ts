import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { NgModule } from '@angular/core';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CoreService } from 'src/app/services/core.service';
import { SeAuthorizeApproveComponent } from './se-authorize-approve.component';
import { SeAuthorizeApproveEditComponent } from './edit/se-authorize-approve-edit.component';
import { AppService } from 'src/app/services/app.service';
import { CoreListModule } from 'src/app/libraries/core-list/core-list.module';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';

const routes: Routes = [
  {
    path: '',
    component: SeAuthorizeApproveComponent,
    children: [
      {
        path: ':id',
        component: SeAuthorizeApproveEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
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
  ],
  declarations: [SeAuthorizeApproveComponent, SeAuthorizeApproveEditComponent],
  providers: [AppService],
})
export class SeAuthorizeApproveModule {}
