import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  isDevMode,
} from "@angular/core";

import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, IXlsxImportObject } from "src/app/libraries/core-page-list/core-page-list.component";
import { CoreTableComponent, ICoreTableColumnItem } from "src/app/libraries/core-table/core-table.component";
import { api } from "src/app/constants/api/apiDefinitions";
import { EnumFilterOperator, EnumSortDirection, IFilterOperator, IInOperator, ISortItem } from "src/app/interfaces/IQueryListRequest";
import { BehaviorSubject } from "rxjs";
import { EnumCoreTablePipeType } from "src/app/libraries/core-table/EnumCoreTablePipeType";
import { BaseComponent } from "src/app/libraries/base-component/base/base.component";
import { MultiLanguageService } from "src/app/services/multi-language.service";
import { RandomAvatarService } from "src/app/services/random-avatar.service";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumCoreButtonCode } from "src/app/libraries/core-button-group/core-button/EnumButtonCaptionCode";
import { ICoreButtonVNS } from "src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS";
import { EnumCoreButtonVNSCode } from "src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode";
import { OrganizationService } from "src/app/services/organization.service";
import { HttpClient } from '@angular/common/http';
import { CorePageListService, IGenerateTemplateRequest } from "src/app/libraries/core-page-list/core-page-list.service";
import { noneAutoClosedAlertOptions, alertOptions } from "src/app/constants/alertOptions";
import { IFormatedResponse } from "src/app/interfaces/IFormatedResponse";
import { AlertService } from "src/app/libraries/alert/alert.service";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "cms-profile-contract-info-import",
  templateUrl: "./contract-info-import.component.html",
  styleUrls: ["./contract-info-import.component.scss"],
})
export class ContractInfoImportComponent extends BaseComponent implements OnInit {

  captionCode: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_CONTRACT_IMPORT

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_CONTRACT_QUERY_LIST_IMPORT,
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
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STATUSNAME,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EMPLOYEECODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EMPLOYEENAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 210,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_ORGNAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 210,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_CONTRACTNO,
      field: 'contractNo',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_CONTRACTTYPENAME,
      field: 'contractTypeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STARTDATE,
      field: 'startDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 150,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EXPIREDATE,
      field: 'expireDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_SIGNDATE,
      field: 'signDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_SIGNERNAME,
      field: 'signerName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_SIGNERPOSITION,
      field: 'signerPosition',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250,
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
        this.appService.post(api.HU_CONTRACT_SAVE_IMPORT, this.importPreviewOuterParam).subscribe(x => {
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
              // this.alertService.info(this.mls.trans(body.messageCode, this.lang), alertOptions)
            }
          } else {
            console.log("Save failed", x)
          }
        })

      )
    }
  }
}
