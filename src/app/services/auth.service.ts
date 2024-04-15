// GLOBAL IMPORT
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";

import { HubConnectionService } from "./hub-connection.service";
import { OrganizationService } from "./organization.service";
import { CommonHttpRequestService } from "../services/common-http-request.service";
import { AlertService } from "../libraries/alert/alert.service";
import { MultiLanguageService } from "./multi-language.service";
import { AppConfigService } from "./app-config.service";
import { api } from "../constants/api/apiDefinitions";


import {
  HttpClient as Http
} from "@angular/common/http";
import { IClientLoginRequest } from "../interfaces/IClientLoginRequest";
import { IAuthData } from "../interfaces/IAuthData";
import { alertOptions, noneAutoClosedAlertOptions } from "../constants/alertOptions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // for change the navbar state between online and offline
  private authenticate = new Subject<boolean>();
  authenticateState$ = this.authenticate.asObservable();

  data$ = new BehaviorSubject<IAuthData | null>(null);
  stopSubscription: boolean = false;
  authenticated$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: Http,
    private router: Router,
    private commonHttpRequestService: CommonHttpRequestService,
    private hubConnectionService: HubConnectionService,
    private organizationService: OrganizationService,
    private alertService: AlertService,
    private mls: MultiLanguageService,
    private appConfigService: AppConfigService,
  ) {}

  // Web client login
  userLogin(request: IClientLoginRequest): Observable<any> {
    const fullUrl = api.SYS_LOGIN
    return this.commonHttpRequestService.makePostRequest("clientLogin", fullUrl, request);
  }

  // Web client logout
  userLogout(): Observable<any> {
    const url = api.SYS_LOGOUT
    return this.commonHttpRequestService.makePostRequest("clientLogout", url, {})
  }

  postLogout(): void {
    const connection = this.hubConnectionService.hubConnection$.value

    const clear = () => {
      this.alertService.info(this.mls.trans('SUCCESS_LOGGED_OUT'), alertOptions);
      this.hubConnectionService.hubConnection$.next(null);
      this.data$.next(null);
      this.organizationService.orgTreeData$.next([]);
      this.organizationService.status$.next({
        selectedKey: undefined,
        activeKeys: [],
        checkedKeys: [],
        expandedKeys: [],
        checkInheritance: true
      })
      localStorage.clear();
      if (this.appConfigService.SAML2ADFS_ENABLED) {
        //window.location.href = `${this.appConfigService.SAML2ADFS_IDP}?wa=${this.appConfigService.SAML2ADFS_WA_SIGNOUT || 'wsignout1.0'}`
        window.location.href = `${this.appConfigService.SAML2ADFS_IDP}?wtrealm=${this.appConfigService.SAML2ADFS_IDENTIFIER}&wa=${this.appConfigService.SAML2ADFS_WA_SIGNOUT || 'wsignout1.0'}&wreply=${this.appConfigService.SAML2ADFS_IDENTIFIER}`
      } else {
        this.router.navigateByUrl('/auth/login');
      }
    }

    if (!!connection) {
      connection.off("ReceiveSystemMessage");
      connection.off("ReceiveMessage");
      connection.stop().then(_ => {
        clear();
      }).catch(e => {
        if (this.data$.value?.isRoot) {
          this.alertService.error(JSON.stringify(e, null, 2), noneAutoClosedAlertOptions)
        }
      })
    } else {
      clear();
    }
  }

  // Web client Try restore session
  tryRestoreSession(): Observable<any> {
    const fullUrl = api.SYS_REFRESH_TOKEN
    return this.commonHttpRequestService.makePostRequest("refreshToken", fullUrl, { appType: "WEBAPP" })
  }

  getCodeChallenge() {
    return this.commonHttpRequestService.makeGetRequest("getCodeChallenge", api.SYS_SSO_GET_CODE_CHALLENGE)
  }

  getAuthorizationToken(): string {
    return this.data$.value?.token!;
  }

  isAuthenticate = (): boolean => {
    return !!this.data$.value;
  };

  getUserInfo = () => {};

  getToken = (): string => {
    return this.data$.value!.token;
  };

  parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  generateRandomCodeVerifier(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset.charAt(randomIndex);
    }
    return result;
  }

  async generateCodeChallengeFromVerifier(v: string) {

    const sha256 = (plain: string) => {
      // returns promise ArrayBuffer
      const encoder = new TextEncoder();
      const data = encoder.encode(plain);
      return window.crypto.subtle.digest("SHA-256", data);
    }
    
    const base64urlencode= (a: any) => {
      var str = "";
      var bytes = new Uint8Array(a);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        str += String.fromCharCode(bytes[i]);
      }
      return btoa(str)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    var hashed = await sha256(v);
    var base64encoded = base64urlencode(hashed);
    return base64encoded;
  }
  
  generateCodeChallenge(codeVerifier: string): Promise<string> {
    // Use a library or built-in crypto APIs to generate SHA-256 hash
    debugger
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    return crypto.subtle.digest('SHA-256', data)
      .then(buffer => {
        const hashArray = Array.from(new Uint8Array(buffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
      });
  }

}
