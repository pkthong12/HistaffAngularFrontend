import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root'
})
export class GroupPositionEditService extends BaseApiService {

  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) { 
    super(commonHttpRequestService)
  }

  getGroupPositionCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getGroupPositionCode', '/api/HuGroupPosition/CreateCodeAuto');
  }

}
