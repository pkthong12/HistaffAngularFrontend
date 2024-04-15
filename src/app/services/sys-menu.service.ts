import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from './common-http-request.service';
import { Observable } from 'rxjs';

import { api } from '../constants/api/apiDefinitions';

@Injectable({
  providedIn: 'root'
})
export class SysMenuService {

  constructor(private commonHttpRequestService: CommonHttpRequestService) { }

  readPermittedMenu(userId: string): Observable<any> {
    const fullUrl = api.SYS_MENU_GET_PERMITTED_LINEAR_LIST + '?userId=' + userId;
    return this.commonHttpRequestService.makeGetRequest('readPermittedMenu', fullUrl);
  }

  readAll(): Observable<any> {
    const fullUrl = api.SYS_MENU_READ_ALL;
    return this.commonHttpRequestService.makeGetRequest('readAll', fullUrl);
  }
}
