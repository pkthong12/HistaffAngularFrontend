import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreService } from "src/app/services/core.service";
import { TlaSharedModule } from "src/app/components/shared.module";
import { CorePageEditModule } from "src/app/libraries/core-page-edit/core-page-edit.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { SeDocumentInfoEditComponent } from "./se-document-info-edit/se-document-edit-info.component";
import { CoreCheckboxModule } from "src/app/libraries/core-checkbox/core-checkbox.module";
import { SeDocumentInfoComponent } from "./se-document-info.component";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { SeDocumentInfoUpComponent } from "./se-document-info-edit/se-document-info-up/se-document-info-up.component";

const routes: Routes = [
  {
    path: "",
    component: SeDocumentInfoComponent,
    // children: [
    //   {
       
    //     outlet: "corePageListAux",
    //     canDeactivate: [CanDeactivateGuard]
    //   }
    // ]
  },{
    path: ":id",
    component: SeDocumentInfoEditComponent,
    children: [
      {
        path: ":id",
        component: SeDocumentInfoUpComponent,
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
    CorePageHeaderModule,
    CorePageEditModule,
    CoreCheckboxModule,
    CoreOrgTreeModule
  ],
  declarations: [SeDocumentInfoComponent, SeDocumentInfoEditComponent, SeDocumentInfoUpComponent],
  providers: [CoreService],
})
export class SeDocumentInfoModule { }
