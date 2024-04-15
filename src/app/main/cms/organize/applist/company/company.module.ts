import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CommonModule } from '@angular/common';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CompanyComponent } from './company.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';
const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      {
        path: ':id',
        component: CompanyEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [CompanyComponent, CompanyEditComponent],
  imports: [RouterModule.forChild(routes), 
    CommonModule,
    LibrariesModule,
    CorePageListModule, 
    CorePageEditModule, 
    CoreStatusStickerModule],
})
export class CompanyModule { }
