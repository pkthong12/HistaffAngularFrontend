import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HucommendComponent } from './hucommend.component';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { HuCommendRoutingModule } from './hucommend.routing';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { HucommendEditComponent } from './hucommend-edit/hucommend-edit.component';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { CoreService } from 'src/app/services/core.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreAccordionModule } from 'src/app/libraries/core-accordion/core-accordion.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { RouterModule } from '@angular/router';
import { CoreControlModule } from 'src/app/libraries/core-control/core-control.module';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { CoreFormModule } from 'src/app/libraries/core-form/core-form.module';
import { HucommendImportComponent } from './hucommend-import/hucommend-import.component';
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';
import { CoreHeaderParamsModule } from 'src/app/libraries/core-header-params/core-header-params.module';
@NgModule({
    declarations: [HucommendComponent, HucommendEditComponent, HucommendImportComponent],
    providers: [CoreService],
    imports: [
        CommonModule,
        CorePageListModule,
        TlaSharedModule,
        HuCommendRoutingModule,
        FormsModule,
        CoreButtonGroupVnsModule,
        CoreAccordionModule,
        ReactiveFormsModule,
        RouterModule,
        CoreControlModule,
        CoreOrgTreeModule,
        AppPipesModule,
        CoreFormModule,
        CoreButtonGroupVnsModule,
        FullscreenModalLoaderModule,
        CoreCheckboxModule,
        CoreStatusStickerModule,
        CoreHeaderParamsModule
    ]
})
export class HucommendModule {}
