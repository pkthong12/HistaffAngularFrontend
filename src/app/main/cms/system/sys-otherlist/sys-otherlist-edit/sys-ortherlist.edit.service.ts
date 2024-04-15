import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class SysOrtherlistEditService extends BaseApiService {
  typeId!: number | null;

  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) {
    super(commonHttpRequestService);
  }

  getScales(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getScales',
      '/api/SysOrtherList/GetScales'
    );
  }
  GetAllGroupOtherListType(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'GetAllGroupOtherListType',
      '/api/SysOrtherList/GetAllGroupOtherListType'
    );
  }
}
