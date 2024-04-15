import { RouterModule, Routes } from "@angular/router";
import { OtherListComponent } from "../../profile/applist/otherlist/otherlist.component";
import { OrtherListEditComponent } from "./edit/ortherlist-edit.component";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { NgModule } from "@angular/core";
import { TlaSharedModule } from "src/app/components/shared.module";
import { CorePageEditModule } from "src/app/libraries/core-page-edit/core-page-edit.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CoreService } from "src/app/services/core.service";

const routes: Routes = [
    {
      path: '',
      component: OtherListComponent,
      children: [
        {
          path: ":id",
          component: OrtherListEditComponent,
          outlet: "corePageListAux",
          canDeactivate: [CanDeactivateGuard]
        }
      ]
    }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(routes),
      TlaSharedModule,
      CorePageListModule,
      CorePageEditModule,
      CorePageHeaderModule
    ],
    declarations: [],
    providers: [CoreService],
  })
  export class OrtherListModule {}
