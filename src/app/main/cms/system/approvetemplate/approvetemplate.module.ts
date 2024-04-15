import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { ApproveTemplateComponent } from './approvetemplate.component';
import { ApproveTemplateEditComponent } from './approvetemplate-edit.component';
import { ApproveTemplateDetailComponent } from './approvetemplatedetail.component';
import { ApproveTemplateDetailEditComponent } from './approvetemplatedetail-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ApproveTemplateComponent
  },
  {
    path: 'edit/:templateId',
    component: ApproveTemplateEditComponent 
  },
  {
    path: 'detail/:templateId',
    component: ApproveTemplateDetailComponent
  },
  {
    path: 'edit/:templateId/:templateDetailId',
    component: ApproveTemplateDetailEditComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule
  ],
  declarations: [ApproveTemplateComponent, ApproveTemplateEditComponent, ApproveTemplateDetailComponent, ApproveTemplateDetailEditComponent],
  providers: [CoreService]
})
export class ApproveTemplateModule {}
