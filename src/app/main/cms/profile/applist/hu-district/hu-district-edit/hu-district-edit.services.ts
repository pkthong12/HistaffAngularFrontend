import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class HuDistrictEditService extends BaseApiService {
  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) {
    super(commonHttpRequestService);
  }

  getAllProvince(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getScales',
      '/api/HuDistrict/GetScalesProvince'
    );
  }

  getCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCode', '/api/HuDistrict/CreateNewCode');
  }

  getAllNation(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getScalesnation',
      '/api/HuProvinceList/GetScalesNation'
    );
  }
}
