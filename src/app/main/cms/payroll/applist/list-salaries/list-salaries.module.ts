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
import { CoreDropdownModule } from 'src/app/libraries/core-dropdown/core-dropdown.module';
import { ListSalariesComponent } from './list-salaries.component';
import { ListSalariesEditComponent } from './list-salaries-edit/list-salaries-edit.component';
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';

const routes: Routes = [
  {
    path: '',
    component: ListSalariesComponent,
  },
  {
    path: ':id',
    component: ListSalariesEditComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule,
    AccordionModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    // CorePageHeaderModule,
    CoreDropdownModule,
    CoreCheckboxModule,
    CoreButtonGroupVnsModule,
    CoreStatusStickerModule

  ],
  declarations: [ListSalariesComponent, ListSalariesEditComponent],
  providers: [CoreService],
})
export class ListSalariesModule {}
