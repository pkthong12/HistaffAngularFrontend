import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysFunctionUrlMapperComponent } from './sys-function-url-mapper.component';
import { CanActivateFunctionUrlMapperGuard } from 'src/app/guards/can-activate-function-url-mapper.guard';

const routes: Routes = [
  {
    path: '',
    component: SysFunctionUrlMapperComponent,
    outlet: 'popupAux',
    canActivate: [CanActivateFunctionUrlMapperGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysFunctionUrlMapperRoutingModule { }
