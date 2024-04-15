import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({ providedIn: 'root' })
export class HuWelfareAutoService extends BaseApiService {
  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) {
    super(commonHttpRequestService);
  }
  getAllPeriodYear(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllPeriodYear',
      '/api/HuWelfareAuto/GetAllPeriodYear'
    );
  }
  getAllGender(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllGender',
      '/api/SysOrtherList/GetAllGender'
    );
  }
  getAllWelfareByKey(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllWelfareByKey',
      api.HU_WELFARE_GETLIST
    );
  }
}
