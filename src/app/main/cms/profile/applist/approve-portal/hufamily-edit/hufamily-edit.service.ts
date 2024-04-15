import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiService } from "src/app/services/base-api.service";
import { CommonHttpRequestService } from "src/app/services/common-http-request.service";

@Injectable({ providedIn: 'root' })
export class HuFamilyEditService extends BaseApiService {
  familyId!: number;
  constructor(
    public override commonHttpRequestService: CommonHttpRequestService
  ) {
    super(commonHttpRequestService);
  }
 
  getAllHuFamilyEdit(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllHuFamilyEdit',
      '/api/ApproveHuFamilyEdit/GetAllHuFamilyEdit',
    );
  }
}