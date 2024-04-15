import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRoutingHistoryItem } from '../libraries/core-routing-history/core-routing-history/core-routing-history.component';
import { ISysFunction } from '../interfaces/entities/ISysFuntion';
import { AppService } from './app.service';
import { api } from '../constants/api/apiDefinitions';

export interface IFunctionWithFullActions extends ISysFunction {
  actionCodes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  navigating$ = new BehaviorSubject<boolean>(false);
  navigationUrl$ = new BehaviorSubject<string>('');
  routingHistory$ = new BehaviorSubject<IRoutingHistoryItem[]>([]);
  navigationStartUrl$ = new BehaviorSubject<string>('');
  navigationHeaderCode$ = new BehaviorSubject<string>('');

  fullFunctions$ = new BehaviorSubject<IFunctionWithFullActions[]>([]);
  ignoredPaths$ = new BehaviorSubject<string[]>([]);
  currentFunction$ = new BehaviorSubject<IFunctionWithFullActions | undefined>(undefined);

  portalRoutes$ = new BehaviorSubject<{path: string; vi: string; en: string}[]>([]);
  currentScreenCaption$ = new BehaviorSubject<string>('');

  constructor(private appService: AppService) { }

  getFullFunctions(): Observable<any> {
    return this.appService.get(api.SYS_FUNCTION_READ_ALL)
  }

  getIgnorePaths(): Observable<any> {
    return this.appService.get(api.SYS_FUNCTION_IGNORE_READ_ALL_PATH_ONLY, true)
  }

  readAllFunctionWithAllActions(): Observable<any> {
    return this.appService.get(api.SYS_FUNCTION_READ_ALL_WITH_ALL_ACTIONS, true)
  }

}
