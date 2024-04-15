import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { api } from 'src/app/constants/api/apiDefinitions';

@Injectable({
  providedIn: 'root'
})
export class UserEditService extends BaseApiService {

  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) { 
    super(commonHttpRequestService)
  }

  getUserGroupList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getUserGroupList', api.SYS_GROUP_READ_ALL);
  }

  employeeGetById(id: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('employeeGetById', api.HU_EMPLOYEE_READ + `?id=${id}`);
  }

  orgUnitGetById(id: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('orgUnitGetById', api.OM_ORGANIZATION_READ + `?id=${id}`);
  }

}
