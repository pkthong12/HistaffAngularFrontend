import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SymbolComponent } from './symbol.component';
import { CoreService } from 'src/app/services/core.service';
import { SymbolEditComponent } from './edit/symbol-edit.component';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';

const routes: Routes = [
  {
    path: '',
    component: SymbolComponent,
    children: [
      {
        path: ':id',
        component: SymbolEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  // {
  //   path: ':id',
  //   component: SymbolEditComponent,
  //   canDeactivate: [CanDeactivateGuard],
  // },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule,
    CorePageEditModule,
    CorePageListModule,
    CoreCheckboxModule,
    CoreStatusStickerModule
  ],
  declarations: [SymbolComponent, SymbolEditComponent],
  providers: [CoreService],
})
export class SymbolModule {}
