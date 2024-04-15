import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysOtherlistRoutingModule } from './sys-otherlist-routing.module';
import { SysOtherlistComponent } from './sys-otherlist/sys-otherlist.component';
import { SysOtherlistEditComponent } from './sys-otherlist-edit/sys-otherlist-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CoreService } from 'src/app/services/core.service';
import { CoreListModule } from 'src/app/libraries/core-list/core-list.module';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';

const routes: Routes = [
  {
    path: '',
    component: SysOtherlistComponent,
    children: [
      {
        path: ":id",
        component: SysOtherlistEditComponent,
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
    CoreListModule,
    CoreStatusStickerModule

  ],
  declarations: [SysOtherlistComponent, SysOtherlistEditComponent],
  providers: [CoreService],
})
export class SysOtherlistModule { }
