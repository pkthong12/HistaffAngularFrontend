import { Component, OnInit, isDevMode } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { ICorePageListApiDefinition, IXlsxImportObject } from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { CorePageListService } from 'src/app/libraries/core-page-list/core-page-list.service';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { alertOptions, noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { EnumCoreButtonVNSCode } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';
import { ICoreButtonVNS } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { AppService } from 'src/app/services/app.service';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { EnumFilterOperator, EnumSortDirection, IFilterOperator, IInOperator, ISortItem } from 'src/app/interfaces/IQueryListRequest';
import { BehaviorSubject } from 'rxjs';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-swipe-data-import',
  templateUrl: './swipe-data-import.component.html',
  styleUrls: ['./swipe-data-import.component.scss']
})
export class SwipeDataImportComponent extends BaseComponent implements OnInit {

  captionCode: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_SWIPE_DATA_PROFILE_IMPORT

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.XLSX_AT_SWIPE_DATA_IMPORT_QUERY_LIST,
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_TERMINAL,
      field: 'terminalCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_ITIME_ID,
      field: 'itimeId',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_ATTENDENCE_DAY,
      field: 'workingDay',
      type: 'date',
      align: 'left',
      pipe: EnumCoreTablePipeType.DATE,
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_ATTENDENCE_HOUR,
      field: 'timeOnly',
      type: 'date',
      align: 'left',
      width: 200,
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
        this.appService.post(api.XLSX_AT_SWIPE_DATA_IMPORT_SAVE, this.importPreviewOuterParam).subscribe(x => {
          this.loading = false;
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              const instanceFilter = this.corePageListService.instances.filter(x => x.instanceNumber === this.callerListInstance)
              if (!!instanceFilter.length) {
                instanceFilter[0].reloadFlag$.next(!instanceFilter[0].reloadFlag$.value)
              }
              this.onCancel();
            } else if (body.statusCode === 400) {
              this.alertService.error(body.messageCode, noneAutoClosedAlertOptions)
            }
          } else {
            console.log("Save failed", x)
          }
        })

      )
    }
  }

  
}
