import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable()
export class OtherlistTypeEditService extends BaseApiService {

    constructor(
        public override commonHttpRequestService: CommonHttpRequestService
      ) { 
        super(commonHttpRequestService)
      }

}
