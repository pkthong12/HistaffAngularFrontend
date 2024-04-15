import { Injectable } from "@angular/core";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { CommonHttpRequestService } from "src/app/services/common-http-request.service";


@Injectable({ providedIn: 'root' })
export class ApproveStaffProfileService {
    tabActiveIndex!: number;
    tabActiveHeader!: EnumTranslateKey;

    constructor(
        private commonHttpRequestService: CommonHttpRequestService
    ) { }
}
