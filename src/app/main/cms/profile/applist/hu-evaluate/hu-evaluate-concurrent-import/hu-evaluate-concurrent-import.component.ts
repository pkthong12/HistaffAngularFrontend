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
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { AppService } from 'src/app/services/app.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

@Component({
  selector: 'app-hu-evaluate-concurrent-import',
  templateUrl: './hu-evaluate-concurrent-import.component.html',
  styleUrls: ['./hu-evaluate-concurrent-import.component.scss']
})
export class HuEvaluateConcurrentImportComponent extends BaseComponent implements OnInit {

  loading!: boolean;
  captionCode: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATE_CONCURRENT_IMPORT
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.XLSX_HU_EVALUATE_CONCURRENT_IMPORT_QUERY_LIST,
  }
  outerSort: ISortItem[] = [
    {
      field: 'xlsxRow',
      sortDirection: EnumSortDirection.ASC
    }
  ];
  shownButtonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SAVE,
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL
  ]
  callerListInstance!: number;
  importPreviewOuterParam!: IXlsxImportObject;
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_YEAR,
      field: 'yearSearch',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_EMPOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_EMPOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_ORG_NAME,
      field: 'orgConcurrentName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_POSITION_NAME,
      field: 'positionConcurrentName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_CLASSIFICATION,
      field: 'classificationName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_POINT,
      field: 'pointSearch',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 150,
    },
  ]
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

  override ngOnInit(): void {
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
        this.appService.post(api.XLSX_HU_EVALUATE_CONCURRENT_IMPORT_SAVE, this.importPreviewOuterParam).subscribe(x => {
          this.loading = false;
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              const instanceFilter = this.corePageListService.instances.filter(x => x.instanceNumber === this.callerListInstance)
              if (!!instanceFilter.length) {
                instanceFilter[0].reloadFlag$.next(!instanceFilter[0].reloadFlag$.value)
              }
              this.onCancel();
            }
          } else {
            console.log("Save failed", x)
          }
        })

      )
    }
  }

}