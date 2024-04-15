import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysFunctionActionMapperComponent } from './sys-function-action-mapper.component';

const routes: Routes = [{
  path: "",
  component: SysFunctionActionMapperComponent,
  outlet: 'popupAux',
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysFunctionActionMapperRoutingModule { }
