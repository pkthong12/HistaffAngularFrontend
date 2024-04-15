import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AppInitializationService } from '../services/app-initialization.service';

export const InitializationCanActivateFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const appInitializationService: AppInitializationService = inject(AppInitializationService);
  return !!!appInitializationService.initializing$.value;

}

export const InitializationCanMatchFn: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const appInitializationService: AppInitializationService = inject(AppInitializationService);
  return !!!appInitializationService.initializing$.value;
};

