import {
  Component,
  AfterViewInit
} from "@angular/core";
import {
  ListBoxComponent,
  CheckBoxSelection,
} from "@syncfusion/ej2-angular-dropdowns";
ListBoxComponent.Inject(CheckBoxSelection);
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from "src/app/libraries/core-page-list/core-page-list.component";
import { ICoreTableColumnItem } from "src/app/libraries/core-table/core-table.component";
import { api } from "src/app/constants/api/apiDefinitions";
import { EnumFilterOperator, EnumSortDirection, IFilterOperator, IInOperator, ISortItem } from "src/app/interfaces/IQueryListRequest";
import { BehaviorSubject, Subscription } from "rxjs";
import { EnumCoreTablePipeType } from "src/app/libraries/core-table/EnumCoreTablePipeType";
import { BaseComponent } from "src/app/libraries/base-component/base/base.component";
import { OrganizationService } from "src/app/services/organization.service";
import { MultiLanguageService } from "src/app/services/multi-language.service";
import { ICoreDropdownOption } from "src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component";
import { ICoreButtonVNS } from "src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS";
import { EnumCoreButtonVNSCode } from "src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode";
import { IFormatedResponse } from "src/app/interfaces/IFormatedResponse";
import { AppService } from "src/app/services/app.service";
import { AlertService } from "src/app/libraries/alert/alert.service";
import { HttpClient } from '@angular/common/http';
import { alertOptions } from "src/app/constants/alertOptions";
import { CorePageListService } from "src/app/libraries/core-page-list/core-page-list.service";
@Component({
  selector: 'app-declaresunper',
  templateUrl: './declaresunper.component.html',
  styleUrls: ['./declaresunper.component.scss']
})
export class DeclaresunperComponent extends BaseComponent implements AfterViewInit {

  loading!: boolean;
  headerFirstRowHeight: number = 50;
  loadingExport!: boolean;
  salaryPeridOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atSalaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  atSalaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;
  shownFrom!: string;
  getByIdObject$!: BehaviorSubject<any>;
  options$!: BehaviorSubject<ICoreDropdownOption[]>;

  listInstance!: number;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_DECLARE_SENIORITY
  datePeriodComparisonFor: string = 'startDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STARTDATE_FILTER;
  statusInclusionFor: string = 'statusId';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_STATUS_ID;
  statusOptionsApi: api = api.DEMO_ATTACHMENT_GET_ATTACHMENT_STATUS_LIST;

  orgIds!: number[];
  outerParam$ = new BehaviorSubject<any>(null);

  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL
    }
  ]
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ]
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  crud: ICorePageListCRUD = {
    deleteIds: api.AT_DECLARE_SENIORITY_DELETE_IDS,
  }
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE,
      field: 'jobOrderNum',
      type: 'string',
      align: 'center',
      hidden: true,
      width: 0,
    },
    {
      caption: 'ID',
      field: 'id',
      type: 'number',
      align: 'left',
      width: 10,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_EMPLOYEECODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 90,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_EMPLOYEENAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_TITLENAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_YEAR_DECLARE,
      field: 'yearDeclare',
      type: 'string',
      align: 'center',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_MONTH_ADJUST,
      field: 'monthAdjustName',
      type: 'string',
      align: 'center',
      width: 135,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_REASON_ADJUST_SENIORITY,
      field: 'reasonAdjust',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_NUMBER_MONTH_ADJUST,
      field: 'monthAdjustNumber',
      type: 'string',
      align: 'center',
      width: 90,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_NUMBER_DAY_OFF,
      field: 'numberDayOff',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_MONTH_DAY_OFF,
      field: 'monthDayOffName',
      type: 'string',
      align: 'center',
      width: 165,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_REASON_ADJUST_DAY_OFF,
      field: 'reasonAdjustDayOff',
      type: 'string',
      align: 'left',
      width: 250,
    },
  ]

  constructor(
    public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
    private appService: AppService,
    private alertService: AlertService,
    private http: HttpClient,
    private corePageListService: CorePageListService
  ) {
    super(mls);
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
    this.shownFrom = 'name'
  }
  ngAfterViewInit(): void {
  }

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_DECLARE_SENIORITY_QUERY_LIST,
  }

  onOrgIdsChange(orgIds: number[]) {

    this.orgIds = orgIds
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds
      }
    ]
  }
  subsctiptions: Subscription[] = [];


  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_DOWNLOAD:

        if (this.orgIds != null && this.orgIds.length > 0) {
          debugger;
          this.loadingExport = true;
          const requestBody = {
            lstOrg: this.orgIds
          };
          this.subscriptions.push(
            this.http.post(api.AT_DECLARE_SENIORITY_EXPORT, requestBody, { responseType: 'blob' })
              .subscribe(
                (response: Blob) => {
                  // Check if the response is a file
                  if (response.type === 'application/octet-stream') {
                    // Create a download link for the file
                    const downloadLink = document.createElement('a');
                    const url = window.URL.createObjectURL(response);
                    downloadLink.href = url;
                    downloadLink.download = 'IMPORT_DECLARE_SENIORITY.xlsx';
                    downloadLink.click();
                    window.URL.revokeObjectURL(url);
                    this.loadingExport = false;
                  } else {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const jsonBody = reader.result as string;
                      const data = JSON.parse(jsonBody);
                      if (data.statusCode == 200) {
                        this.alertService.success(data.messageCode, alertOptions);
                      }
                      else {
                        this.alertService.error(data.messageCode, alertOptions);
                      }
                    };
                    reader.readAsText(response);
                    this.loadingExport = false;

                  }
                }
              )
          )
        }

        else {
          this.alertService.warn("Chưa chọn sơ đồ tổ chức", alertOptions);
        }

        break;
      default:
    }
  }
  onInputFileBase64DataReady(e: any) {
    const requestBody = {
      base64: e
    };
    this.appService.post(api.AT_DECLARE_SENIORITY_IMPORT, requestBody).subscribe(x => {
      if (x.ok && x.status === 200) {
        const instances = this.corePageListService.instances.filter(m => m.instanceNumber === this.listInstance)
        if (!!instances.length) {
          instances[0].reloadFlag$.next(!instances[0].reloadFlag$.value)
        }

      }
    })
  }
  onInstanceCreated(e: number) {
    this.listInstance = e
  }
}
