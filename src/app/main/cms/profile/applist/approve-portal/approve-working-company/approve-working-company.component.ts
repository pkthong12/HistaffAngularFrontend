import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { ApproveWorkingCompanyService } from './approve-working-company.service';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from 'src/app/libraries/core-page-list/core-page-list.component';
import { api } from 'src/app/constants/api/apiDefinitions';
import { BehaviorSubject } from 'rxjs';
import { EnumSortDirection, IInOperator, ISortItem } from 'src/app/interfaces/IQueryListRequest';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';


@Component({
  selector: 'app-approve-working-company',
  templateUrl: './approve-working-company.component.html',
  styleUrls: ['./approve-working-company.component.scss']
})


export class ApproveWorkingCompanyComponent implements OnInit {
  @ViewChild('reasonChange') reasonChange!: TemplateRef<any>;
  reasonChangeTemplateRef!: TemplateRef<any>;

  @ViewChild('fileName') fileName!: TemplateRef<any>;
  //fileNameTemplateRef!: TemplateRef<any>;
  title = EnumTranslateKey.UI_TITLE_HU_EMPLOYEE_CV_EDIT_APPROVE_WORKING_COMPANY;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.APPROVE_WORKING_COMPANY_QUERY_LIST,
  };


  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };


  crud: ICorePageListCRUD = {
    toggleApproveIds: api.APPROVE_WORKING_COMPANY_APPROVED_HU_WORKING,
    toggleUnapproveIds: api.APPROVE_WORKING_COMPANY_UNAPPROVED_HU_WORKING
  };


  outerParam$ = new BehaviorSubject<any>(null);

  orgIds!: number[];

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
      // trường 0: Id
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30,
    },
    {
      // trường 1: trạng thái
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_STATUS,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      // trường 2: lý do
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_REASON,
      field: 'reasonChange',
      type: 'string',
      align: 'left',
      width: 200,
      templateRef: this.reasonChangeTemplateRef
    },
    {
      // trường 3: Mã nhân viên
      caption: EnumTranslateKey.UI_TITLE_HU_CERTIFICATE_EDIT_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      // trường 4: họ và tên
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_FULLNAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      // trường 7: Phòng/Ban
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      // trường 8: Vị trí chức danh
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_POSITION_SEEKER,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      // trường 15: chức năng
      caption: EnumTranslateKey.UI_LABEL_FUNCTION_NAME,
      field: 'functionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      // trường 16: File đính kèm
      caption: EnumTranslateKey.UI_LABEL_FILE_NAME_DOWNLOAD,
      field: 'fileName',
      type: 'string',
      align: 'left',
      width: 200,
      templateRef: this.fileName
    }
  ]
  constructor(
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'reasonChange')[0].templateRef = this.reasonChange;
    this.columns.filter((c) => c.field === 'fileName')[0].templateRef = this.fileName;
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
