import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { KpiGroupComponent } from "./kpigroup.component";
import { CoreService } from "src/app/services/core.service";
import { KpiGroupEditComponent } from "./edit/kpigroup-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";

import { LibrariesModule } from "src/app/libraries/libraries.module";

import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: "",
    component: KpiGroupComponent,
    children: [
      {
        path: ":id",
        component: KpiGroupEditComponent,
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
    AccordionModule, 
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    CorePageHeaderModule,
    
  ],
  exports: [RouterModule],
  declarations: [KpiGroupComponent, KpiGroupEditComponent],
  providers: [CoreService],

})
export class KpiGroupModule {}
