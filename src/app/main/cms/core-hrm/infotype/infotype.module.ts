import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfotypeRoutingModule } from './infotype-routing.module';
import { InfotypeComponent } from './infotype/infotype.component';
import { InfotypeEditComponent } from './infotype-edit/infotype-edit.component';

import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';

@NgModule({
  declarations: [
    InfotypeComponent,
    InfotypeEditComponent
  ],
  imports: [
    CommonModule,
    InfotypeRoutingModule,
    CorePageListModule,
    CorePageEditModule
  ]
})
export class InfotypeModule { }
