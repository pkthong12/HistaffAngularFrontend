import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalaryElementComponent } from './salaryelement.component';
import { CoreService } from 'src/app/services/core.service';
import { SalaryElementEditComponent } from './edit/salaryelement-edit.component';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: SalaryElementComponent,
    children: [
      {
        path: ':id',
        component: SalaryElementEditComponent,
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
    CorePageEditModule,
    CorePageHeaderModule,
  ],
  declarations: [SalaryElementComponent, SalaryElementEditComponent],
  providers: [CoreService],
})
export class SalaryElementModule {}
