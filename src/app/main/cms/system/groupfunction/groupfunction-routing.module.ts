import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GroupFunctionComponent } from "./groupfunction.component";
import { GroupFunctionEditComponent } from "./edit/groupfunction-edit.component";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";

const routes: Routes = [
    {
      path: "",
      component: GroupFunctionComponent,
      children: [
        {
          path: ":id",
          component: GroupFunctionEditComponent,
          outlet: "corePageListAux",
          canDeactivate: [CanDeactivateGuard]
        }
      ]
    },
    
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class GroupFuntionRoutingModule {}