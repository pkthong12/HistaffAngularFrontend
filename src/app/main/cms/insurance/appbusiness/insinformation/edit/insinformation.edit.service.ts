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
export class InsInformationEditService extends BaseApiService {
  sectors: ICoreAccordionItem[] = [
    {
      id: EnumProfileInfoSector.BASIC,
      header: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH_GENERAL,
      open: true,
      required: true,
    },
    {
      id: EnumProfileInfoSector.CV,
      header: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH_CAPTION,
      open: true,
      required: true,
    },
    {
      id: EnumProfileInfoSector.CHARRACT,
      header: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHYT_CAPTION,
      open: true,
      required: true,
    },
    {
      id: EnumProfileInfoSector.EDUCATION,
      header: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHTN_CAPTION,
      open: true,
      required: true,
    },
  ];

  id!: number;

  constructor(public override commonHttpRequestService: CommonHttpRequestService) {
    super(commonHttpRequestService);
  }
  getInforById(x: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getInforById', `/api/InsInformation/GetInforById?id=${x}`);
  }
  GetLstInsCheck(x: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('GetLstInsCheck', `/api/InsInformation/GetLstInsCheck?id=${x}`);
  }
  getBhxhStatus(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getBhxhStatus', '/api/InsInformation/getBhxhStatus');
  }
  getBhYtStatus(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getBhYtStatus', '/api/InsInformation/getBhYtStatus');
  }
  getInsWhereHealth(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getInsWhereHealth', `/api/InsInformation/GetInsWhereHealth`);
  }

  create(request: any): Observable<any> {
    return this.commonHttpRequestService.makePostRequest('create', '/api/InsInformation/Create', request);
  }
  update(request: any): Observable<any> {
    return this.commonHttpRequestService.makePostRequest('update', '/api/InsInformation/Update', request);
  }
}
