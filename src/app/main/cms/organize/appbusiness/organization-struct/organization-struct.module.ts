import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrganizationStructRoutingModule } from './organization-struct-routing.module';
import { OrganizationStructComponent } from './organization-struct/organization-struct.component';

import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CoreCompositionModule } from 'src/app/libraries/core-composition/core-composition.module';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { CorePageViewModule } from 'src/app/libraries/core-page-view/core-page-view.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { OrganizationStructEditComponent } from './organization-struct-edit/organization-struct-edit.component';
import { OrganizationStructViewComponent } from './organization-struct-view/organization-struct-view.component';
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';

@NgModule({
  declarations: [
    OrganizationStructComponent,
    OrganizationStructEditComponent,
    OrganizationStructViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OrganizationStructRoutingModule,
    CorePageHeaderModule,
    CoreCompositionModule,
    CoreOrgTreeModule,
    CorePageViewModule,
    CorePageEditModule,
    FullscreenModalLoaderModule,
  ]
})
export class OrganizationStructModule { }
