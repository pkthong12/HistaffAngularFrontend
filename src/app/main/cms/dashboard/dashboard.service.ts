import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { api } from 'src/app/constants/api/apiDefinitions';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  originalIds$ = new BehaviorSubject<number[]>([]);
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { }

  getDashboard(): Observable<any> {
    const fullUrl = api.HR_GET_DASHBOARD;
    return this.commonHttpRequestService.makeGetRequest('getDashboard', fullUrl).pipe(
      filter(x => x.body.statusCode === "200"),
      map(x => x.body.data)
    );
  }

}
