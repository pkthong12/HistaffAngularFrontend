import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortalRouteComponent } from './portal-route.component';
import { PortalRouteEditComponent } from './portal-route-edit/portal-route-edit.component';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: "",
    component: PortalRouteComponent,
    children: [
      {
        path: ":id",
        outlet: 'corePageListAux',
        component: PortalRouteEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRouteRoutingModule { }
