import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysActionRoutingModule } from './sys-action-routing.module';
import { SysActionComponent } from './sys-action/sys-action.component';
import { SysActionEditComponent } from './sys-action-edit/sys-action-edit.component';
import { CoreService } from 'src/app/services/core.service';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SysActionComponent,
    SysActionEditComponent,
  ],
  imports: [
    CommonModule,
    SysActionRoutingModule,
    TlaSharedModule,
    LibrariesModule,
    CorePageListModule,
    CorePageHeaderModule,
    RouterModule,
    CorePageEditModule,
  ],
  providers: [CoreService],
})
export class SysActionModule { }
