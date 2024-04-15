import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CommonModule } from '@angular/common';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { ListSalaryComponent } from './listsalary.component';
import { ListSalaryEditComponent } from './listsalary-edit/listsalary-edit.component';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';
const routes: Routes = [
  {
    path: '',
    component: ListSalaryComponent,
    children: [
      {
        path: ':id',
        component: ListSalaryEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [ListSalaryComponent, ListSalaryEditComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    CoreStatusStickerModule],
})
export class ListSalaryModule { }
