import { RouterModule, Routes } from "@angular/router";
import { GroupFunctionComponent } from "./groupfunction.component";
import { GroupFunctionEditComponent } from "./edit/groupfunction-edit.component";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { CorePageEditModule } from "src/app/libraries/core-page-edit/core-page-edit.module";
import { NgModule } from "@angular/core";
import { CoreService } from "src/app/services/core.service";
import { GroupFuntionRoutingModule } from "./groupfunction-routing.module";
import { TlaSharedModule } from "src/app/components/shared.module";



@NgModule({
  imports: [ 
    TlaSharedModule,
    LibrariesModule,
    CorePageListModule,
    CorePageHeaderModule,
    GroupFuntionRoutingModule,
    RouterModule,
    CorePageEditModule,],
  declarations: [GroupFunctionComponent, GroupFunctionEditComponent],
  providers: [CoreService],
})
export class GroupFunctionModule {}