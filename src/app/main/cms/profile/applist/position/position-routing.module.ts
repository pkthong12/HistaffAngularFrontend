
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { PositionComponent } from './position.component';
import { PositionEditComponent } from './edit/position-edit.component';

const routes: Routes = [
  {
    path: "",
    component: PositionComponent,
  },
  {
    path: ":id",
    component: PositionEditComponent,
    canDeactivate: [CanDeactivateGuard]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionRoutingModule { }
