import { Injectable, isDevMode } from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse
} from '@angular/common/http';

import { AlertService } from '../libraries/alert/alert.service';
import { Observable, map } from 'rxjs';
import { noneAutoClosedAlertOptions } from '../constants/alertOptions';
import { AppConfigService } from '../services/app-config.service';
import { ResponseService } from '../services/response.service';
import { MultiLanguageService } from '../services/multi-language.service';
import { IFormatedResponse } from '../interfaces/IFormatedResponse';

@Injectable({
    providedIn: 'root'
})
export class ResponseInterceptor implements HttpInterceptor {

    constructor(private alertService: AlertService, private appConfigService: AppConfigService, private responseService: ResponseService, private mls: MultiLanguageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {

                if (event.ok && event.status === 200 && event.url?.indexOf(`${this.appConfigService.BASE_URL}`)!>=0 ) {
                    const body: IFormatedResponse = event.body;
                    this.responseService.resolve(body);
                } else {
                    if (isDevMode()) {
                        this.alertService.error(JSON.stringify(event, null, 2), noneAutoClosedAlertOptions)
                    }
                }

                if (isDevMode() && event.url?.indexOf(`${this.appConfigService.BASE_URL}/static/excel-templates/`)! < 0 && event.ok && event.status === 200 && (event.body.innerBody?.innerBody !== undefined)) {
                    this.alertService.error(`
                    Nested innerBody from ${event.url} response
                    innerBody bị lồng trong phản hồi từ ${event.url}  
                    `, noneAutoClosedAlertOptions)
                }
                if (isDevMode()
                    && event.url?.indexOf(`${this.appConfigService.BASE_URL}/static/excel-templates/`)! < 0
                    && event.url?.indexOf(`Xlsx/GenerateTemplate`)! < 0
                    && event.url?.indexOf(`Xlsx/ExportCorePageListGridToExcel`)! < 0
                    && event.url?.indexOf(`Xlsx/ImportXlsxToDb`)! < 0
                    && event.url?.indexOf(`XlsxReport/GetReport`)! < 0
                    && event.url?.indexOf(`Get2C_TCTW_98`)! < 0
                    && event.url?.indexOf(`Get2C_BNV_2008`)! < 0
                    && event.url?.indexOf(`PrintContractInfo`)! < 0
                    && event.url?.indexOf(`PrintHuWorking`)! < 0
                    && event.url?.indexOf(`ExportTempImportSalary`)! < 0
                    && event.url?.indexOf(`ExportTempImportTimeSheet`)! < 0
                    && event.url?.indexOf(`ImportTimeSheetDaily`)! < 0
                    && event.url?.indexOf(`ExportTempImportShiftSort`)! < 0
                    && event.url?.indexOf(`ImportShiftSort`)! < 0
                    && event.url?.indexOf(`ImportDeclareSeniority`)! < 0
                    && event.url?.indexOf(`ExportTempImportBasic`)! < 0
                    && event.url?.indexOf(`ImportRegisterLeave`)! < 0
                    && event.url?.indexOf(`ImportRegisterOT`)! < 0
                    && event.url?.indexOf(`ExportTemp`)! < 0
                    && event.url?.indexOf(`ImportTemp`)! < 0
                    && event.url?.indexOf(`Print`)! < 0
                    && !event.url?.startsWith('https://login.microsoftonline.com')
                    && event.ok && event.status === 200 && (event.body.innerBody === undefined || event.body.errorType === undefined || event.body.messageCode === undefined)) {
                    this.alertService.error(`
                    It looks like API controller with endpoint ${event.url} does not follow the rule of the App (must return Ok(FormatedResponse))
                    It is highly recommended to change the back end code. Otherwise your code might not work, or does work but NOT CORRECTLY!
                    `, noneAutoClosedAlertOptions)
                }
            } else {
                // console.log('event', event)
            }
            return event;
        }));
    }
}