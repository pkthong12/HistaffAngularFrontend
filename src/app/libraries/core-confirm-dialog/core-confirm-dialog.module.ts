import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreConfirmDialogComponent } from './core-confirm-dialog/core-confirm-dialog.component';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { ConfirmDialogStateComponent } from './confirm-dialog-state/confirm-dialog-state.component';

import { FormsModule } from '@angular/forms';
import { CorePageHeaderModule } from '../core-page-header/core-page-header.module';

@NgModule({
  declarations: [
    CoreConfirmDialogComponent,
    ConfirmDialogStateComponent
  ],
  imports: [
    CommonModule,
    AppPipesModule,
    FormsModule,
    CorePageHeaderModule
  ],
  exports: [
    CoreConfirmDialogComponent,
    ConfirmDialogStateComponent,
  ]
})
export class CoreConfirmDialogModule { }
