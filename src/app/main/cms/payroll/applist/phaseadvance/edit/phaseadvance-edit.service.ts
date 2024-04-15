import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiService } from "src/app/services/base-api.service";
import { CommonHttpRequestService } from "src/app/services/common-http-request.service";

@Injectable({
    providedIn:'root',
})
export class PhaseAdvanceEditService extends BaseApiService{
    constructor(
        public override commonHttpRequestService: CommonHttpRequestService
    ){
        super(commonHttpRequestService);
    }

    getYearPeriod():Observable<any>{
        return this.commonHttpRequestService.makeGetRequest(
            'getYearPeriod',
            '/api/PaPhaseAdvance/GetYearPeriod'
        );
    }

    getOrg():Observable<any>{
        return this.commonHttpRequestService.makeGetRequest('getOrg', '/api/PaPhaseAdvance/GetOrgId');
    }

    getPeriodBonus(x: number): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest(
          'getPeriodBonus',
          `/api/PaPhaseAdvance/GetMonthPeriodAt?id=${x}`,
        );
    }

    getYearByPeriod(x: number):Observable<any>{
        return this.commonHttpRequestService.makeGetRequest('getYearByPeriod',
        `/api/PaPhaseAdvance/GetYearByPeriod?id=${x}`);
    }

    getAtSymbol():Observable<any>{
        return this.commonHttpRequestService.makeGetRequest('getAtSymbol',
        '/api/PaPhaseAdvance/getAtSymbol');
    }
}