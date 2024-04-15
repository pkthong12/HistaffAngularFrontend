import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationStructComponent } from './organization-struct/organization-struct.component';
import { OrganizationStructEditComponent } from './organization-struct-edit/organization-struct-edit.component';
import { OrganizationStructViewComponent } from './organization-struct-view/organization-struct-view.component';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { OrganizationStructComponentResolver } from 'src/app/resolvers/organization-struct-component.resolver';

const routes: Routes = [
  {
    path: "",
    component: OrganizationStructComponent,
    resolve: { preloaded: OrganizationStructComponentResolver },
    children: [
      {
        path: "view/:id",
        component: OrganizationStructViewComponent,
      },
      {
        path: "edit/:id",
        component: OrganizationStructEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationStructRoutingModule { }
