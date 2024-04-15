import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { EnumSortDirection, IFilterOperator, IInOperator, ISortItem } from 'src/app/interfaces/IQueryListRequest';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from 'src/app/libraries/core-page-list/core-page-list.component';
import { CorePageListService } from 'src/app/libraries/core-page-list/core-page-list.service';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { AppService } from 'src/app/services/app.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { SeDocumentInfoService } from './se-document-info.service';
import { ICoreButtonVNS } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { EnumCoreButtonVNSCode } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { alertOptions } from 'src/app/constants/alertOptions';

@Component({
  selector: 'app-se-document-info',
  templateUrl: './se-document-info.component.html',
  styleUrls: ['./se-document-info.component.scss']
})
export class SeDocumentInfoComponent implements OnInit {

  title = EnumTranslateKey.UI_COMPONENT_TITLE_SE_DOCUMENT_INFO;
  orgIds!: number[];
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */
  selectedData: any;
  selectedIds: any;
  corePageListInstanceNumber!: number;
  datePeriodComparisonFor: string = 'joinDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_JOIN_DATE;
  statusInclusionFor: string = 'workStatusId';
  statusInclusionForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_STATUS_ID;
  statusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;
  loading!: boolean;
  outerParam$ = new BehaviorSubject<any>(null);
  outerFilterOperators: IFilterOperator[] = [];
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || [],
    },
  ];
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_EMPLOYEE_QUERY_LIST_EMP,
  }


  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.SE_DOCUMENT_DELETE_IDS,
  }

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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_JOB_ORDER_NUM,
      field: 'jobOrderNum',
      type: 'string',
      align: 'right',
      width: 0,
      hidden: true,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_EMPLOYEE_CODE, // to be asigned to EnumTranslateKey
      field: 'code',
      type: 'string',
      align: 'left',
      width: 140,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_FULLNAME, // to be asigned to EnumTranslateKey
      field: 'fullname',
      type: 'string',
      align: 'left',
      width: 180,
      pipe: EnumCoreTablePipeType.NORMALIZE_HUMAN_NAME,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_POSITION_NAME, // to be asigned to EnumTranslateKey
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_ORG_NAME, // to be asigned to EnumTranslateKey
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_INFO_STATUS_NAME, // to be asigned to EnumTranslateKey
      field: 'statusDocument',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    private appService: AppService,
    public corePageListService: CorePageListService,
    private organizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private seDocumentInfoService: SeDocumentInfoService,
    private alertService: AlertService,
    private mls: MultiLanguageService
  ) {
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map((x) =>
      newOrgIds.push(Number(x))
    );
    this.onOrgIdsChange(newOrgIds);
    this.corePageListInstanceNumber = new Date().getDate();
  }

  ngAfterViewInit(): void {

  }
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
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
  rowDoubleClick(e: any) {
    this.seDocumentInfoService.empId = e.id;

    this.router.navigate(
      [btoa(e.id), { listInstance: this.corePageListInstanceNumber }],
      {
        relativeTo: this.route, state: { selectedData: this.selectedData }
      }
    );
  }
  selectedIdsChange(e: any){
    this.selectedIds = e;
  }
  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    // console.log(this.seDocumentInfoService.empId = e.id);
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_UPDATE:
        if(this.selectedIds == undefined){
          this.alertService.error(this.mls.trans('NO_SELECTED_ID_TO_DELETE'), alertOptions);
          return;
        }
        if(this.selectedIds.length != 1){
          this.alertService.error(this.mls.trans('JUST_CHOOSE_ONE_RECORD'), alertOptions);
          return;
        }
        else{
          this.router.navigate(
            [btoa(this.selectedIds[0]), { listInstance: this.corePageListInstanceNumber }],
            {
              relativeTo: this.route, state: { selectedData: this.selectedData }
            }
          );
        }
        break;
      default:
    }
  }
}
