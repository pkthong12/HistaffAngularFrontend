import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreGridBufferComponent } from './core-grid-buffer/core-grid-buffer.component';

import { CoreControlNoGridBufferModule } from '../core-control-no-grid-buffer/core-control-no-grid-buffer.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CoreTableModule } from '../core-table/core-table.module';

@NgModule({
  declarations: [
    CoreGridBufferComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreControlNoGridBufferModule,
    AppPipesModule,
    CoreTableModule
  ],
  exports: [ CoreGridBufferComponent ]
})
export class CoreGridBufferModule { }
