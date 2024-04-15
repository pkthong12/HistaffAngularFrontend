import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalaryPeriodComponent } from './salaryperiod.component';
import { CoreService } from 'src/app/services/core.service';
import { SalaryPeriodEditComponent } from './edit/salaryperiod-edit.component';
import { TlaSharedModule } from 'src/app/components/shared.module';

import { LibrariesModule } from 'src/app/libraries/libraries.module';

import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { CommonModule } from '@angular/common';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';

const routes: Routes = [
  {
    path: '',
    component: SalaryPeriodComponent,
  },
  {
    path: ':id',
    component: SalaryPeriodEditComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule,
    LibrariesModule,
    CoreOrgTreeModule,
    CorePageListModule,
    CommonModule,
    CorePageEditModule,
    CoreStatusStickerModule
  ],
  exports: [RouterModule],
  declarations: [SalaryPeriodComponent, SalaryPeriodEditComponent],
})
export class SalaryPeriodModule {}
