import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class TrPlanEditService extends BaseApiService {
  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) {
    super(commonHttpRequestService);
  }
  getAllOrg(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllOrg',
      '/api/TrPlan/GetAllOrg'
    );
  }
  getAllCourse(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllCourse',
      '/api/TrPlan/GetAllCourse'
    );
  }
  getAllCenter(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllCenter',
      '/api/TrPlan/GetAllCenter'
    );
  }
}
