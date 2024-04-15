import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IQueryListRequest } from 'src/app/interfaces/IQueryListRequest';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { api } from 'src/app/constants/api/apiDefinitions';
import { BaseApiService } from 'src/app/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftSortService extends BaseApiService {
    private selectedYear = new BehaviorSubject<number>((new Date()).getFullYear()); 
    private periodId = new BehaviorSubject<number>(0);
    private employeeSelected = new BehaviorSubject<number>(0);
    private listEmployeeSelected = new BehaviorSubject<number[]>([]);
    private minDate = new BehaviorSubject<string>("");
    private maxDate = new BehaviorSubject<string>("");
    currentSelectedYear = this.selectedYear.asObservable();
    currentemployeeSelected = this.employeeSelected.asObservable();
    currentListEmployeeSelected = this.listEmployeeSelected.asObservable();
    currentperiodId = this.periodId.asObservable();
    currentMinDate = this.minDate.asObservable();
    currentMaxDate = this.maxDate.asObservable();

  
    constructor(
      public override commonHttpRequestService: CommonHttpRequestService,
    ){ 
        super(commonHttpRequestService)
    }

    changeSelectedYear(year: number){
      this.selectedYear.next(year);
    }
  
    changeperiodID(id: number) {
      this.periodId.next(id);
    }

    changeEmployeeSelected(id: number){
      this.employeeSelected.next(id);
    }

    changeListEmployeeSelected(id: any[]){
      this.listEmployeeSelected.next(id);
    }

    changeMinDate(minDate: string){
      this.minDate.next(minDate);
    }

    changeMaxDate(maxDate: string){
      this.maxDate.next(maxDate);
    }

    getCurrentPeriodSalary(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest('getCurrentPeriodSalary', '/api/AtWorksign/GetCurrentPeriodSalary');
    }
}
