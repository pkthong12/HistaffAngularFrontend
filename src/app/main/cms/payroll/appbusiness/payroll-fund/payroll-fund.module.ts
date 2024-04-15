import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreService } from 'src/app/services/core.service';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { PayrollFundComponent } from './payroll-fund.component';
import { PayrollFundEditComponent } from './payroll-fund-edit/payroll-fund-edit.component';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CoreListModule } from 'src/app/libraries/core-list/core-list.module';

const routes: Routes = [
  {
    path: '',
    component: PayrollFundComponent,
    children: [
      {
        path: ':id',
        component: PayrollFundEditComponent,
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
  declarations: [PayrollFundComponent, PayrollFundEditComponent],
  providers: [CoreService],
})
export class PayrollFundModule {}
