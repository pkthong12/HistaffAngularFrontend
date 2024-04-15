import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { color } from 'highcharts';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { EnumSortDirection, IInOperator, ISortItem } from "src/app/interfaces/IQueryListRequest";
import { BehaviorSubject } from "rxjs";
import { LayoutService } from 'src/app/services/layout.service';


@Component({
  selector: 'app-approve-cv',
  templateUrl: './approve-cv.component.html',
  styleUrls: ['./approve-cv.component.scss']
})
export class ApproveCvComponent implements OnChanges, OnInit, AfterViewInit {
  @ViewChild('religionName') religionName!: TemplateRef<any>;
  religionNameTemplateRef!: TemplateRef<any>;

  @ViewChild('nativeName') nativeName!: TemplateRef<any>;
  nativeNameTemplateRef!: TemplateRef<any>;

  @ViewChild('maritalStatusName') maritalStatusName!: TemplateRef<any>;
  maritalStatusNameTemplateRef!: TemplateRef<any>;

  @ViewChild('idNo') idNo!: TemplateRef<any>;
  idNoTemplateRef!: TemplateRef<any>;

  @ViewChild('idDateStr') idDateStr!: TemplateRef<any>;
  idDateStrTemplateRef!: TemplateRef<any>;

  @ViewChild('identityAddressName') identityAddressName!: TemplateRef<any>;
  identityAddressNameTemplateRef!: TemplateRef<any>;
  @Input() height!: number;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_EMPLOYEE_CV_EDIT_GET_ALL_CV,
  };
  treeHeight!: number;
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  crud: ICorePageListCRUD = {
    toggleApproveIds: api.HU_EMPLOYEE_CV_EDIT_APPROVED_CV,
    toggleUnapproveIds: api.HU_EMPLOYEE_CV_EDIT_APPROVED_CV
  };
  orgIds: number[] = [];
  outerParam$ = new BehaviorSubject<any>(null);
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ];
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_STATUS,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_EMPLOYEE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_EMPLOYEE_NAME,
      field: 'fullname',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_RELIGION_NAME,
      field: 'religionName',
      type: 'string',
      align: 'left',
      width: 80,
      templateRef: this.religionNameTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_NATIVE_NAME,
      field: 'nativeName',
      type: 'string',
      align: 'left',
      width: 80,
      templateRef: this.nativeNameTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_MARITAL_STATUS_NAME,
      field: 'maritalStatusName',
      type: 'string',
      align: 'left',
      width: 150,
      templateRef: this.maritalStatusNameTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_ID_NO,
      field: 'idNo',
      type: 'string',
      align: 'left',
      width: 120,
      templateRef: this.idNoTemplateRef
    },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_ID_DATE,
    //   field: 'idDate',
    //   type: 'string',
    //   align: 'left',
    //   width: 100,
    //   pipe: EnumCoreTablePipeType.DATE,
    //   templateRef: this.idDateTemplateRef
    // },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_ID_DATE,
      field: 'idDateStr',
      type: 'string',
      align: 'left',
      width: 100,
      templateRef: this.idDateStrTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_ID_PLACE,
      field: 'identityAddressName',
      type: 'string',
      align: 'left',
      width: 200,
      templateRef: this.identityAddressNameTemplateRef
    },

  ]
  constructor(private layoutService: LayoutService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes['height']) {
      this.treeHeight = changes['height'].currentValue - this.layoutService.corePageHeaderHeight
    }
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'religionName')[0].templateRef = this.religionName,
      this.columns.filter((c) => c.field === 'nativeName')[0].templateRef = this.nativeName,
      this.columns.filter((c) => c.field === 'maritalStatusName')[0].templateRef = this.maritalStatusName,
      this.columns.filter((c) => c.field === 'idNo')[0].templateRef = this.idNo,
      this.columns.filter((c) => c.field === 'idDateStr')[0].templateRef = this.idDateStr,
      this.columns.filter((c) => c.field === 'identityAddressName')[0].templateRef = this.identityAddressName
  }

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }
}
