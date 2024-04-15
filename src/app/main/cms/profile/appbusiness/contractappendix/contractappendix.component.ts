import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  FilterService,
  VirtualScrollService,
} from "@syncfusion/ej2-angular-grids";
import {
  ListBoxComponent,
  CheckBoxSelection,
} from "@syncfusion/ej2-angular-dropdowns";
ListBoxComponent.Inject(CheckBoxSelection);
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from "src/app/libraries/core-page-list/core-page-list.component";
import {  ICoreTableColumnItem } from "src/app/libraries/core-table/core-table.component";
import { api } from "src/app/constants/api/apiDefinitions";
import { EnumFilterOperator, EnumSortDirection, IFilterOperator, IInOperator, ISortItem } from "src/app/interfaces/IQueryListRequest";
import { BehaviorSubject } from "rxjs";
import { EnumCoreTablePipeType } from "src/app/libraries/core-table/EnumCoreTablePipeType";
import { MultiLanguageService } from "src/app/services/multi-language.service";
import { OrganizationService } from "src/app/services/organization.service";
import { BaseComponent } from "src/app/libraries/base-component/base/base.component";
import { IGenerateTemplateRequest } from "src/app/libraries/core-page-list/core-page-list.service";
import { ICoreButtonVNS } from "src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS";
import { EnumCoreButtonVNSCode } from "src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode";
import { AlertService } from "src/app/libraries/alert/alert.service";
import { alertOptions } from "src/app/constants/alertOptions";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "cms-app-contractappendix",
  templateUrl: "./contractappendix.component.html",
  styleUrls: ["./contractappendix.component.scss"],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class ContractAppendixComponent extends BaseComponent implements AfterViewInit  {
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_CONTRACT_APPENDIX
  orgIds!: number[];
  loading!: boolean;
  id: any;
  selectedIds: string[] | number[] = [];
  datePeriodComparisonFor: string = 'startDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STARTDATE_FILTER;
  statusInclusionFor: string = 'workStatusId';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_CORE_PARAMS_EMPLOYEE_STATUS_IN;
  statusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;
  outerParam$ = new BehaviorSubject<any>(null);
  generateTemplateRequest!: IGenerateTemplateRequest;
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
    deleteIds: api.HU_CONTRACTAPPENDIX_DELETE_IDS,
    toggleApproveIds: api.HU_CONTRACTAPPENDIX_CHANGESTATUSAPPROVE
  }
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  columns: ICoreTableColumnItem[] = [
    {
      caption: 'ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 10,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_JOB_ORDER_NUM,
      field: 'jobOrderNum',
      type: 'string',
      align: 'right',
      width: 0,
      hidden: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STATUSNAME,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EMPLOYEECODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EMPLOYEENAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_TITLE_NAME,
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
      width: 210,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACTAPPENDIX_CONTRACTAPPENDIXNO,
      field: 'contractAppendixNo',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STARTDATE,
      field: 'startDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EXPIREDATE,
      field: 'expireDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_SIGNDATE,
      field: 'signDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_SIGNERNAME,
      field: 'signerName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_SIGNERPOSITION,
      field: 'signerPosition',
      type: 'string',
      align: 'left',
      width: 130,
    },
  ]
  constructor(
    public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
    private alertService: AlertService,
    private http : HttpClient

  ) {
    super(mls);
     /* Get orgIds startup value */
     const newOrgIds: number[] = [];
     this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
     this.onOrgIdsChange(newOrgIds)
  }
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_CONTRACTAPPENDIX_QUERY_LIST,
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
  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: 'HU_CONTRACT_APPENDIX',
        lang: x
      }
    })
  }
  ngAfterViewInit(): void {
    const stickerFilter = this.columns.filter(c => c.field === 'statusName');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }

  onRowClick(e: any) {
    this.id = e.id
  }
  
  onSelectedIdsChange(e: number[]) {
    this.selectedIds = e;
  }
  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    if (e.code == EnumCoreButtonVNSCode.HEADER_PRINT) {
      this.loading = true;

      console.log(this.selectedIds.length);

      if(this.selectedIds.length==1){
        this.http.get(api.HU_CONTRACTAPPENDIX_PRINT, {
          responseType: 'blob',
          params: { id: this.selectedIds[0].toString() }
        }).subscribe((response: Blob) => {
          if (response.type === 'application/octet-stream') {
            const downloadUrl = URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'Phụ lục hợp đồng LD.doc');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
            this.loading = false;
          }
          else {
            const reader = new FileReader();
            reader.onload = () => {
              const jsonBody = reader.result as string;
              const data = JSON.parse(jsonBody);
              this.alertService.warn(data.messageCode, alertOptions);
            };
            reader.readAsText(response);
            this.loading = false;
          }
  
        });
      }
      else{
        this.alertService.warn(this.mls.trans('SELECT_ONLY_ONE_RECORD_TO_PRINT'), alertOptions);
        this.loading = false;
      }

    }
  }
}
