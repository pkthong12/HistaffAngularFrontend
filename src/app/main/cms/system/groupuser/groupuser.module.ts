import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";

import { GroupUserComponent } from './groupuser.component';
import { CoreService } from 'src/app/services/core.service';
import { GroupUserEditComponent } from './edit/groupuser-edit.component';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CommonModule } from '@angular/common';
import { GroupUserRoutingModule } from './groupuser-routing.module';
import { GroupuserCloneComponent } from './clone/groupuser-clone.component';

@NgModule({
  imports: [
    CommonModule,
    GroupUserRoutingModule,
    TlaSharedModule,
    CorePageListModule,
    CorePageHeaderModule,
    CorePageEditModule,
  ],
  declarations: [GroupUserComponent, GroupUserEditComponent, GroupuserCloneComponent],
  providers: [CoreService]
})
export class GroupUserModule {}
