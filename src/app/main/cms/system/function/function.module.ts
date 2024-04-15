import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { FunctionComponent } from './function.component';
import { FunctionEditComponent } from './edit/function-edit.component';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CommonModule } from '@angular/common';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { FunctionRoutingModule } from './function-routing.module';
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';

const routes: Routes = [
  {
    path: '',
    component: FunctionComponent
  },
  {
    path: ':id',
    component: FunctionEditComponent 
  }
];

@NgModule({
  imports: [
    CommonModule,
    FunctionRoutingModule,
    TlaSharedModule,
    CorePageListModule,
    CorePageHeaderModule,
    CorePageEditModule,
    CoreCheckboxModule,
  ],
  declarations: [FunctionComponent,FunctionEditComponent],
  providers: [CoreService]
})
export class FunctionModule {}
