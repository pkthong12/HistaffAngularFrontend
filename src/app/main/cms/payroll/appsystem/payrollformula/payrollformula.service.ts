import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IQueryListRequest } from 'src/app/interfaces/IQueryListRequest';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { BaseApiService } from 'src/app/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class PayrollFormulaService extends BaseApiService {
    private objSalaryId$ = new BehaviorSubject<number>(0);
    currentObjSalary = this.objSalaryId$.asObservable();

    constructor(
      public override commonHttpRequestService: CommonHttpRequestService,
    ){ 
        super(commonHttpRequestService)
    }

    changeObjSalaryId(id: number){
      this.objSalaryId$.next(id);
    }

    
}
