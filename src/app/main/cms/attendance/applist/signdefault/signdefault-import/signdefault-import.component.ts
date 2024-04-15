import { Component, OnInit, isDevMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { EnumSortDirection, ISortItem } from 'src/app/interfaces/IQueryListRequest';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { EnumCoreButtonVNSCode } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';
import { ICoreButtonVNS } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { ICorePageListApiDefinition, IXlsxImportObject } from 'src/app/libraries/core-page-list/core-page-list.component';
import { CorePageListService } from 'src/app/libraries/core-page-list/core-page-list.service';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { AppService } from 'src/app/services/app.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

@Component({
  selector: 'app-signdefault-import',
  templateUrl: './signdefault-import.component.html',
  styleUrls: ['./signdefault-import.component.scss']
})
export class SigndefaultImportComponent extends BaseComponent implements OnInit {

  captionCode: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_MNG_IMPORT

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.XLSX_AT_SIGN_DEFAULT_IMPORT_QUERY_LIST,
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      type: 'number',
      align: 'right',
      hidden: true,
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_IMPORT_INSERT_ON,
      field: 'xlsxInsertOn',
      type: 'date',
      align: 'left',
      width: 160,
      pipe: EnumCoreTablePipeType.DATE_TIME,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_IMPORT_FILE_NAME,
      field: 'xlsxFileName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_IMPORT_ROW,
      field: 'xlsxRow',
      type: 'number',
      align: 'center',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SIGN_DEFAULT_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SIGN_DEFAULT_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SIGN_DEFAULT_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_DEPARTMENT_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SIGN_DEFAULT_SHIFT,
      field: 'signDefaultName',
      type: 'string',
      align: 'left',
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EFFECT_DAY,
      field: 'effectDateFrom',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EXPIRE_DAY,
      field: 'effectDateTo',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
    },
  ]

  callerListInstance!: number;

  shownButtonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SAVE,
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL
  ]

  importPreviewOuterParam!: IXlsxImportObject;
  loading!: boolean;

  outerSort: ISortItem[] = [
    {
      field: 'xlsxRow',
      sortDirection: EnumSortDirection.ASC
    }
  ];

  constructor(
    public override mls: MultiLanguageService,
    private router: Router,
    private route: ActivatedRoute,
    private corePageListService: CorePageListService,
    private alertService: AlertService,
    private appService: AppService,
  ) {
    super(mls);
    const navigation = this.router.getCurrentNavigation();

    this.importPreviewOuterParam = navigation?.extras?.state!['importPreviewOuterParam'];

    this.callerListInstance = Number(
      this.route.snapshot.paramMap.get('listInstance')!
    );

    const instancesFilter = this.corePageListService.instances.filter(
      (x) => x.instanceNumber === this.callerListInstance
    );
    if (!!instancesFilter.length) {
      const instance = instancesFilter[0];
    } else {
      if (isDevMode()) {
        this.alertService.info(`CorePageList instances do not include number ${this.callerListInstance}`, noneAutoClosedAlertOptions)
      }
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCoreButtonGroupVNSClick(e: ICoreButtonVNS) {
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_CANCEL) {
      this.onCancel();
    } else if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SAVE) {

      this.loading = true;

      this.subscriptions.push(
        this.appService.post(api.XLSX_AT_SIGN_DEFAULT_IMPORT_SAVE, this.importPreviewOuterParam).subscribe(x => {
          this.loading = false;
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              const instanceFilter = this.corePageListService.instances.filter(x => x.instanceNumber === this.callerListInstance)
              if (!!instanceFilter.length) {
                instanceFilter[0].reloadFlag$.next(!instanceFilter[0].reloadFlag$.value)
              }
              this.onCancel();
            } else {
              //this.alertService.info(this.mls.trans(body.messageCode, this.lang), alertOptions)
            }
          } else {
            console.log("Save failed", x)
          }
        })

      )
    }
  }

}
