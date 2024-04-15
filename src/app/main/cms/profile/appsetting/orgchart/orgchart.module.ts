import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { OrgChartComponent } from "./orgchart.component";
import { CoreCompositionModule } from "src/app/libraries/core-composition/core-composition.module";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { CorePageListContentModule } from "src/app/libraries/core-page-list-content/core-page-list-content.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";

const routes: Routes = [
  {
    path: "",
    component: OrgChartComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CorePageHeaderModule,
    CoreCompositionModule,
    CoreOrgTreeModule,
    CorePageListModule,
    CorePageListContentModule,
  ],
  declarations: [OrgChartComponent],
})
export class OrgChartModule {}
