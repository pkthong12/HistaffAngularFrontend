import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DecisionCreateComponent } from "./decisioncreate.component";
import { CoreService } from "src/app/services/core.service";
import { DecisionEditComponent } from "./edit/decision-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";

const routes: Routes = [
  {
    path: "",
    component: DecisionCreateComponent,
  },
  {
    path: ":id",
    component: DecisionEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TlaSharedModule],
  declarations: [DecisionCreateComponent, DecisionEditComponent],
  providers: [CoreService],
})
export class DecisionCreateModule {}
