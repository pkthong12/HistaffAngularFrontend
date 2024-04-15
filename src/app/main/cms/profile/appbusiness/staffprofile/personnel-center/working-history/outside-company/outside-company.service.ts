import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';


@Injectable({
  providedIn: 'root'
})
export class OutsideCompanyService extends BaseApiService{

  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) { 
    super(commonHttpRequestService)
  }
  
  getWorkingBeforeByEmployee(employeeId: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getWorkingBeforeByEmployee', '/api/HuWorkingBefore/GetWorkingBeforeByEmployee?id=' + employeeId);
  }
}
