import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { IQueryListRequest } from 'src/app/interfaces/IQueryListRequest';

@Injectable({
  providedIn: 'root'
})
export class DisciplineEditService extends BaseApiService {

  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) { 
    super(commonHttpRequestService)
  }

  getStatusList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getStatusList', '/api/SysOrtherList/GetOtherListByType?typeCode=STATUS');
  }
  getDisObjList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getDisObjList', '/api/SysOrtherList/GetOtherListByType?typeCode=DISCIPLINE_OBJ');
  }
  getDisTypeList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getDisTypeList', '/api/SysOrtherList/GetOtherListByType?typeCode=DISCIPLINE_TYPE');
  }
  getDecisionTypeList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getDecisionTypeList', '/api/SysOrtherList/GetOtherListByType?typeCode=DECISION_TYPE');
  }
  getPeriodList(year: Number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getPeriodList', '/api/HuDiscipline/GetPeriod?year=' + year)
  }

}
