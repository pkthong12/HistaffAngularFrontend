import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EntilementComponent } from "./entilement.component";
import { CoreService } from "src/app/services/core.service";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { TlaSharedModule } from "src/app/components/shared.module";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CoreDropdownModule } from "src/app/libraries/core-dropdown/core-dropdown.module";
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";
import { CoreHeaderParamsModule } from "src/app/libraries/core-header-params/core-header-params.module";
import { FullscreenModalLoaderModule } from "src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module";
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CoreParamControlModule } from "src/app/libraries/core-param-control/core-param-control.module";
const routes: Routes = [
  {
    path: "",
    component: EntilementComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes), TlaSharedModule, LibrariesModule,
    CoreOrgTreeModule,
    CorePageListModule,
    CorePageEditModule,
    CoreButtonGroupVnsModule,
    CoreHeaderParamsModule,
    FullscreenModalLoaderModule,
    AppPipesModule,
    CoreParamControlModule,
    CoreDropdownModule],
  declarations: [EntilementComponent],
  providers: [CoreService],
})
export class EntitlementModule {}
