import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({ providedIn: 'root' })
export class HuEvaluateEditService extends BaseApiService {
  employeeConcurrentId!: number
  employeeId!: number
  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) {
    super(commonHttpRequestService);
  }
  pointFrom!: number;
  getAllEvaluate(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllEvaluate',
      '/api/SysOrtherList/GetEvaluateType'
    );
  }
  getReprensentative(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getReprensentative',
      '/api/HuClassification/GetReprensentative'
    );
  }
  getSatffAssessment(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getSatffAssessment',
      '/api/HuClassification/GetSatffAssessment'
    );
  }
}
