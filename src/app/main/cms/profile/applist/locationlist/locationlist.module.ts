import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { LocationlistComponent } from "./locationlist.component";
import { CoreTabsModule } from 'src/app/libraries/core-tabs/core-tabs.module';
import { CoreAccordionModule } from 'src/app/libraries/core-accordion/core-accordion.module';
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CoreCompositionModule } from "src/app/libraries/core-composition/core-composition.module";

const routes: Routes = [
  {
    path: "",
    component: LocationlistComponent
  },

];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CoreTabsModule,
    CoreAccordionModule,
    RouterModule,
    CommonModule,
    CoreCompositionModule,
    CorePageListModule
  ],
  declarations: [
    LocationlistComponent,

  ],
})
export class LocationListModule { }
