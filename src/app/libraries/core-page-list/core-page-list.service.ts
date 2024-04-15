import { Injectable } from '@angular/core';
import {
  IInOperator,
  IQueryListRequest,
} from 'src/app/interfaces/IQueryListRequest';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IIdsRequest } from 'src/app/interfaces/IIdsRequest';
import { ICorePageListInstance } from './ICorePageListInstance';
import { AlertService } from '../alert/alert.service';
import { AppService } from 'src/app/services/app.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { api } from 'src/app/constants/api/apiDefinitions';

export enum EnumExType {
  EX_STRING = 1,
  EX_NUMBER = 2,
  EX_BOOLEAN = 3,
  EX_DATE = 4,
}

export interface IExEntity {
  entityName: string;
  executeOrder: number;
  exColumns: IExColumn[];
}

export interface IExColumn {
  entityName: string;
  columnName: string;
  type: EnumExType;
  executeOrder: number;
  pkEntityName?: string;
  pkBoundColumnName?: string;
  pkShownColumnName?: string;
  pkFilterColumnName?: string;
  pkFilterColumnValue?: string;
}

export interface IGenerateTemplateRequest {
  exCode: string;
  lang: string;
}

export interface IImportXlsxToDbRequest {
  fileName: string;
  exCode: string;
  base64String: string;
}

@Injectable({
  providedIn: 'root',
})
export class CorePageListService {
  instances: ICorePageListInstance[] = [];

  /* Fire and forget */
  tmpFilter$ = new BehaviorSubject<any>(null);
  tmpInOperators$ = new BehaviorSubject<IInOperator[]>([]);
  /*****/

  constructor(
    private commonHttpRequestService: CommonHttpRequestService,
    private alertService: AlertService,
    private mls: MultiLanguageService,
    private httpClient: HttpClient,
    private appService: AppService
  ) {}

  queryList(request: IQueryListRequest, url: string): Observable<any> {
    return this.commonHttpRequestService.makePostRequest(
      'queryList',
      url,
      request
    );
  }

  deleteIds(request: IIdsRequest, url: string): Observable<any> {
    return this.commonHttpRequestService.makePostRequest(
      'deleteIds',
      url,
      request
    );
  }
  unapproveIds(request: IIdsRequest, url: string): Observable<any> {
    return this.commonHttpRequestService.makePostRequest(
      'unapproveIds',
      url,
      request
    );
  }

  generateTemplate(request: IGenerateTemplateRequest): Observable<any> {
    return this.appService.blobPost(api.XLSX_GENERATE_TEMPLATE, request);
  }

  importXlsxToDb(request: IImportXlsxToDbRequest): Observable<any> {
    return this.appService.blobPost(api.XLSX_IMPORT_TO_DB, request);
  }

}
