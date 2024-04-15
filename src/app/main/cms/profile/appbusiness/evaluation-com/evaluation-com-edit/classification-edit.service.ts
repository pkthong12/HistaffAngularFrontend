import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { IQueryListRequest } from 'src/app/interfaces/IQueryListRequest';

@Injectable({
  providedIn: 'root'
})
export class ClassificationEditService extends BaseApiService {

  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) { 
    super(commonHttpRequestService)
  }

  getClassificationTypeList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getClassificationTypeList', '/api/SysOrtherList/GetOtherListByType?typeCode=CLASSIFICATION_TYPE');
  }
  getClassificationLevelList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getClassificationLevelList', '/api/SysOrtherList/GetOtherListByType?typeCode=CLASSIFICATION_LEVEL');
  }
  getCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCode', '/api/HuClassification/CreateCodeAuto');
  }

  // tạo phương thức layXepLoaiDanhGia()
  layXepLoaiDanhGia(): Observable<any> {
    // cái CLASSIFICATION_TYPE = 1091
    // chính là Đảng 
    return this.commonHttpRequestService.makeGetRequest('layXepLoaiDanhGia', '/api/HuEvaluationCom/LayXepLoaiDanhGia?code=LXL03');
  }
}
