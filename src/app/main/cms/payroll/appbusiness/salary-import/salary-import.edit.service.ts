import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class SalaryImportService extends BaseApiService {
  constructor(public override commonHttpRequestService: CommonHttpRequestService) {
    super(commonHttpRequestService);
  }
  GetListSalaries(x: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('GetListSalaries', `/api/PaSalImport/GetListSalaries?id=${x}`);
  }
}
