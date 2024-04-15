import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateRoutingModule } from './certificate-routing.module';
import { CertificateComponent } from './certificate.component';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';


@NgModule({
  declarations: [
    CertificateComponent
  ],
  imports: [
    CommonModule,
    CertificateRoutingModule,
    AppPipesModule
  ]
})
export class CertificateModule { }
