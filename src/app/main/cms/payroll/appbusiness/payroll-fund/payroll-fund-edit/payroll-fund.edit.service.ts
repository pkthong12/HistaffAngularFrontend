import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class PayrollFundEditService extends BaseApiService {
  constructor(public override commonHttpRequestService: CommonHttpRequestService) {
    super(commonHttpRequestService);
  }

  getCompany(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCompany', '/api/PaPayrollFund/GetCompany');
  }
  getListFund(id: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getListFund', `/api/PaPayrollFund/GetListFund?id=${id}`);
  }
  getListFundSource(id: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getListFundSource',
      `/api/PaPayrollFund/GetListFundSource?id=${id}`,
    );
  }
  getMonth(year: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getMonth', `/api/PaPayrollFund/GetMonth?year=${year}`);
  }
}
