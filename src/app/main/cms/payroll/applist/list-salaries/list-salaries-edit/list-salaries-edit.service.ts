import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root'
})
export class ListSalariesEditService extends BaseApiService {

  private objectId = new BehaviorSubject<number>(0);
  private salariesSelected = new BehaviorSubject<number>(0);
  currentsalariesSelected = this.salariesSelected.asObservable();
  currentobjectId = this.objectId.asObservable();
  
  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) { 
    super(commonHttpRequestService)
  }


  getObjSal(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getObjSal', '/api/PaListsalaries/GetObjSal');
  }
  getGroupType(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getGroupType', '/api/PaListsalaries/GetGroupType');
  }
  getDataType(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getDataType', '/api/PaListsalaries/GetDataType');
  }
  getListSal(idSymbol: any): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getListSal', `/api/PaListsalaries/GetListSal?idSymbol=${idSymbol}`);
  }

  getListSalaries(idObjectSal: any): Observable<any>{
    return this.commonHttpRequestService.makeGetRequest('getListSalaries', `/api/PaListsalaries/GetListSalaries?idObjectSal=${idObjectSal}`);
  }

  choseObjectSal(objectId: number) {
    //objectId = 1519;//id Tong cong ty thep viet nam
    this.objectId.next(objectId);
  }
}
