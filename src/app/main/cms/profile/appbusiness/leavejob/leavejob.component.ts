import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
  TemplateRef,
  AfterViewInit,
  Input,
  EventEmitter,
  Output,
} from "@angular/core";

import { RandomAvatarService } from 'src/app/services/random-avatar.service';

import { BehaviorSubject } from "rxjs";

import {
  FilterService,
} from "@syncfusion/ej2-angular-grids";
import {
  ListBoxComponent,
  CheckBoxSelection,
} from "@syncfusion/ej2-angular-dropdowns";
ListBoxComponent.Inject(CheckBoxSelection);

const _ = require("lodash");
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from "src/app/libraries/core-page-list/core-page-list.component";
import { ICoreTableColumnItem } from "src/app/libraries/core-table/core-table.component";
//import { EnumComposition } from "src/app/enum/EnumComposition";
import { EnumCoreTablePipeType } from "src/app/libraries/core-table/EnumCoreTablePipeType";
import { BaseComponent } from "src/app/libraries/base-component/base/base.component";
import { MultiLanguageService } from "src/app/services/multi-language.service";

import { EnumFilterOperator, EnumSortDirection, IFilterOperator, IInOperator, ISortItem } from "src/app/interfaces/IQueryListRequest";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { api } from "src/app/constants/api/apiDefinitions";
import { OrganizationService } from "src/app/services/organization.service";
import { Console } from "console";
import { ICoreParamControl } from "src/app/libraries/core-header-params/enum-and-interfaces";
import { EnumFormBaseContolType } from "src/app/libraries/core-form/core-form/enum-interfaces";
import { ICoreCommonParamKitEventEmitterData } from "src/app/libraries/core-common-param-kit/core-common-param-kit/core-common-param-kit.component";
import { setCulture } from "@syncfusion/ej2-base";
import { ICoreButtonVNS } from "src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS";
import { EnumCoreButtonVNSCode } from "src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode";
import { HttpClient } from "@angular/common/http";
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { alertOptions } from "src/app/constants/alertOptions";

setCulture("en");

@Component({
  selector: "cms-profile-leavejob",
  templateUrl: "./leavejob.component.html",
  styleUrls: ["./leavejob.component.scss"],
  providers: [FilterService],
  encapsulation: ViewEncapsulation.None,
})
export class LeaveJobComponent extends BaseComponent implements AfterViewInit {

  @Input() hideHeader!: boolean;
  @Output() onChange = new EventEmitter<ICoreCommonParamKitEventEmitterData>();
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  loading!: boolean;
  orgIds!: number[];
  id: any;
  title = EnumTranslateKey.UI_COMPONENT_TITLE_LEAVEJOB
  paramRows!: ICoreParamControl[][];
  outerParam$ = new BehaviorSubject<any>(null);
  outerFilterOperators: IFilterOperator[] = [];
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
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_LEAVEJOB_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_LEAVEJOB_DELETE_IDS,
    toggleApproveIds: api.HU_LEAVEJOB_CHANGESTATUSAPPROVE
  }
  headerFirstRowHeight: number = 60;
  avatarTemplate!: TemplateRef<any>;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_STATUS,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_JOIN_DATE,
      field: 'joinDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_SENIORITY,
      field: 'seniority',
      type: 'string',
      align: 'right',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_CONTRACT_NO,
      field: 'contractNo',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_CONTRACT_DATESTART,
      field: 'dateStart',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'right',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_CONTRACT_DATEEND,
      field: 'dateEnd',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'right',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_LASTDATE,
      field: 'lastDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'right',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE,
      field: 'effectDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE,
      field: 'jobOrderNum',
      type: 'string',
      align: 'center',
      hidden: true,
      width: 0,
    },
  ]

  defaultAvatar!: string;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private ras: RandomAvatarService,
    private organizationService: OrganizationService,
    private http: HttpClient,
    private alertService: AlertService,

  ) {
    super(mls);
    this.defaultAvatar = ras.get();
    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
  }
  ngAfterViewInit(): void {
    const stickerFilter = this.columns.filter(c => c.field === 'statusName');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }
  onNgModelChange = (ngModel: string, value: any) => {

    // console.log('onNgModelChange', ngModel, value);

    let field: string;
    let operator: EnumFilterOperator;
    let eventFilterOperator: IFilterOperator;
    switch (ngModel) {
      case "minEffectDate":
        field = "effectDate";
        operator = EnumFilterOperator.GREATER_THAN_OR_EQUAL;
        if (value != null) {
          value.setDate(value.getUTCDate());
          value.setUTCHours(0, 0, 0);
        }
        eventFilterOperator = {
          field,
          operator,
          dateTimeValue: value
        }
        break;
      case "maxEffectDate":
        field = "effectDate";
        operator = EnumFilterOperator.LESS_THAN_OR_EQUAL;
        if (value != null) {
          value.setDate(value.getUTCDate());
          value.setUTCHours(23, 59, 59);
        }
        eventFilterOperator = {
          field,
          operator,
          dateTimeValue: value
        }
        break;
      case "minLastDate":
        field = "lastDate";
        operator = EnumFilterOperator.GREATER_THAN_OR_EQUAL;
        if (value != null) {
          value.setDate(value.getUTCDate());
          value.setUTCHours(0, 0, 0);
        }
        eventFilterOperator = {
          field,
          operator,
          dateTimeValue: value
        }
        break;
      case "maxLastDate":
        field = "lastDate";
        operator = EnumFilterOperator.LESS_THAN_OR_EQUAL;
        if (value != null) {
          value.setDate(value.getUTCDate());
          value.setUTCHours(23, 59, 59);

        }
        eventFilterOperator = {
          field,
          operator,
          dateTimeValue: value
        }
        break;
      default:
        return;

    }

    // vì có 04 date nên cần bảo vệ state cũ
    const currentOuterFilterOperators: IFilterOperator[] = JSON.parse(JSON.stringify(this.outerFilterOperators));

    // lọc những field không trùng với field và operator
    const remainOuterFilterOperators = currentOuterFilterOperators.filter(x => !!!(x.field === field && x.operator === operator));

    // thêm lại event vừa xảy ra
    remainOuterFilterOperators.push(eventFilterOperator);

    this.outerFilterOperators = remainOuterFilterOperators

    // console.log("new filter", this.outerFilterOperators)
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
    this.paramRows = [
      [
        {
          flexSize: 3,
          name: 'minEffectDate',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE_FILTER_FROM,
          controlType: EnumFormBaseContolType.DATEPICKER,
        },
        {
          flexSize: 3,
          name: 'maxEffectDate',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE_FILTER_TO,
          controlType: EnumFormBaseContolType.DATEPICKER,
        },
        {
          flexSize: 3,
          name: 'minLastDate',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_LASTDATE_FILTER_FROM,
          controlType: EnumFormBaseContolType.DATEPICKER,
        },
        {
          flexSize: 3,
          name: 'maxLastDate',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_LASTDATE_FILTER_TO,
          controlType: EnumFormBaseContolType.DATEPICKER,
        },
      ]
    ];
  }
  onRowClick(e: any) {
    this.id = e.id
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    if (e.code == EnumCoreButtonVNSCode.HEADER_PRINT) {
      this.loading = true;
      this.http.get(api.HU_LEAVEJOB_PRINT, {
        responseType: 'blob',
        params: { id: this.id.toString() }
      }).subscribe((response: Blob) => {
        if (response.type === 'application/octet-stream') {
          const downloadUrl = URL.createObjectURL(response);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', 'Thông tin quyết định nghỉ.doc');
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
  }

}