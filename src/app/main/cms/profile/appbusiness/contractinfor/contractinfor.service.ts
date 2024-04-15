import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { BaseApiService } from 'src/app/services/base-api.service';

@Injectable({
  providedIn: 'root'
})

export class ContractInforService extends BaseApiService {
    private employeeSelected = new BehaviorSubject<number>(0);
    private listEmployeeSelected = new BehaviorSubject<number[]>([]);
    
    
    currentemployeeSelected = this.employeeSelected.asObservable();
    currentListEmployeeSelected = this.listEmployeeSelected.asObservable();

  
    constructor(
      public override commonHttpRequestService: CommonHttpRequestService,
    ){ 
        super(commonHttpRequestService)
    }

    changeEmployeeSelected(id: number){
      this.employeeSelected.next(id);
    }

    changeListEmployeeSelected(id: any[]){
      this.listEmployeeSelected.next(id);
    }
}
