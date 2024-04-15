import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';

import { InsArisingComponent } from './ins-arising/ins-arising.component';
import { InsArisingEditComponent } from './ins-arising-edit/ins-arising-edit.component';
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { TlaSharedModule } from "src/app/components/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { CoreHeaderParamsModule } from 'src/app/libraries/core-header-params/core-header-params.module';
import { CoreDropdownModule } from "src/app/libraries/core-dropdown/core-dropdown.module";
import { CoreDatePickerModule } from "src/app/libraries/core-date-picker/core-date-picker.module";

const routes: Routes = [
  {
    path: "",
    component: InsArisingComponent,
    children: [
      {
        path: ":id",
        component: InsArisingEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];
@NgModule({
  declarations: [
    InsArisingComponent,
    InsArisingEditComponent
  ],
  imports: [
    RouterModule.forChild(routes), 
    TlaSharedModule, 
    AccordionModule, 
    LibrariesModule,
    CorePageListModule,
    CoreOrgTreeModule,
    CorePageEditModule,
    CoreButtonGroupVnsModule,
    CorePageHeaderModule,
    CoreCheckboxModule,
    CoreHeaderParamsModule,
    CoreDropdownModule,
    CoreDatePickerModule
  ]
})
export class InsArisingModule { }
