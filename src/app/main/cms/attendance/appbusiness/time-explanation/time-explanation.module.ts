import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreService } from 'src/app/services/core.service';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { TimeExplanationComponent } from './time-explanation.component';
import { CoreDropdownModule } from 'src/app/libraries/core-dropdown/core-dropdown.module';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { CoreHeaderParamsModule } from 'src/app/libraries/core-header-params/core-header-params.module';

const routes: Routes = [
  {
    path: '',
    component: TimeExplanationComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule,
    AccordionModule,
    LibrariesModule,
    CorePageListModule,
    CorePageHeaderModule,
    CoreDropdownModule,
    CoreOrgTreeModule,
    CoreHeaderParamsModule,
  ],
  declarations: [TimeExplanationComponent],
  providers: [CoreService],
})
export class TimeExplanationModule {}
