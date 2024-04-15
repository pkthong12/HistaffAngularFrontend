import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class HuProvinceEditService extends BaseApiService {
  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) {
    super(commonHttpRequestService);
  }

  getAllNation(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getScales',
      '/api/HuProvinceList/GetScalesNation'
    );
  }
}
