import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { AppConfigService } from '../services/app-config.service';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable({
    providedIn: 'root'
})
export class BaseUrlInterceptor implements HttpInterceptor {

    constructor(private appConfigService: AppConfigService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.url === undefined) {
            return next.handle(req);
        }

        if (req.url.startsWith('http')) {
            return next.handle(req);
        }

        if (req.headers.has(InterceptorSkipHeader)) {
            const headers = req.headers.delete(InterceptorSkipHeader);
            return next.handle(req.clone({ headers }));
        }

        const addBaseUrlReq = req.clone({
            url: this.appConfigService.BASE_URL + req.url
        });

        return next.handle(addBaseUrlReq);
    }
}