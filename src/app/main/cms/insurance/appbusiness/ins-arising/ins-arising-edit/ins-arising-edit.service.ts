import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { IQueryListRequest } from 'src/app/interfaces/IQueryListRequest';

@Injectable({
  providedIn: 'root'
})
export class InsArisingEditService extends BaseApiService {

  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) { 
    super(commonHttpRequestService)
  }

  GetProvince(url: string): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('queryList', url);
  }
}
