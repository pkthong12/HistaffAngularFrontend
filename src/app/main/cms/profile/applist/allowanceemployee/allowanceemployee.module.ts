import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AllowanceEmployeeComponent } from "./allowanceemployee.component";
import { CoreService } from "src/app/services/core.service";
import { AllowanceEmployeeEditComponent } from "./edit/allowanceemployee-edit.component";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { TlaSharedModule } from "src/app/components/shared.module";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { AllowanceemployeeImportComponent } from './allowanceemployee-import/allowanceemployee-import.component';
import { AppPipesModule } from "src/app/app-pipes/app-pipes.module";
import { FullscreenModalLoaderModule } from "src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module";
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";

const routes: Routes = [
  {
    path: "",
    component: AllowanceEmployeeComponent,
    children: [
      {
        path: "allowance-import",
        outlet: "corePageListAux",
        component: AllowanceemployeeImportComponent
      },
      {
        path: ":id",
        component: AllowanceEmployeeEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      },

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes), TlaSharedModule, LibrariesModule,
    CoreOrgTreeModule,
    CorePageListModule,
    CorePageEditModule,
    AppPipesModule,
    FullscreenModalLoaderModule,
    CoreButtonGroupVnsModule,
  ],
  declarations: [AllowanceEmployeeComponent, AllowanceEmployeeEditComponent, AllowanceemployeeImportComponent],
  providers: [CoreService],
})
export class AllowanceEmployeeModule {}
