import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumProfileInfoSector } from 'src/app/enum/EnumProfileInfoSector';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { ICoreAccordionItem } from 'src/app/libraries/core-accordion/core-accordion/core-accordion.component';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class InsRegimesMngEditService {
  sectors: ICoreAccordionItem[] = [
    {
      id: EnumProfileInfoSector.BASIC,
      header: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH_GENERAL,
      open: true,
      required: true,
    },
    {
      id: EnumProfileInfoSector.CV,
      header: EnumTranslateKey.INS_REGIMES_MNG_INFO_REGIMES,
      open: true,
      required: true,
    },
    {
      id: EnumProfileInfoSector.ADDITIONAL_INFO,
      header: EnumTranslateKey.INS_REGIMES_MNG_INFO_INSURANCE_APPROVE,
      open: true,
    },
  ];

  constructor(private commonHttpRequestService: CommonHttpRequestService) {}

  getRegimesByGroupId(x: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getRegimesByGroupId', `/api/InsRegimesMng/getRegimesByGroupId?id=${x}`);
  }

  getChildrenRegimesId(x: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getChildrenRegimesId', `/api/InsRegimesMng/getChildrenRegimesId?id=${x}`);
  }
  getInforByEmployeeId(x: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getRegimes', `/api/InsRegimesMng/GetInforByEmployeeId?id=${x}`);
  }
  getAllGroup(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getAllGroup', `/api/InsRegimesMng/GetAllGroup`);
  }
}
