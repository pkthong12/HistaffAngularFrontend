import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { IQueryListRequest } from 'src/app/interfaces/IQueryListRequest';

@Injectable({
  providedIn: 'root'
})
export class SeProcessApproveEditService extends BaseApiService {
  processId!: number | null;
  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) { 
    super(commonHttpRequestService)
  }

  getLevelOrder(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getLevelOrder', '/api/SeProcessApprove/GetLevelOrder');
  }

  getListProcess(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getListProcess', '/api/SeProcessApprove/GetListProcess');
  }
}
