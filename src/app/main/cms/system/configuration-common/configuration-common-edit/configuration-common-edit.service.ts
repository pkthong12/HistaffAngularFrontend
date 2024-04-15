// thêm thư viện
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';


// khai báo bộ trang trí (decorator)
@Injectable({
  providedIn: 'root',
})


// khai báo lớp "ConfigurationCommonEditService"
// kế thừa lớp "BaseApiService"
export class ConfigurationCommonEditService extends BaseApiService {
  // đây là hàm khởi tạo
  constructor(public override commonHttpRequestService: CommonHttpRequestService) {
    super(commonHttpRequestService);
  }


  // khai báo phương thức
  public CreateNewCode(): Observable<any> {
    // có lẽ sau này phải điều chỉnh lại API
    return this.commonHttpRequestService.makeGetRequest('CreateNewCode', '/api/SeProcess/CreateNewCode');
  }


  // khai báo phương thức
  public GetProcessType(): Observable<any> {
    // có lẽ sau này phải điều chỉnh lại API
    return this.commonHttpRequestService.makeGetRequest('GetProcessType', '/api/SeProcess/GetProcessType');
  }
}
