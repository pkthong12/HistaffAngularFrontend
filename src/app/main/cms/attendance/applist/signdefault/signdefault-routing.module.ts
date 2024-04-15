import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { SignDefaultComponent } from './signdefault.component';
import { SignDefaultEditComponent } from './edit/signdefault-edit.component';
import { SigndefaultImportComponent } from './signdefault-import/signdefault-import.component';

const routes: Routes = [
  {
    path: "",
    component: SignDefaultComponent,
    children: [
      {
        path: "signdefault-import",
        outlet: "corePageListAux",
        component: SigndefaultImportComponent
      },
      {
        path: ":id",
        component: SignDefaultEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignDefaultRoutingModule { }