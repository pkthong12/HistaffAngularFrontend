import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from './common-http-request.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { api } from '../constants/api/apiDefinitions';
import { ISysLanguage } from '../interfaces/entitiesCamelCase/ISysLanguage';

@Injectable({
  providedIn: 'root'
})
export class MultiLanguageService {

  lang$ = new BehaviorSubject<string>('vi');
  data$ = new BehaviorSubject<ISysLanguage[]>([]);
  

  constructor(private commonHttpRequestService: CommonHttpRequestService) { }

  readAll(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('languageReadAll', api.SYS_LANGUAGE_READ_ALL);
  }

  readAllMini(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('languageReadAll', api.SYS_LANGUAGE_READ_ALL_MINI, true);
  }

  trans(key: string, lang: string = this.lang$.value): string {
    const filter = this.data$.value.filter(x => x.key === key);
    if (filter.length) {
      switch (lang) {
        case 'vi':
          return filter[0].vi;
        case 'en':
          return filter[0].en;
        default:
          return key;
      }
    } else {
      return key;
    }
  }

}
