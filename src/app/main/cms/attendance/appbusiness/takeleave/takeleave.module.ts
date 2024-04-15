import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TakeLeaveComponent } from "./takeleave.component";
import { CoreService } from "src/app/services/core.service";
import { TlaSharedModule } from "src/app/components/shared.module";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { LibrariesModule } from "src/app/libraries/libraries.module";


const routes: Routes = [
  {
    path: "",
    component: TakeLeaveComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TlaSharedModule, AccordionModule, LibrariesModule],
  declarations: [TakeLeaveComponent],
  providers: [CoreService],
})
export class TakeLeaveModule {}
