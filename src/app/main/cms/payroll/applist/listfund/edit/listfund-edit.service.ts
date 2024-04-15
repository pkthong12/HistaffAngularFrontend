import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class ListfundEditService extends BaseApiService {
  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) {
    super(commonHttpRequestService);
  }

  getCompany(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getCompany',
      '/api/PaListfund/GetCompanyTypes'
    );
  }
  CreateCodeNew(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('CreateNewCode', '/api/PaListfund/CreateCodeNew');
  }

  //getListCompany():

}
