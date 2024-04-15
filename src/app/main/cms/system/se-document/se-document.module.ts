import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreService } from "src/app/services/core.service";
import { TlaSharedModule } from "src/app/components/shared.module";
import { CorePageEditModule } from "src/app/libraries/core-page-edit/core-page-edit.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { SeDocumentComponent } from "./se-document.component";
import { SeDocumentEditComponent } from "./se-document-edit/se-document-edit.component";
import { CoreCheckboxModule } from "src/app/libraries/core-checkbox/core-checkbox.module";

const routes: Routes = [
  {
    path: "",
    component: SeDocumentComponent,
    children: [
      {
        path: ":id",
        component: SeDocumentEditComponent,
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
    CoreCheckboxModule
  ],
  declarations: [SeDocumentComponent, SeDocumentEditComponent],
  providers: [CoreService],
})
export class SeDocumentModule { }
