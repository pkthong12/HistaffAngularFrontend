import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root'
})
export class CorePageEditService {

  fromUrl: string = '';

  constructor(private commonHttpRequestService: CommonHttpRequestService) { }

  getById(id: number | string, r: string): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getById', r + "?id=" + id);
  }
}
