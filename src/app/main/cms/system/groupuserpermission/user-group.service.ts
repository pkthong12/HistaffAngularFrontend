import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';

import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  constructor(private commonHttpRequestService: CommonHttpRequestService) { }

  getAllUserGroups(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getAllUserGroups', api.SYS_GROUP_READ_ALL)
  }
}
