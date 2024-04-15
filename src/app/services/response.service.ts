import { Injectable, isDevMode } from '@angular/core';

import { AlertService } from '../libraries/alert/alert.service';
import { MultiLanguageService } from './multi-language.service';

import { IFormatedResponse } from '../interfaces/IFormatedResponse';
import { alertOptions } from '../constants/alertOptions';
import { EnumErrorType } from '../enum/EnumErrorType';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(
    private alertService: AlertService,
    private mls: MultiLanguageService
  ) { }

  resolve(body: IFormatedResponse): void {

    if (body.statusCode === 200) {
      if (body.messageCode !== 'QUERY_LIST_SUCCESS') {
        this.alertService.success(this.mls.trans(body.messageCode), alertOptions);
      }
    } else {
      if (body.errorType === EnumErrorType.CATCHABLE) {
        this.alertService.warn(this.mls.trans(body.messageCode), alertOptions);
      } else {
        if (isDevMode()) {
          this.alertService.error(this.mls.trans(body.messageCode), alertOptions);
        }
      }
    }
  }
}
