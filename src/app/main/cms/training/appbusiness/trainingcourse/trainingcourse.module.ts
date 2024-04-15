import { NgModule } from "@angular/core";
import { TlaSharedModule } from "src/app/components/shared.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from "src/app/libraries/core-page-edit/core-page-edit.module";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { TrainingCourseComponent } from "./trainingcourse.component";
import { TrainingCourseEditComponent } from "./edit/training-course-edit.component";
import { CoreService } from "src/app/services/core.service";
import { RouterModule, Routes } from "@angular/router";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";

const routes: Routes = [
  {
    path: "",
    component: TrainingCourseComponent,
    children: [
      {
        path: ":id",
        component: TrainingCourseEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule,
    AccordionModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    CorePageHeaderModule,
    CoreStatusStickerModule
  ],
  declarations: [TrainingCourseComponent, TrainingCourseEditComponent],
  providers:[CoreService],
})
export class TrainingCourseModule { }
