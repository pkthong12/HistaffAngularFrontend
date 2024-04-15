import { OtherlistEditComponent } from './edit/otherlist-edit.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OtherListComponent } from './otherlist.component';
import { CoreService } from 'src/app/services/core.service';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CoreListModule } from 'src/app/libraries/core-list/core-list.module';
const routes: Routes = [
  {
    path: '',
    component: OtherListComponent,
    children: [
      {
        path: ':id',
        component: OtherlistEditComponent,
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
    CoreListModule,
  ],
  exports: [RouterModule],
  declarations: [OtherListComponent, OtherlistEditComponent],
  providers: [CoreService],
})
export class OtherlistModule {}
