import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class PeriodStandardEditService extends BaseApiService {
  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) {
    super(commonHttpRequestService);
  }

  getObjects(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getStatusList',
      '/api/SysOrtherList/GetOtherListByType?typeCode=OBJECT_EMPLOYEE'
    );
  }

  getPeriodList(year: Number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getPeriodList',
      '/api/AtPeriodStandard/GetPeriod?year=' + year
    );
  }
}
