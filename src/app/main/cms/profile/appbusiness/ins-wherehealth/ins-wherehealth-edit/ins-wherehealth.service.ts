import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({ providedIn: 'root' })
export class InsWhereHealEditService extends BaseApiService {
  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) {
    super(commonHttpRequestService);
  }
  getAllProvince(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllProvince',
      '/api/InsWhereHealTh/GetAllProvince'
    );
  }
  getALLDistrictByProvinceId(provinceId: any): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getALLDistrictByProvinceId',
      `/api/InsWhereHealTh/GetALLDistrictByProvinceId?provinceId=${provinceId}`
    );
  }
}
