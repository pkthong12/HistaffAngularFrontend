import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';


@Injectable({
  providedIn: 'root'
})
export class WorkingService extends BaseApiService{

  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) { 
    super(commonHttpRequestService)
  }
  
  getWorkingByEmployee(employeeId: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getWorkingByEmployee', '/api/HuWorking/GetWorkingByEmployee?id=' + employeeId);
  }
}
