import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root'
})
export class ContractTypeEditService extends BaseApiService {

  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) { 
    super(commonHttpRequestService)
  }

  checkCodeExists(code:string): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('checkCodeExists', api.HU_CONTRACT_TYPE_CHECK_CODE_EXISTS + code);
  }

  
}
