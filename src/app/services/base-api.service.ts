import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from './common-http-request.service';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  constructor(public commonHttpRequestService: CommonHttpRequestService) { }
}
