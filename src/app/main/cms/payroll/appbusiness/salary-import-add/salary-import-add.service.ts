import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class SalaryImportAddService extends BaseApiService {
  constructor(public override commonHttpRequestService: CommonHttpRequestService) {
    super(commonHttpRequestService);
  }
  getListSalaries(x: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getListSalaries', `/api/PaSalImportAdd/GetListSalaries?id=${x}`);
  }
}
