import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class HuWWardEditService extends BaseApiService {
  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) {
    super(commonHttpRequestService);
  }

  GetScalesProvince(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getScales',
      '/api/HuDistrict/GetScalesProvince'
    );
  }

  getCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCode', '/api/HuWard/CreateNewCode');
  }

  getAllNation(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getScalesnation',
      '/api/HuProvinceList/GetScalesNation'
    );
  }

  getProvinceById(x: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getProvinceById',`/api/HuWard/GetScalesProvince?id=${x}`,);
}
}
