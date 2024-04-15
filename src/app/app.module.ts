import { OAuthLogger, OAuthModule } from 'angular-oauth2-oidc';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, ErrorHandler } from '@angular/core';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { DirectiveModule } from './directives/directive.module';
import { HttpClientModule as HttpModule } from '@angular/common/http';
import { ExtraOptions, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminGuard, StoreGuard } from './common/auth.guard';
import { AppRoutes } from './app.routing';
import { Globals } from './common/globals';
import { Configs } from './common/configs';
import { AuthService } from './services/auth.service';
import { Notification } from './common/notification';
import { AnimatedTextModule } from './libraries/animated-text/animated-text.module';
import { ThreedotsModule } from './libraries/threedots/threedots.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Error404Module } from './main/errors/404/error-404.module';
import { AppLayoutModule } from './layout/applayout/applayout.module';
import { OnlineUsersComponent } from './online-users/online-users/online-users.component';
import { ConfigTreeGrids } from './common/configs_treegrid';

import { LoginComponent } from './auth/login/login.component';

import { LibrariesModule } from './libraries/libraries.module';
import { AlertModule } from './libraries/alert/alert.module';
import { FullscreenModalLoaderModule } from './libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';

import { AppComponent } from './app.component';
import { WaittingScreenComponent } from './components/waitting-screen/waitting-screen.component';
import { RightchatComponent } from './components/rightchat/rightchat.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppInitializationService } from './services/app-initialization.service';
import { AppPipesModule } from './app-pipes/app-pipes.module';
import {
  RequestCache,
  RequestCacheWithMap,
} from './services/request-cache.service';

import { httpInterceptorProviders } from './http-interceptors';
import { AppErrorHandler } from './app-error-handler';
import { SsoLogger } from './services/sso-logger';

export function appInitialize(
  appInitializationService: AppInitializationService
) {
  return () => appInitializationService.appInitialize();
}

const extraOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 155], // 155 can vary
  initialNavigation: 'disabled'
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    LibrariesModule,
    ModalModule,
    DirectiveModule,
    RouterModule.forRoot(AppRoutes, extraOptions),
    TranslateModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    AnimatedTextModule,
    ThreedotsModule,
    FullscreenModalLoaderModule,
    HttpModule,
    // Common Module
    Error404Module,
    AppLayoutModule,
    AppPipesModule
  ],
  declarations: [
    LoginComponent,
    AppComponent,
    WaittingScreenComponent,
    RightchatComponent,
    FooterComponent,
    OnlineUsersComponent,
  ],
  providers: [
    AuthService,
    AdminGuard,
    StoreGuard,
    Globals,
    Configs,
    ConfigTreeGrids,
    BsModalService,
    Notification,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitialize,
      deps: [AppInitializationService],
      multi: true,
    },
    { provide: OAuthLogger, useClass: SsoLogger },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: RequestCache, useClass: RequestCacheWithMap },
    // { provide: ErrorHandler, useClass: AppErrorHandler },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(router: Router) {
    const replacer = (key: string, value: any) =>
      typeof value === 'function' ? value.name : value;
    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
