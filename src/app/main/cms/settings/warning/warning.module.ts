import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WarningRoutingModule } from './warning-routing.module';
import { WarningEditComponent } from './warning-edit/warning-edit.component';

import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    WarningEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WarningRoutingModule,
    CoreCheckboxModule,
    CorePageHeaderModule,
    CoreButtonGroupVnsModule,
    AppPipesModule
  ]
})
export class WarningModule { }
