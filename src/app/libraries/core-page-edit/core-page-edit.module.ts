import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreFormModule } from '../core-form/core-form.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { FullscreenModalLoaderModule } from '../fullscreen-modal-loader/fullscreen-modal-loader.module';
import { CorePageHeaderModule } from '../core-page-header/core-page-header.module';

import { CorePageEditComponent } from './core-page-edit.component';

@NgModule({
  declarations: [
    CorePageEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreFormModule,
    AppPipesModule,
    FullscreenModalLoaderModule,
    CorePageHeaderModule
  ],
  exports: [
    CorePageEditComponent
  ]
})
export class CorePageEditModule { }
