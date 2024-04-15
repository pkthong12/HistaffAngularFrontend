import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InsRegimesMngComponent } from './insregimes-mng.component';
import { CoreService } from 'src/app/services/core.service';
import { InsRegimesMngEditComponent } from './edit/insregimes-mng-edit.component';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreAccordionModule } from 'src/app/libraries/core-accordion/core-accordion.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { CoreControlModule } from 'src/app/libraries/core-control/core-control.module';
import { CoreFileUploaderModule } from 'src/app/libraries/core-file-uploader/core-file-uploader.module';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';

const routes: Routes = [
  {
    path: '',
    component: InsRegimesMngComponent,
  },
  {
    path: ':id',
    component: InsRegimesMngEditComponent,
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
    CoreAccordionModule,
    CoreOrgTreeModule,
    FormsModule,
    ReactiveFormsModule,
    CoreFileUploaderModule,
    CoreControlModule,
    CoreButtonGroupVnsModule,
    CoreStatusStickerModule
  ],
  declarations: [InsRegimesMngComponent, InsRegimesMngEditComponent],
  providers: [CoreService],
})
export class InsRegimesMngModule {}
