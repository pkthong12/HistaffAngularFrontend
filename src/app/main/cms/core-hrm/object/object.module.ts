import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectRoutingModule } from './object-routing.module';
import { ObjectComponent } from './object/object.component';
import { ObjectEditComponent } from './object-edit/object-edit.component';

import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';

@NgModule({
  declarations: [
    ObjectComponent,
    ObjectEditComponent
  ],
  imports: [
    CommonModule,
    ObjectRoutingModule,
    CorePageListModule,
    CorePageEditModule
  ]
})
export class ObjectModule { }
