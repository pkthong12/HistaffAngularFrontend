import { RouterModule, Routes } from "@angular/router";
import { HuconcurrentlyComponent } from "./huconcurrently.component";
import { NgModule } from "@angular/core";


const routes: Routes = [
    {
      path: '',
      component: HuconcurrentlyComponent,
    },
    
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class HuConcurrentlyRoutingModule{}