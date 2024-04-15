import { NgModule } from "@angular/core";

import { GroupPositionComponent } from "./groupposition.component";
import { GroupPositionEditComponent } from "./edit/groupposition-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";

import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { GroupPositionRoutingModule } from './groupposition-routing.module';

@NgModule({
  imports: [   
    TlaSharedModule,
    AccordionModule, 
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    GroupPositionRoutingModule,
    CorePageHeaderModule,
        ], 
  declarations: [GroupPositionComponent, GroupPositionEditComponent], 
})
export class GroupPositionModule {}
