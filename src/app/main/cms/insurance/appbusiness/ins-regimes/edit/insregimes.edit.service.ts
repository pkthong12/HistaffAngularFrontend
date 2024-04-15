import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class InsRegimesEditService extends BaseApiService {
  getCode() {
    throw new Error('Method not implemented.');
  }
  constructor(public override commonHttpRequestService: CommonHttpRequestService) {
    super(commonHttpRequestService);
  }

  GetInsGroup(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('GetInsGroup', '/api/InsRegimes/GetInsGroup');
  }
  GetCalDateType(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('GetCalDateType', '/api/InsRegimes/GetCalDateType');
  }
  CreateNewCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('CreateNewCode', '/api/InsRegimes/CreateNewCode');
  }
  CreateNewCodeInsGroup(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('CreateNewCodeInsGroup', '/api/InsGroup/CreateNewCode');
  }
}
