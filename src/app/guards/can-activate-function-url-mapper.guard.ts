import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from '../services/dialog.service';
import { NavigatorService } from '../libraries/navigator/navigator/navigator.service';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class CanActivateFunctionUrlMapperGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
    private navigatorService: NavigatorService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const condition = !!!this.dialogService.busy && !!this.navigatorService.clickedItem$.value && (this.authService.data$.value?.id === '8c24683d-7d52-4f5a-8090-31c777e8869d' || this.authService.data$.value?.id === 'bd3e4ad4-11fc-4766-9224-4f9902f3a623')
    return condition;
  }

}
