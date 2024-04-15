import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreService } from 'src/app/services/core.service';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { ExcelExportService } from '@syncfusion/ej2-angular-grids';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { InsRegimesComponent } from './ins-regimes.component';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { InsRegimesEditComponent } from './edit/ins-regimes-edit.component';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';
const routes: Routes = [
  {
    path: '',
    component: InsRegimesComponent,
    children: [
      {
        path: ':id',
        component: InsRegimesEditComponent,
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
  declarations: [InsRegimesComponent, InsRegimesEditComponent],
  providers: [CoreService],
})
export class InsRegimesModule {}
