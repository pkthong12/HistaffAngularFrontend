import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';


@Injectable({
  providedIn: 'root'
})


export class CallDataService extends BaseApiService {
  // hàm khởi tạo
  constructor(
    // khai báo thuộc tính
    public override commonHttpRequestService: CommonHttpRequestService
  )
  {
    // truyền tham số cho hàm khởi tạo của lớp kế thừa
    super(commonHttpRequestService);
  }


  // khai báo phương thức layDanhSachTrangThai()
  public layDanhSachTrangThai(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('layDanhSachTrangThai', '/api/HuCertificateEdit/GetListNameOfApprove');
  }
}
