import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQueryListRequest } from 'src/app/interfaces/IQueryListRequest';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { api } from 'src/app/constants/api/apiDefinitions';

@Injectable({
  providedIn: 'root'
})
export class TimeTypeService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { }

  timeTypeList(request: IQueryListRequest): Observable<any> {
    return this.commonHttpRequestService.makePostRequest('timeTypeList', api.AT_TIME_TYPE_QUERY_LIST, request)
  }


}
