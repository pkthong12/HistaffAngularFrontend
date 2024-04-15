import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private appService: AppService
  ) { }

  getBase64Image(url: string): Observable<any> {
    return this.appService.post(api.GET_IMAGE_AS_BASE64, { url })
  }

}
