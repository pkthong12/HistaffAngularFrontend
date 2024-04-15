import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { ListFundSourceComponent } from './list-fund-source.component';
import { ListFundSourceEditComponent } from './edit/list-fund-source-edit.component';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';

const routes: Routes = [
  {
    path: '',
    component: ListFundSourceComponent,
    children: [
      {
        path: ':id',
        component: ListFundSourceEditComponent,
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
    CoreStatusStickerModule
  ],
  declarations: [ListFundSourceComponent, ListFundSourceEditComponent],
  providers: [CoreService],
})
export class ListFundSourceModule {}
