import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreTableModule } from '../core-table/core-table.module';
import { CorePaginationModule } from '../core-pagination/core-pagination.module';
import { CorePageHeaderModule } from '../core-page-header/core-page-header.module';

import { CorePageListComponent } from './core-page-list.component';
import { CoreCompositionModule } from '../core-composition/core-composition.module';
import { CorePaginationFullModule } from '../core-pagination-full/core-pagination-full.module';
import { CoreApiProgressModule } from '../core-api-progress/core-api-progress.module';
import { CoreCommonParamKitModule } from '../core-common-param-kit/core-common-param-kit.module';

import { FullscreenModalLoaderModule } from '../fullscreen-modal-loader/fullscreen-modal-loader.module';

@NgModule({
  declarations: [
    CorePageListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreTableModule,
    CorePaginationModule,
    CorePaginationFullModule,
    CorePageHeaderModule,
    CoreCompositionModule,
    CoreCommonParamKitModule,
    CoreApiProgressModule,
    FullscreenModalLoaderModule
  ],
  exports: [
    CorePageListComponent,
  ]
})
export class CorePageListModule { }
