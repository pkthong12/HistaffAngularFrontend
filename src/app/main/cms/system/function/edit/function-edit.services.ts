import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionEditService  {

  constructor(
    public appService: AppService
  ) { 
  }

  getModules(): Observable<any> {
    return this.appService.get(api.SYS_MODULE_READ_ALL);
  }

  getFuncGroups(): Observable<any> {
    return this.appService.get(api.SYS_FUNCTION_GROUP_READ_ALL);
  }


}
