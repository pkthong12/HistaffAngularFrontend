import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreService } from 'src/app/services/core.service';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { InsGroupComponent } from './insgroup.component';
import { InsGroupEditComponent } from './edit/insgroup-edit.component';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';

const routes: Routes = [
  {
    path: '',
    component: InsGroupComponent,
    children: [
      {
        path: ':id',
        component: InsGroupEditComponent,
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
    AccordionModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    CorePageHeaderModule,
    CoreStatusStickerModule
  ],
  declarations: [InsGroupComponent, InsGroupEditComponent],
  providers: [CoreService],
})
export class InsGroupModule {}
