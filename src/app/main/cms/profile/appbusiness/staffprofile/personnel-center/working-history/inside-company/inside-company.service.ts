import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';


@Injectable({
  providedIn: 'root'
})
export class InsideCompanyService extends BaseApiService{

  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) { 
    super(commonHttpRequestService)
  }
  
  getInsideCompanyByEmployee(employeeId: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getWorkingBeforeByEmployee', '/api/HuWorking/GetInsideCompanyByEmployee?id=' + employeeId);
  }
}
