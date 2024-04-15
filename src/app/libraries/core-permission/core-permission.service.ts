import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { IPermissionAction } from 'src/app/interfaces/IAuthData';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { ICoreFunctionAction } from '../core-permission-actions/core-permission-actions/core-permission-actions.component';

export interface ISysActionView {
  actionId: number;
  nameCode: string;
}

export interface ISysFunctionView {
  functionId: number;
  appActionIds: ISysActionView[];
}

@Injectable({
  providedIn: 'root'
})
export class CorePermissionService {

  // Object = SYS_USER | SYS_GROUP
  selectedObject$ = new BehaviorSubject<any>(undefined);
  selectedObjectActionPermissions$ = new BehaviorSubject<ICoreFunctionAction[]>([])
  selectedObjectOrgPermissions$ = new BehaviorSubject<number[]>([])
  instanceNumber!: number | null;
  objectId!: string | number;
  isPermission = new BehaviorSubject<boolean>(false);

  constructor(private commonHttpRequestService: CommonHttpRequestService) { }

  getFunctionsActions(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getFunctionsActions', api.SYS_USER_PERMISSION_QUERY_LIST)
  }

  getFunctionsActionsForUser(userId: string): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getFunctionsActions', api.SYS_USER_FUNCTION_ACTION_PERMISSION_LIST + '?userId=' + userId)
  }
}
