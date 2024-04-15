import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppLayoutCompnent } from './applayout.component';
import { DialogStateComponent } from 'src/app/components/dialog-state/dialog-state.component';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { SidebarModule } from '../components/sidebar/sidebar.module';
import { LanguageChangerModule } from 'src/app/libraries/language-changer/language-changer.module';
import { CoreReducerIconModule } from 'src/app/libraries/core-reducer-icon/core-reducer-icon.module';
import { CoreNavigationTrackerModule } from 'src/app/libraries/core-navigation-tracker/core-navigation-tracker.module';
import { CoreRoutingHistoryModule } from 'src/app/libraries/core-routing-history/core-routing-history.module';
import { AuthProfileModule } from 'src/app/auth/auth-profile/auth-profile.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

import { NavigatorModule } from 'src/app/libraries/navigator/navigator.module';
import { UserActivityModule } from 'src/app/libraries/user-activity/user-activity.module';
import { CoreConfirmDialogModule } from 'src/app/libraries/core-confirm-dialog/core-confirm-dialog.module';
import { NotificationHeaderModule } from 'src/app/libraries/notification-header/notification-header.module';
import { TooltipModule } from 'src/app/libraries/tooltip/tooltip.module';

@NgModule({
    declarations: [
        AppLayoutCompnent,
        DialogStateComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        ToolbarModule,
        AppPipesModule,
        SidebarModule,
        NavigatorModule,
        UserActivityModule,
        FormsModule,
        LanguageChangerModule,
        CoreReducerIconModule,
        CoreNavigationTrackerModule,
        CoreRoutingHistoryModule,
        AuthProfileModule,
        CoreConfirmDialogModule,
        NotificationHeaderModule,
        TooltipModule
    ],
    exports: [
        AppLayoutCompnent,
    ]
})
export class AppLayoutModule {}
