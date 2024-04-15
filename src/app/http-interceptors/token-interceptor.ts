/*
Tannv: This code is based on the original blog post of Alexandru Bereghici
https://itnext.io/angular-tutorial-implement-refresh-token-with-httpinterceptor-bfa27b966f57
*/

import { filter, finalize, switchMap, tap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, catchError } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AppInitializationService } from '../services/app-initialization.service';

import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        // Get access token from Local Storage
        const accessToken = this.authService.getAuthorizationToken();

        // If access token is null this means that user is not logged in
        // And we return the original request
        if (!accessToken) {
            return request;
        }

        // We clone the request, because the original request is immutable
        return request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + accessToken)
        });
    }

    private refreshTokenInProgress = false;
    // Refresh Token Subject tracks the current token, 
    // or is null if no token is currently available (e.g. refresh pending).
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );

    constructor(
        private authService: AuthService,
        private appInitializationService: AppInitializationService,
        private router: Router
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url === undefined) {
            return next.handle(req);
        }

        if (req.url.startsWith('https://')) {
            return next.handle(req);
        }

        if (req.url.includes("app.config.json")) {
            console.log("app.config.json excluded")
            return next.handle(req);
        }
        if (req.url.includes("GenerateTemplate")) {
            console.log("GenerateTemplate excluded")
            return next.handle(req);
        }
        if (req.url.includes("ExportCorePageListGridToExcel")) {
            console.log("ExportCorePageListGridToExcel excluded")
            return next.handle(req);
        }

        let ok: string;
        // extend server response observable with logging
        return next.handle(req)
            .pipe(
                tap({
                    // Succeeds when there is a response; ignore other events
                    next: event => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
                    error: () => { } // we do not implement the logic here
                }),
                // But here:
                // Operation failed; error is an HttpErrorResponse
                catchError((response: any) => {

                    console.log("TokenInterceptor Error: ", req, response)

                    // We don't want to refresh token for some requests 
                    // like login or refresh token itself
                    // So we verify url and we throw an error if it's the case
                    if (
                        req.url.toUpperCase().includes('LOGIN') ||
                        req.url.toUpperCase().includes('REFRESH_TOKEN') ||
                        req.url.toUpperCase().includes('REFRESHTOKEN')
                    ) {
                        // We do another check to see if refresh token failed
                        // In this case we want to logout user and to redirect it to login page

                        if (
                            req.url.toUpperCase().includes('REFRESH_TOKEN') ||
                            req.url.toUpperCase().includes('REFRESHTOKEN')

                        ) {
                            this.appInitializationService.initializing$.next(false);
                            this.authService.userLogout().subscribe(x => {
                                if (x.ok && x.status === 200) {
                                    this.authService.postLogout();
                                }
                            })

                        }

                        return throwError(() => new Error(JSON.stringify(response)));

                    }

                    // If error status is different than 401 
                    // we want to skip refresh token
                    // So we check that and throw the error if it's the case
                    if (response.status !== 401) {
                        return throwError(() => new Error(response.error));
                    }

                    if (this.refreshTokenInProgress) {
                        // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
                        // – which means the new token is ready and we can retry the request again
                        return this.refreshTokenSubject.pipe(
                            // filter: Emit values that pass the provided condition
                            filter(result => result !== null),

                            take(1),
                            /*
                            The main difference between switchMap and other flattening operators is the cancelling effect. On each emission the previous inner observable (the result of the function you supplied) is cancelled and the new observable is subscribed. You can remember this by the phrase switch to a new observable.
                            */
                            switchMap(() => next.handle(this.addAuthenticationToken(req)))
                        )
                    } else {
                        console.error(response.error?.message.toUpperCase() || response);
                        this.refreshTokenInProgress = true;

                        // Set the refreshTokenSubject to null 
                        // so that subsequent API calls will wait
                        // until the new token has been retrieved
                        this.refreshTokenSubject.next(null);

                        // Call auth.refreshAccessToken
                        // (this is an Observable that will be returned)

                        const refreshTokenReq = this.authService.tryRestoreSession();

                        return refreshTokenReq.pipe(
                            /*
                            The main difference between switchMap and other flattening operators is the cancelling effect. On each emission the previous inner observable (the result of the function you supplied) is cancelled and the new observable is subscribed. You can remember this by the phrase switch to a new observable.
                            */
                            switchMap((response: any) => {
                                let token = '';

                                if (response.ok && response.status === 200) {
                                    this.authService.data$.next(response.body);
                                    this.authService.authenticated$.next(true);
                                    token = response.body.jwtToken;
                                }

                                // When the call to refreshToken completes 
                                // we reset the refreshTokenInProgress to false
                                // for the next time the token needs to be refreshed
                                this.refreshTokenInProgress = false;
                                this.refreshTokenSubject.next(token);
                                const newReq = this.addAuthenticationToken(req);
                                return next.handle(newReq);
                            }),
                            catchError((err: any) => {
                                this.refreshTokenInProgress = false;

                                console.log("refreshTokenReq catchError", err)
                                debugger
                                this.authService.userLogout().subscribe(x => {
                                    if (x.ok && x.status === 200) {
                                        this.authService.postLogout();
                                    }
                                })

                                return throwError(() => new Error(err));
                            })
                        )
                    }
                }),
                // Log when response observable either completes or errors
                finalize(() => { })
            );
    }

}