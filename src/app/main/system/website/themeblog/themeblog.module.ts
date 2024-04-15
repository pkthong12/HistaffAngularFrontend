import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ThemeBlogComponent } from "./themeblog.component";
import { CoreService } from "src/app/services/core.service";
import { ThemeBlogEditComponent } from "./edit/themeblog-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";
import { RichTextEditorAllModule } from "@syncfusion/ej2-angular-richtexteditor";
const routes: Routes = [
  {
    path: "",
    component: ThemeBlogComponent,
  },
  {
    path: ":id",
    component: ThemeBlogEditComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule,
    RichTextEditorAllModule,
  ],
  declarations: [ThemeBlogComponent, ThemeBlogEditComponent],
  providers: [CoreService],
})
export class ThemeBlogModule {}
