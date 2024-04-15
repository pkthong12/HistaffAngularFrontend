import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MutationLogComponent } from './mutation-log/mutation-log.component';

const routes: Routes = [
  {
    path: "",
    component: MutationLogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MutationLogRoutingModule { }
