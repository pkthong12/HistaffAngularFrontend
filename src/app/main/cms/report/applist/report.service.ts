import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IQueryListRequest } from 'src/app/interfaces/IQueryListRequest';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { api } from 'src/app/constants/api/apiDefinitions';
import { BaseApiService } from 'src/app/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseApiService {
    
    constructor(
      public override commonHttpRequestService: CommonHttpRequestService,
    ){ 
        super(commonHttpRequestService)
    }

    getCurrentPeriodSalary(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest('getCurrentPeriodSalary', '/api/AtWorksign/GetCurrentPeriodSalary');
    }
}
