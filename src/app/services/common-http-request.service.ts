import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, last, map } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',  
  /*
    Access-Control-Allow-Credentials allows the request to access cookies (including HttpOnly)
    to be improved: set it only when refreshing token
  */
  'Access-Control-Allow-Credentials': 'true' 
})

const cacheHeaders = new HttpHeaders({
  'Content-Type': 'application/json',  
  'Access-Control-Allow-Credentials': 'true',
  'cacheRequest': 'true',
})

const blobHeaders = new HttpHeaders({
  'responseType': 'blob', 
  'observe': 'response',
  /*
    Access-Control-Allow-Credentials allows the request to access cookies (including HttpOnly)
    to be improved: set it only when refreshing token
  */
  'Access-Control-Allow-Credentials': 'true' 
})

const baseUrlInterceptorSkipHeader = new HttpHeaders({
  'Content-Type': 'application/json',  
  'Access-Control-Allow-Credentials': 'true',
  'X-Skip-Interceptor': 'true'
})

@Injectable({
  providedIn: 'root'
})
export class CommonHttpRequestService {

  // private handleError: HandleError;

  constructor(
    private http: HttpClient,
    // httpErrorHandler: HttpErrorHandler
  ) {
    // this.handleError = httpErrorHandler.createHandleError('CommonHttpRequestService');
  }

  makePostRequest(name: string, relativeApiEndPoint: string, payload: any): Observable<any> {
    return this.http.post<any>(relativeApiEndPoint, payload, {
      headers: headers, observe: 'response', reportProgress: true, withCredentials: true,
    })
      .pipe(
        last(),
        // catchError(this.handleError(name))
      )
  }

  makeGetRequest(name: string, relativeApiEndPoint: string, cacheRequest: boolean = false): Observable<any> {
    return this.http.get<any>(relativeApiEndPoint, {
      headers: cacheRequest? cacheHeaders : headers, observe: 'response', reportProgress: true, withCredentials: true,
    })
      .pipe(
        map(response => response),
        last(), // :void return last (completed) message to caller
        // catchError(this.handleError(name))
      )
  }

  downloadFile(apiUrl: string, id: string): Observable<any> {
    const options = {
      responseType: 'blob' as 'json',
      params: { id: id }
    };

    return this.http.get(apiUrl, options);
  }
  
  makePostRequestReponseBlob(name: string, relativeApiEndPoint: string, payload: any): Observable<any> {
    return this.http.post(relativeApiEndPoint, payload, {
      headers: headers,
      observe: 'response',
      reportProgress: true,
      withCredentials: true,
      responseType: 'blob' // add 'responseType' to headers
    }).pipe(
      map(response => response),
      last(),
      // catchError(this.handleError(name))
    );
  }

  makePostRequestFullUrl(relativeApiEndPoint: string, payload: any): Observable<any> {
    return this.http.post<any>(relativeApiEndPoint, payload, {
      headers: baseUrlInterceptorSkipHeader, observe: 'response', reportProgress: true, withCredentials: true,
    })
      .pipe(
        last(),
      )
  }

  makeGetRequestFullUrl(relativeApiEndPoint: string): Observable<any> {
    return this.http.get<any>(relativeApiEndPoint, {
      headers: baseUrlInterceptorSkipHeader, observe: 'response', reportProgress: true, withCredentials: true,
    })
      .pipe(
        last(),
      )
  }
}