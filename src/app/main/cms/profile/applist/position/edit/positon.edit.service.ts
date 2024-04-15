import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root'
})
export class PositionEditService extends BaseApiService {
  isCreating$ = new BehaviorSubject<boolean>(false);
  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) { 
    super(commonHttpRequestService)
  }

  getScales(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getScales', '/api/HuPosition/GetScales');
  }
  getCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCode', '/api/HuPosition/CreateCodeAuto');
  }

}
