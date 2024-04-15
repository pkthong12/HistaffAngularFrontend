import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { SurveyComponent } from "./survey.component";
import { SurveyEditComponent } from "./edit/survey-edit.component";


import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { DirectiveModule } from "src/app/directives/directive.module";

const routes: Routes = [
  {
    path: "",
    component: SurveyComponent,
  },
  {
    path: ":id",
    component: SurveyEditComponent,
    canDeactivate: [CanDeactivateGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListModule,
    CorePageEditModule,
    DirectiveModule,
    AppPipesModule
  ],
  declarations: [SurveyComponent, SurveyEditComponent]
})
export class SurveyModule {}
