import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class SeDocumentEditService extends BaseApiService {
  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) {
    super(commonHttpRequestService);
  }

  getDucumentType(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getDucumentType',
      '/api/SeDocument/GetDucumentType'
    );
  }

    getCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCode', '/api/SeDocument/GetCode');
  }
}
