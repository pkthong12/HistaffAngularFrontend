import { Component, ViewChild, TemplateRef, AfterViewInit, Input, } from '@angular/core';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';
import { alertOptions } from 'src/app/constants/alertOptions';
import { AlertService } from "src/app/libraries/alert/alert.service";
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, } from 'src/app/libraries/core-page-list/core-page-list.component';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

import { EnumSortDirection, IFilterOperator, IInOperator, ISortItem, } from 'src/app/interfaces/IQueryListRequest';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { api } from 'src/app/constants/api/apiDefinitions';
import { ICoreButtonVNS } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { EnumCoreButtonVNSCode } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';
import { OrganizationService } from 'src/app/services/organization.service';
import { IGenerateTemplateRequest, } from 'src/app/libraries/core-page-list/core-page-list.service';
import { HttpClient } from '@angular/common/http';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'cms-profile-staffprofile',
  templateUrl: './staffprofile.component.html',
  styleUrls: ['./staffprofile.component.scss'],
})
export class StaffProfileComponent extends BaseComponent implements AfterViewInit {
  @Input() hideHeader!: boolean;
  @Input() height!: number;

  @ViewChild('avatar') avatar!: TemplateRef<any>;

  /* START: Local filter params */
  orgIds!: number[];
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */
  datePeriodComparisonFor: string = 'joinDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_JOIN_DATE;
  statusInclusionFor: string = 'workStatusId';
  statusInclusionForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_STATUS_ID;
  statusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;
  loading!: boolean;
  title = EnumTranslateKey.UI_COMPONENT_TITLE_STAFF_PROFILE;

  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    },
    {
      field: "code",
      sortDirection: EnumSortDirection.ASC
    },
  ]

  outerParam$ = new BehaviorSubject<any>(null);
  outerFilterOperators: IFilterOperator[] = [];
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || [],
    },
  ];

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_EMPLOYEE_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_EMPLOYEE_DELETE_IDS,
  };

  avatarTemplate!: TemplateRef<any>;

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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_AVATAR, // to be asigned to EnumTranslateKey
      field: 'avatar',
      type: 'string',
      align: 'left',
      hideSearchBox: true,
      width: 80,
      templateRef: this.avatarTemplate,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_EMPLOYEE_CODE, // to be asigned to EnumTranslateKey
      field: 'code',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_FULLNAME, // to be asigned to EnumTranslateKey
      field: 'fullname',
      type: 'string',
      align: 'left',
      width: 260,
      pipe: EnumCoreTablePipeType.NORMALIZE_HUMAN_NAME,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_PROFILE_CODE, // to be asigned to EnumTranslateKey
      field: 'profileCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_POSITION_NAME, // to be asigned to EnumTranslateKey
      field: 'nameOnProfileEmployee',
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_WORK_STATUS_NAME, // to be asigned to EnumTranslateKey
      field: 'workStatusName',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ];

  defaultAvatar!: string;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };

  generateTemplateRequest!: IGenerateTemplateRequest;

  id: any;

  /* End Properties being passed to core-page-list */

  constructor(
    public override mls: MultiLanguageService,
    private ras: RandomAvatarService,
    private router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private http: HttpClient,
    private layoutService: LayoutService,
    private alertService: AlertService,
  ) {
    super(mls);
    this.defaultAvatar = ras.get();

    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map((x) =>
      newOrgIds.push(Number(x))
    );
    this.onOrgIdsChange(newOrgIds);
  }

  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: 'STAFF_PROFILE',
        lang: x
      }
    })

    // Nếu chiều cao height của StaffProfileComponent không được truyền vào
    // Thì chiều cao của nó sẽ bằng giá trị biến thiên của contentContainerHeight$
    // trừ đi khoảng paddingBottom (basicSpacing) 
    if (!this.height) {
      this.subscriptions.push(
        this.layoutService.contentContainerHeight$.subscribe(x => {
          this.height = x - this.layoutService.basicSpacing;
        })
      )
    }
    //============================================================================
  }

  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'avatar')[0].templateRef =
      this.avatar;
  }

  onOrgIdsChange(orgIds: number[]) {
    const newOuterInOperators: IInOperator[] = JSON.parse(JSON.stringify(this.outerInOperators)) 
    const filter = newOuterInOperators.filter(x => x.field === 'orgId')
    if (!!filter.length) {
      filter[0].values = orgIds
    } else {
      newOuterInOperators.push({
        field: 'orgId',
        values: orgIds,
      })
    }
    this.outerInOperators = newOuterInOperators;
  }

  onRowDoubleClick(e: any) {
    this.router.navigate([btoa(e.id.toString())], { relativeTo: this.route });
  }

  selectedIds: any[] = [];

  onSelectedIdsChange1(e: string[] | number[]) {
    this.selectedIds = e;
    console.log(this.selectedIds);
  }

  onRowClick(e: any) {
    this.id = e.id;
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    console.log('StaffProfileComponent onCorePageHeaderButtonClick', e);
    let filename = '';
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        this.router.navigate(['app-staff-profile-edit'], {
          relativeTo: this.route,
        });
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        this.router.navigate([btoa(this.id.toString())], {
          relativeTo: this.route,
        });
        break;
      case EnumCoreButtonVNSCode.HEADER_DELETE:
        break;
      case EnumCoreButtonVNSCode.HEADER_PRINT:
        console.log('call');
        break;
      case EnumCoreButtonVNSCode.HEADER_PRINT_2C_2008:
        debugger;

        if (this.selectedIds.length > 1) {
          this.alertService.warn(this.mls.trans('PRINT_ONE_RECORD'), alertOptions);
        }
        else {
          this.http.get(api.HU_EMPLOYEE_CV_GET_FILE_NAME + this.selectedIds[0].toString()).subscribe((response: any) => {
            filename = response.innerBody;
          });

          this.loading = true;

          this.http
            .get(api.HU_EMPLOYEE_CV_GET_2C2008, {
              responseType: 'blob',
              params: { id: this.selectedIds[0].toString() },
            })
            .subscribe((response: Blob) => {
              if (response.type === 'application/octet-stream') {
                const downloadUrl = URL.createObjectURL(response);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', '2C_BNV_2008_' + filename + '.doc');
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
                    this.alertService.error(data.messageCode, alertOptions);
                  }
                };
                reader.readAsText(response);
              }
              this.loading = false;

            });
        }

        break;
      case EnumCoreButtonVNSCode.HEADER_PRINT_2C_98:

        if (this.selectedIds.length > 1) {
          this.alertService.warn(this.mls.trans('PRINT_ONE_RECORD'), alertOptions);
        } else {
          this.http.get(api.HU_EMPLOYEE_CV_GET_FILE_NAME + this.selectedIds[0].toString()).subscribe((response: any) => {
            filename = response.innerBody;
          });
          this.loading = true;
          this.http
            .get(api.HU_EMPLOYEE_CV_GET_2C98, {
              responseType: 'blob',
              params: { id: this.selectedIds[0].toString() },
            })
            .subscribe((response: Blob) => {
              if (response.type === 'application/octet-stream') {
                const downloadUrl = URL.createObjectURL(response);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', '2C_BNV_98_' + filename + '.doc');
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
                  this.alertService.warn(data.messageCode, alertOptions);
                };
                reader.readAsText(response);
              }
              this.loading = false;
            });
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_UPDATE:
        console.log(this.selectedIds[0]);
        break;
      default:
        break;
    }
  }
}
