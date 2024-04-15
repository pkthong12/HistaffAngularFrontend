import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HufamilyEditComponent } from './hufamily-edit.component';
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { TlaSharedModule } from 'src/app/components/shared.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { HuFamilyEditRoutingModule } from './hufamily-edit.routing';
import { CoreFormControlSeekerModule } from 'src/app/libraries/core-form-control-seeker/core-form-control-seeker.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { FormsModule } from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CorePaginationModule } from 'src/app/libraries/core-pagination/core-pagination.module';
import { CorePaginationFullModule } from 'src/app/libraries/core-pagination-full/core-pagination-full.module';
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';
import { CoreConfirmDialogModule } from 'src/app/libraries/core-confirm-dialog/core-confirm-dialog.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { HufamilyEditDetailComponent } from './hufamily-edit-detail/hufamily-edit-detail.component';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';



@NgModule({
  declarations: [
    HufamilyEditComponent,
    HufamilyEditDetailComponent
  ],
  imports: [
    CommonModule,
    TlaSharedModule,
    AppPipesModule,
    FormsModule,
    CoreCheckboxModule,
    CorePageListModule,
    CorePageEditModule,
    HuFamilyEditRoutingModule,
    CoreOrgTreeModule,
  ],
  providers: [CoreService]
})
export class HufamilyEditModule { }
