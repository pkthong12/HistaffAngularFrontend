import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class SeAuthorizeApproveEditService extends BaseApiService {
  constructor(public override commonHttpRequestService: CommonHttpRequestService) {
    super(commonHttpRequestService);
  }

  getProcess(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getProcess', '/api/SeAuthorizeApprove/GetProcess');
  }
  getLevelOrder(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getLevelOrder', `/api/SeAuthorizeApprove/GetLevelOrder`);
  }
}
