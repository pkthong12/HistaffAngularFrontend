import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DeclaresunperComponent } from "./declaresunper.component";
import { CoreService } from "src/app/services/core.service";
import { SunPerEditComponent } from "./sun-per-edit/sun-per-edit.component";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { TlaSharedModule } from "src/app/components/shared.module";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CoreDropdownModule } from "src/app/libraries/core-dropdown/core-dropdown.module";
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';

const routes: Routes = [
  {
    path: "",
    component: DeclaresunperComponent
  },
  {
    path: ":id",
    component: SunPerEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes), TlaSharedModule, LibrariesModule,
    CoreOrgTreeModule,
    CorePageListModule,
    CorePageEditModule,
    FullscreenModalLoaderModule,
    CoreDropdownModule],
  declarations: [DeclaresunperComponent, SunPerEditComponent],
  providers: [CoreService],
})
export class DeclaresunperModule {}
