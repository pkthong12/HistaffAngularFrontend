import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyRoutingModule } from './family-routing.module';
import { FamilyComponent } from './family.component';

import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    FamilyComponent
  ],
  imports: [
    CommonModule,
    FamilyRoutingModule,
    AppPipesModule
  ]
})
export class FamilyModule { }
