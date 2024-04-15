import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api } from "src/app/constants/api/apiDefinitions";
import { CommonHttpRequestService } from "src/app/services/common-http-request.service";

@Injectable({
    providedIn: 'root'
})
export class WarningService{
    constructor(
        private commonHttpRequestService: CommonHttpRequestService
      ) { }

      createRange(request: any): Observable<any> {
        return this.commonHttpRequestService.makePostRequest("CreateRange", api.SE_REMINDER_CREATERANGE, request)
      }

      updateRange(request: any): Observable<any> {
        return this.commonHttpRequestService.makePostRequest("UpdateRange", api.SE_REMINDER_UPDATERANGE, request)
      }

      readAll(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest("UpdateRange", api.SE_REMINDER_READALL)
      }

}