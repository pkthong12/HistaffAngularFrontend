import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class TimeZoneInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const modifiedReq = req.clone({
      headers: req.headers.set('Angular-Local-Time-Zone-Iana', Intl.DateTimeFormat().resolvedOptions().timeZone),
    });

    return next.handle(modifiedReq);
  }
}