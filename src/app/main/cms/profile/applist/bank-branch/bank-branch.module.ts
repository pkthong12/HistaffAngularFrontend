import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BankBranchComponent } from './bank-branch.component';
import { BankBranchEditComponent } from './bank-branch-edit/bank-branch-edit.component';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CoreService } from 'src/app/services/core.service';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';

const routes: Routes = [
  {
    path: '',
    component: BankBranchComponent,
    children: [
      {
        path: ":id",
        component: BankBranchEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
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
  declarations: [BankBranchComponent, BankBranchEditComponent],
  providers: [CoreService],
})
export class BankBranchModule {}
