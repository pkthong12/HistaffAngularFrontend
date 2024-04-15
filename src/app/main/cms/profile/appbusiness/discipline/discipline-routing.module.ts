import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplineComponent } from './discipline/discipline.component';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { DisciplineEditComponent } from './discipline-edit/discipline-edit.component';

const routes: Routes = [
  {
    path: "",
    component: DisciplineComponent
  },
  {
    path: ":id",
    component: DisciplineEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
]; 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisciplineRoutingModule { }
