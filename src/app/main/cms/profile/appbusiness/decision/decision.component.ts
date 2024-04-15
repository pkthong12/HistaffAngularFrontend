import {
  Component,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  Input,
  OnInit,
} from "@angular/core";

import { RandomAvatarService } from 'src/app/services/random-avatar.service';
import { alertOptions, noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { BehaviorSubject } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from "src/app/libraries/core-page-list/core-page-list.component";
import { ICoreTableColumnItem } from "src/app/libraries/core-table/core-table.component";
import { EnumCoreTablePipeType } from "src/app/libraries/core-table/EnumCoreTablePipeType";
import { BaseComponent } from "src/app/libraries/base-component/base/base.component";
import { MultiLanguageService } from "src/app/services/multi-language.service";

import { EnumFilterOperator, EnumSortDirection, IFilterOperator, IInOperator, ISortItem } from "src/app/interfaces/IQueryListRequest";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { api } from "src/app/constants/api/apiDefinitions";
import { ICoreButtonVNS } from "src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS";
import { EnumCoreButtonVNSCode } from "src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode";
import { OrganizationService } from "src/app/services/organization.service";
import { HttpClient } from "@angular/common/http";
import { IGenerateTemplateRequest } from "src/app/libraries/core-page-list/core-page-list.service";

@Component({
  selector: "cms-profile-decision",
  templateUrl: "./decision.component.html",
  styleUrls: ["./decision.component.scss"],
})
export class DecisionComponent extends BaseComponent implements OnInit, AfterViewInit {
  selectedIds: number[] = [];

  loading!: boolean;

  @Input() hideHeader!: boolean;

  @ViewChild('avatar') avatar!: TemplateRef<any>;
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  datePeriodComparisonFor: string = 'effectDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.NULL;
  statusInclusionFor: string = 'empWorkStatus';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EMPLOYEE_STATUS;
  workStatusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;
  id: any;
  /* START: Local filter params */
  orgIds!: number[];
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  title = EnumTranslateKey.UI_COMPONENT_TITLE_DECISION
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
      field: "effectDate",
      sortDirection: EnumSortDirection.DESC
    }
  ];

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_DECISION_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_DECISION_DELETE_IDS,
    toggleApproveIds: api.HU_DECISION_CHANGESTATUSAPPROVE
  }

  avatarTemplate!: TemplateRef<any>;
  defaultSort: ISortItem[] = [];
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_STATUS,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_DECISIONNO,
      field: 'decisionNo',
      type: 'string',
      align: 'left',
      width: 180,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_TYPE_NAME,
      field: 'typeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EFFECTDATE,
      field: 'effectDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EXPIREDATE,
      field: 'expireDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_WORKPLACE_NAME,
      field: 'workPlaceName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EMPLOYEE_OBJ_NAME,
      field: 'employeeObjName',
      type: 'string',
      align: 'left',
      width: 250,
    },
  ]

  defaultAvatar!: string;
  generateTemplateRequest!: IGenerateTemplateRequest;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  selectedData!: any[];
  corePageListInstanceNumber!: number;
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private ras: RandomAvatarService,
    private router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private http: HttpClient,
    private alertService: AlertService,
  ) {
    super(mls);
    this.defaultAvatar = ras.get();
    this.corePageListInstanceNumber = new Date().getTime();
    this.defaultSort.push(
      {
        field: 'id',
        sortDirection: EnumSortDirection.DESC
      }
    );
    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds);

  }
  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: 'HU_WORKING',
        lang: x
      }
    })
  }

  ngAfterViewInit(): void {
    const filter = this.columns.filter(c => c.field === 'avatar');
    if (!!filter.length) filter[0].templateRef = this.avatar;
    const stickerFilter = this.columns.filter(c => c.field === 'statusName');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
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

  onRowClick(e: any) {
    this.id = e.id
  }


  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    //console.log("StaffProfileComponent onCorePageHeaderButtonClick", e)
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        //this.router.navigate([btoa('0')], { relativeTo: this.route })
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        break;
      case EnumCoreButtonVNSCode.HEADER_PRINT:
        let filename = '';

        if (this.selectedIds.length > 1) {
          this.alertService.warn(this.mls.trans('PRINT_ONE_RECORD'), alertOptions);
        }
        else {
          this.http.get(api.HU_WORKING_PROCESS_FILE_NAME + this.selectedIds[0].toString()).subscribe((response: any) => {
            filename = response.innerBody;
          });

          this.loading = true;

          this.http
            .get(api.HU_WORKING_PROCESS_PRINT, {
              responseType: 'blob',
              params: { id: this.selectedIds[0].toString() }
            })
            .subscribe((response: Blob) => {
              if (response.type === 'application/octet-stream') {
                const downloadUrl = URL.createObjectURL(response);
                
                const link = document.createElement('a');
                
                link.href = downloadUrl;
                
                link.setAttribute('download', filename + '.doc');
                
                document.body.appendChild(link);
                
                link.click();
                
                document.body.removeChild(link);
                
                URL.revokeObjectURL(downloadUrl);
              }
              else {
                const reader = new FileReader();
                
                reader.onload = () => {
                  const jsonBody = reader.result as string;
                  
                  const data = JSON.parse(jsonBody);
                  
                  if (data.statusCode == 200) {
                    this.alertService.success(data.messageCode, alertOptions);
                  }
                  else {
                    // this.alertService.error(data.messageCode, alertOptions);
                  }
                };

                reader.readAsText(response);
              }

              this.loading = false;
            });
        }

        break;
        case EnumCoreButtonVNSCode.HEADER_COPY:
          if(this.selectedData.length > 1){
            this.alertService.error(`${this.mls.trans(EnumTranslateKey.NOT_SELECTED_MORE_THAN_ONE_ROW_FOR_BUTTON_COPY_DATA)}`, alertOptions)
            return;
          }
        this.router.navigate(
          [btoa('0'), { listInstance: this.corePageListInstanceNumber }],
          {
            relativeTo: this.route, state: { selectedData: this.selectedData }
          }
        );
        break;
      default:
        break;
    }
  }


  onSelectedDataChange(e: any[]) {
    this.selectedData = e;
    console.log(this.selectedData)
  }

  customizeSelectedIdsChange(e: number[]): void {
    this.selectedIds = e;
  }
}