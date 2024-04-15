import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";

import { Injectable, Inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AppInitializationService } from "../services/app-initialization.service";
import { Observable } from "rxjs";
import { Globals } from "./globals";

export interface TokenInfo {
  id: string;
  user_level: number;
  sub: string;
  website: string;
}

@Injectable()
export class StoreGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private appInitializationService: AppInitializationService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    const res: boolean = !!this.authService.isAuthenticate();

    //if (!res && !!!this.appInitializationService.initializing$.value) this.router.navigateByUrl('/auth/login')

    return res;
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private appInitializationService: AppInitializationService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    const res: boolean = !!this.authService.data$.value?.isAdmin;

    //if (!res && !!!this.appInitializationService.initializing$.value) this.router.navigateByUrl('/auth/login')

    return res;
  }
}

@Injectable({
  providedIn: "root",
})
export class TenantPermisstionGuard implements CanActivate {
  constructor(private _globals: Globals) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var key = this._globals.isAdmin ? true : false;
    this._globals.urlPermission.forEach((element: any) => {
      if (state.url.indexOf(element)) {
        key = true;
      }
    });
    return key;
  }
}
