import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class InsRegionEditService extends BaseApiService {
  constructor(public override commonHttpRequestService: CommonHttpRequestService) {
    super(commonHttpRequestService);
  }

  GetSalaryBasicByRegion(regionCode : string) : Observable<any>{
    return this.commonHttpRequestService.makeGetRequest('GetSalaryBasicByRegion', `/api/InsRegion/GetSalaryBasicByRegion?code=${regionCode}`);
  }
  getSysOrtherList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getSysOrtherList', '/api/InsRegion/GetSysOrtherList');
  }
}

