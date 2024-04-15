import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class SeProcessEditService extends BaseApiService {
  constructor(public override commonHttpRequestService: CommonHttpRequestService) {
    super(commonHttpRequestService);
  }
  CreateNewCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('CreateNewCode', '/api/SeProcess/CreateNewCode');
  }
  GetProcessType(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('GetProcessType', '/api/SeProcess/GetProcessType');
  }
}
