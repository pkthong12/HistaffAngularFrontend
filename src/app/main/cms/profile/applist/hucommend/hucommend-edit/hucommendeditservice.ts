import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumProfileInfoSector } from 'src/app/enum/EnumProfileInfoSector';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { ICoreAccordionItem } from 'src/app/libraries/core-accordion/core-accordion/core-accordion.component';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({ providedIn: 'root' })
export class HuCommendEditService extends BaseApiService {
  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) {
    super(commonHttpRequestService);
  }
  sectors: ICoreAccordionItem[] = [
    {
      id: EnumProfileInfoSector.BASIC,
      header: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND,
      open: true,
    },
    {
      id: EnumProfileInfoSector.CV,
      header: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_PAYMENT,
      open: true,
    },
  ];
  commendId!: number;
  getAllCommendObjByKey(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllCommendObjByKey',
      '/api/SysOrtherList/GetOtherListByType?typeCode=DTKT'
    );
  }
  getAllStatusByKey(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllStatusByKey',
      '/api/SysOrtherList/GetStatusCommend'
    );
  }
  getAllSourceByKey(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllSourceByKey',
      '/api/SysOrtherList/GetAllSourceByKey'
    );
  }
  getAllAwardTileByKey(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllAwardTileByKey',
      '/api/SysOrtherList/GetOtherListByType?typeCode=DHKT'
    );
  }
  getALLRewardByKey(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getALLRewardByKey',
      '/api/SysOrtherList/GetOtherListByType?typeCode=HTKT'
    );
  }
  getAllMonthByYear(year: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllMonthByYear',
      `/api/AtSalaryPeriod/GetAllMonthByYear?year=${year}`
    );
  }
  create(request: any): Observable<any> {
    return this.commonHttpRequestService.makePostRequest(
      'create',
      '/api/HuCommend/Create',
      request
    );
  }
  update(request: any): Observable<any> {
    return this.commonHttpRequestService.makePostRequest(
      'update',
      api.HU_COMMEND_UPDATE,
      request
    );
  }
}
