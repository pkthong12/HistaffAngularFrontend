import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQueryListRequest } from 'src/app/interfaces/IQueryListRequest';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { api } from 'src/app/constants/api/apiDefinitions';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { }

  languageList(request: IQueryListRequest): Observable<any> {
    return this.commonHttpRequestService.makePostRequest('languageList', api.SYS_LANGUAGE_QUERY_LIST, request)
  }


}
