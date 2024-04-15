import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class PeriodTaxEditService extends BaseApiService {
  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) {
    super(commonHttpRequestService);
  }

  getPeriod(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getPeriod',
      '/api/PaPeriodTax/GetPeriod'
    );
  }

  getMonth(year: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getMonth', `/api/PaPeriodTax/GetMonth?year=${year}`);
  }
}
