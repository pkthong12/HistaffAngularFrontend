import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, zip, catchError, of, Subscription, filter } from 'rxjs';
import { AuthService } from './auth.service';
import { MultiLanguageService } from './multi-language.service';
import { LayoutService } from './layout.service';
import { AppConfigService } from './app-config.service';
import { IFormatedResponse } from '../interfaces/IFormatedResponse';
import { IAuthData } from '../interfaces/IAuthData';
import { RoutingService } from './routing.service';
import { OrganizationService } from './organization.service';
import { IEveryTreeStatus } from '../libraries/services/recursive.service';
import { AppService } from './app.service';
import { api } from '../constants/api/apiDefinitions';

@Injectable({
  providedIn: 'root'
})
export class AppInitializationService implements OnDestroy {
 
  initializing$ = new BehaviorSubject<boolean>(true);
  ssoProcessing$ = new BehaviorSubject<boolean>(true);
  subscriptions: Subscription[] = [];

  primaryInitialized: boolean = false;
  storeSessionOk: boolean = false;

  pendingAuthData$ = new BehaviorSubject<IAuthData | null>(null);

  ssoFailed: boolean = false;

  constructor(
    private authService: AuthService,
    private mls: MultiLanguageService,
    private layoutService: LayoutService,
    private organizationService: OrganizationService,
    private routingService: RoutingService,
    private appConfigService: AppConfigService,
    private appService: AppService
  ) {

  }


  appInitialize(): void {

    const toCamel = (o: any): any => {
      var newO, origKey, newKey, value
      if (o instanceof Array) {
        return o.map(function (value) {
          if (typeof value === "object") {
            value = toCamel(value)
          }
          return value
        })
      } else {
        newO = {}
        for (origKey in o) {
          if (o.hasOwnProperty(origKey)) {
            newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
            value = o[origKey]
            if (value instanceof Array || (value !== null && value.constructor === Object)) {
              value = toCamel(value)
            }
            (newO as any)[newKey] = value
          }
        }
      }
      return newO
    }

    try {

      fetch('../../assets/app.config.json').then(res => res.json()).then(({

        APP_TYPE,
        BASE_URL,     
        GOLIVE_URL,
        DEBUG_ENABLED,

        LOGO_LOGIN,
        LOGO_HEADER,
        HOME_BACKGROUND_IMAGE, 

        OAUTH2_OIDC_ENABLED,
        OAUTH2_OIDC_CLIENT_ID,
        OAUTH2_OIDC_LOGIN_URI,
        OAUTH2_OIDC_REDIRECT_URI,
        OAUTH2_OIDC_SCOPE,

        SAML2ADFS_ENABLED, 
        SAML2ADFS_IDP, 
        SAML2ADFS_IDENTIFIER,
        SAML2ADFS_WA_SIGNIN,
        SAML2ADFS_WA_SIGNOUT,
        SAML2ADFS_WREPLY,

        HANGFIRE_PATH,
        STATIC_FOLDER,
        AVATAR_FOLDER,

      }) => {

        this.appConfigService.APP_TYPE = APP_TYPE;
        this.appConfigService.BASE_URL = BASE_URL;
        this.appConfigService.GOLIVE_URL = GOLIVE_URL;
        this.appConfigService.DEBUG_ENABLED = DEBUG_ENABLED;

        this.appConfigService.LOGO_LOGIN = LOGO_LOGIN;
        this.appConfigService.LOGO_HEADER = LOGO_HEADER;
        this.appConfigService.HOME_BACKGROUND_IMAGE = HOME_BACKGROUND_IMAGE;

        this.appConfigService.OAUTH2_OIDC_ENABLED = OAUTH2_OIDC_ENABLED;
        this.appConfigService.OAUTH2_OIDC_CLIENT_ID = OAUTH2_OIDC_CLIENT_ID;
        this.appConfigService.OAUTH2_OIDC_LOGIN_URI = OAUTH2_OIDC_LOGIN_URI;
        this.appConfigService.OAUTH2_OIDC_REDIRECT_URI = OAUTH2_OIDC_REDIRECT_URI;
        this.appConfigService.OAUTH2_OIDC_SCOPE = OAUTH2_OIDC_SCOPE;

        this.appConfigService.SAML2ADFS_ENABLED = SAML2ADFS_ENABLED;
        this.appConfigService.SAML2ADFS_IDP = SAML2ADFS_IDP;
        this.appConfigService.SAML2ADFS_IDENTIFIER = SAML2ADFS_IDENTIFIER;
        this.appConfigService.SAML2ADFS_WA_SIGNIN = SAML2ADFS_WA_SIGNIN;
        this.appConfigService.SAML2ADFS_WA_SIGNOUT = SAML2ADFS_WA_SIGNOUT;
        this.appConfigService.SAML2ADFS_WREPLY = SAML2ADFS_WREPLY;

        this.appConfigService.HANGFIRE_PATH = HANGFIRE_PATH;
        this.appConfigService.STATIC_FOLDER = STATIC_FOLDER;
        this.appConfigService.AVATAR_FOLDER = AVATAR_FOLDER;

        const params = (new URL(window.location.href)).searchParams;
        const local = params.get("local");

        if (SAML2ADFS_ENABLED && !local) {
          if (!this.ssoFailed) {
            setTimeout(() => {
              
              const token = params.get("token");
              if (token !== null) {

                this.subscriptions.push(
    
                  this.appService.get(api.SYS_SHORT_LIVED_TOKEN_LOGIN + "?token=" + token).subscribe(x => {
                    if (x.ok && x.status === 200 && x.body?.statusCode === 200) {
                      const body: IFormatedResponse = x.body
                      if (body.statusCode === 200) {
                        this.pendingAuthData$.next({
                          ...body.innerBody,
                          loginTime: new Date().getTime()
                        })
                      }
                    } else {
                      this.ssoFailed = true;
                    }
                    this.ssoProcessing$.next(false);
    
                    setTimeout(() => {
                      if (!!localStorage) {
                        const leftbarReducedString = localStorage.getItem('leftbarReduced');
                        const leftbarReduced = JSON.parse(leftbarReducedString!)
                        this.layoutService.leftbarReduced$.next(!!leftbarReduced);
    
                        const routingHistoryString = localStorage.getItem('routingHistory');
                        if (!!routingHistoryString) {
                          const routingHistory = JSON.parse(routingHistoryString);
                          this.routingService.routingHistory$.next(routingHistory);
                        }
    
                        const coreOrgTreeStatusString = localStorage.getItem("coreOrgTreeStatus");
                        if (coreOrgTreeStatusString) {
                          const savedObject: IEveryTreeStatus = JSON.parse(coreOrgTreeStatusString);
                          this.organizationService.status$.next(savedObject);
                        }
                      }
                      this.initializing$.next(false);
                    }, 200)
                  })
                )
    
    
              } else {

                // ALWAYS REDIRECT TO THE ANGULAR APPLICATION LOGIN PAGE IF NO SESSION FOUND (?local=1)
                window.location.href = `${this.appConfigService.SAML2ADFS_IDENTIFIER}?local=1`;

                /*

                //IF THE ANGULAR APPLICATION LOGIN PAGE IS NOT MANDATORY => CALL SAML2.0 IdP

                const codeVerifier = this.authService.generateRandomCodeVerifier(43);
                localStorage.setItem("codeVerifier", codeVerifier);
                this.authService.generateCodeChallengeFromVerifier(codeVerifier).then(codeChallenge => {
                  const authorizationUrl = `${this.appConfigService.SAML2ADFS_IDP}?` +
                    `wtrealm=${this.appConfigService.SAML2ADFS_IDENTIFIER}` +
                    `&wa=${this.appConfigService.SAML2ADFS_WA_SIGNIN || 'wsignin1.0'}` + 
                    `&wreply=${this.appConfigService.BASE_URL}${this.appConfigService.SAML2ADFS_WREPLY}` + 
                    `&wctx=${codeChallenge}`
                  if (isDevMode()) {
                    alert(authorizationUrl);
                  }
                  
                  window.location.href = authorizationUrl;

                });
                */


              }
  
            })
              
          }

        } else {
          this.ssoProcessing$.next(false);
        }

        let body1: IFormatedResponse;
        let body2: IFormatedResponse;
        let body3: IFormatedResponse;
        let body4: IFormatedResponse;

        this.subscriptions.push(
          this.ssoProcessing$.pipe(
            filter(x => !x)
          ).subscribe(x => {

            this.subscriptions.push(
              zip([
                this.mls.readAllMini(),
                this.routingService.readAllFunctionWithAllActions(),
                this.routingService.getIgnorePaths(),
                this.appService.get(api.PORTAL_ROUTE_READ_ALL_MINI)
              ]).pipe(
                catchError(val => of(`The app caught: ${val}`))
              ).subscribe(responses => {

                console.log("appInitialize() zip() done")

                const x1 = responses[0];
                if (x1.ok && x1.status === 200) {
                  body1 = x1.body
                  if (body1.statusCode === 200) {
                    this.mls.data$.next(body1.innerBody);
                  }
                }

                const x2 = toCamel(responses[1]);
                if (x2.ok && x2.status === 200) {
                  body2 = x2.body
                  if (body2.statusCode === 200) {
                    this.routingService.fullFunctions$.next(body2.innerBody);
                  }
                }

                const x3 = responses[2];
                if (x3.ok && x3.status === 200) {
                  body3 = x3.body
                  if (body3.statusCode === 200) {
                    this.routingService.ignoredPaths$.next(body3.innerBody);
                  }
                }

                const x4 = responses[3];
                if (x4.ok && x4.status === 200) {
                  body4 = x4.body
                  if (body4.statusCode === 200) {
                    this.routingService.portalRoutes$.next(body4.innerBody);
                  }
                }

                if (body1?.statusCode === 200 && body2?.statusCode === 200 && body3?.statusCode === 200) {

                  this.primaryInitialized = true;

                  if (!!OAUTH2_OIDC_ENABLED && !!this.pendingAuthData$.value) {
                    this.storeSessionOk = true;
                    this.authService.data$.next(this.pendingAuthData$.value);
                    this.pendingAuthData$.next(null);
                    this.authService.authenticated$.next(true);
                  } else {

                    this.initializing$.next(false);

                    this.authService.tryRestoreSession()
                      .subscribe(x => {

                        console.log("tryRestoreSession result: ", x)

                        

                        if (x.ok && x.status === 200 && x.body?.statusCode === 200) {
                          const body: IFormatedResponse = x.body
                          if (body.statusCode === 200) {
                            const newAuthData: IAuthData = {
                              ...body.innerBody,
                              loginTime: new Date().getTime()
                            }
                            this.storeSessionOk = true;
                            this.authService.data$.next(newAuthData);
                          }
                        }

                        setTimeout(() => {
                          if (!!localStorage) {
                            const leftbarReducedString = localStorage.getItem('leftbarReduced');
                            const leftbarReduced = JSON.parse(leftbarReducedString!)
                            this.layoutService.leftbarReduced$.next(!!leftbarReduced);

                            const routingHistoryString = localStorage.getItem('routingHistory');
                            if (!!routingHistoryString) {
                              const routingHistory = JSON.parse(routingHistoryString);
                              this.routingService.routingHistory$.next(routingHistory);
                            }

                            const coreOrgTreeStatusString = localStorage.getItem("coreOrgTreeStatus");
                            if (coreOrgTreeStatusString) {
                              const savedObject: IEveryTreeStatus = JSON.parse(coreOrgTreeStatusString);
                              this.organizationService.status$.next(savedObject);
                            }
                          }
                        }, 200)

                      })
                  }
                } else {
                  this.initializing$.next(false);
                }

              })
            )


          })
        )

      }).catch(e => {
        console.log("fetch app.config.json error", e)
        this.initializing$.next(false);
      })
    } catch (e) {
      console.log("appInitialize() zip() error: ", e)
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

}
