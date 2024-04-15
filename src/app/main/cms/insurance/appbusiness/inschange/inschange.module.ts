import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreService } from 'src/app/services/core.service';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreAccordionModule } from 'src/app/libraries/core-accordion/core-accordion.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { CoreControlModule } from 'src/app/libraries/core-control/core-control.module';
import { InsChangeComponent } from './inschange.component';
import { InsChangeEditComponent } from './edit/inschange-edit.component';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';

const routes: Routes = [
  {
    path: '',
    component: InsChangeComponent,
  },
  {
    path: ':id',
    component: InsChangeEditComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListModule,
    TlaSharedModule,
    FormsModule,
    CoreButtonGroupVnsModule,
    CoreAccordionModule,
    ReactiveFormsModule,
    RouterModule,
    CoreOrgTreeModule,
    CorePageHeaderModule,
    CoreControlModule,
    CoreCheckboxModule,
  ],
  declarations: [InsChangeComponent, InsChangeEditComponent],
  providers: [CoreService],
})
export class InsChangeModule {}
