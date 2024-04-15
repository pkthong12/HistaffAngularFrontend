import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreListComponent } from './core-list/core-list.component';

import { FormsModule } from '@angular/forms';

import { ThreedotsModule } from '../threedots/threedots.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    CoreListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ThreedotsModule,
    AppPipesModule
  ],
  exports: [
    CoreListComponent
  ]
})
export class CoreListModule { }
