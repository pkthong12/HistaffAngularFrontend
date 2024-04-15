import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupUserComponent } from './groupuser.component';
import { GroupUserEditComponent } from './edit/groupuser-edit.component';
import { GroupuserCloneComponent } from './clone/groupuser-clone.component';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: "",
    component: GroupUserComponent,
    children: [
      {
        path: "clone",
        component: GroupuserCloneComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      },

      {
        path: ":id",
        component: GroupUserEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupUserRoutingModule { }
