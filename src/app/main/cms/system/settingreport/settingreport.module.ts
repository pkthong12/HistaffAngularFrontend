import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SettingReportComponent } from "./settingreport.component";
import { CoreService } from "src/app/services/core.service";
import { TlaSharedModule } from "src/app/components/shared.module";
import { RichTextEditorAllModule } from "@syncfusion/ej2-angular-richtexteditor";
import { DocumentEditorContainerModule } from "@syncfusion/ej2-angular-documenteditor";
const routes: Routes = [
  {
    path: "",
    component: SettingReportComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule,

    RichTextEditorAllModule,
    DocumentEditorContainerModule,
  ],
  declarations: [SettingReportComponent],
  providers: [CoreService],
})
export class SettingReportModule {}
