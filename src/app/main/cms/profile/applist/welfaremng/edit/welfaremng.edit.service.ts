import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root'
})
export class WelfareMngEditService extends BaseApiService {

  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) { 
    super(commonHttpRequestService)
  }

  getWelfares(effectDate: any): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getWelfares', `/api/HuWelfare/GetList/?effectDate=${effectDate}&expireDate=06-08-2023`);
  }

}
