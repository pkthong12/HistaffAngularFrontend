import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonHttpRequestService } from './common-http-request.service';

declare let XLSX: any;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private commonHttpRequestService: CommonHttpRequestService) { }

  get(url: string, cacheRequest: boolean = false): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('get', url, cacheRequest)
  }

  post(url: string, payload: any): Observable<any> {
    console.log("appService post", url)
    return this.commonHttpRequestService.makePostRequest('post', url, payload)
  }

  getFullUrl(url: string): Observable<any> {
    return this.commonHttpRequestService.makeGetRequestFullUrl(url)
  }

  postFullUrl(url: string, payload: any): Observable<any> {
    console.log("appService post", url)
    return this.commonHttpRequestService.makePostRequestFullUrl(url, payload)
  }

  blobPost(url: string, payload: any): Observable<any> {
    return this.commonHttpRequestService.makePostRequestReponseBlob('post', url, payload)
  }

  public readExcel(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      if (file) {
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = () => {
          var workbook = XLSX.read(reader.result, { type: "binary", cellDates: true });
          var worksheet = workbook.Sheets[workbook.SheetNames[0]];
          var data = XLSX.utils.sheet_to_json(worksheet);
          resolve(data);
        };
      } else {
        reject();
      }
    });
  }
  
}
