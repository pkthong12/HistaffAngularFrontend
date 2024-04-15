import {
    Component,
    ViewChild,
    TemplateRef,
    AfterViewInit,
    Input,
  } from "@angular/core";
  
  import { RandomAvatarService } from 'src/app/services/random-avatar.service';
  
  import { BehaviorSubject } from "rxjs";
  import { Router, ActivatedRoute } from "@angular/router";
  
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
  
  
  @Component({
    selector: "cms-app-authority-tax-year",
    templateUrl: "./authority-tax-year.component.html",
    styleUrls: ["./authority-tax-year.component.scss"],
  })
  export class AuthorityTaxYearComponent  extends BaseComponent implements AfterViewInit {
  
    @Input() hideHeader!: boolean;
  
    /* START: Local filter params */
    orgIds!: number[];
    /* END: Local filter params */
  
    /*
    Properties being passed to core-page-list
    */
  
    title = EnumTranslateKey.UI_COMPONENT_TITLE_PA_AUTHORITY_TAX_YEAR
  
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

    // Sắp xếp lưới hiển thị theo cấp chức danh
    outerSort: ISortItem[] = [
      {
        field: "jobOrderNum",
        sortDirection: EnumSortDirection.ASC
      }
    ]
  
    apiDefinition: ICorePageListApiDefinition = {
      queryListRelativePath: api.PA_AUTHORITY_TAX_YEAR_QUERY_LIST,
    }
  
    crud: ICorePageListCRUD = {
      deleteIds: api.PA_AUTHORITY_TAX_YEAR_DELETE_IDS
    }
  
    avatarTemplate!: TemplateRef<any>;
  
    checkboxTemplate!: TemplateRef<any>;
    @ViewChild('isEmpRegister') isEmpRegister!: TemplateRef<any>;
    @ViewChild('isComApprove') isComApprove!: TemplateRef<any>;
    columns: ICoreTableColumnItem[] = [
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
        field: 'id',
        hidden: true,
        type: 'string',
        align: 'left',
        width: 200,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_EMPLOYEE_CODE,
        field: 'employeeCode',
        type: 'string',
        align: 'left',
        width: 150,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_EMPLOYEE_NAME,
        field: 'employeeName',
        type: 'string',
        align: 'left',
        width: 250,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_POSITION_NAME,
        field: 'positionName',
        type: 'string',
        align: 'left',
        width: 200,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_DEPARTMENT_NAME,
        field: 'departmentName',
        type: 'string',
        align: 'left',
        width: 200,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_YEAR,
        field: 'year',
        type: 'string',
        align: 'left',
        width: 200,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_IS_EMP_REGISTER,
        field: 'isEmpRegister',
        type: 'string',
        align: 'left',
        width: 200,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_IS_COM_APPROVE,
        field: 'isComApprove',
        type: 'string',
        align: 'left',
        width: 200,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_REASON_REJECT,
        field: 'reasonReject',
        type: 'string',
        align: 'left',
        width: 200,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_NOTE,
        field: 'note',
        type: 'string',
        align: 'left',
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
    ]
  
    defaultAvatar!: string;
  
    editRoute: ICorePageListEditRouting = {
        auxiliary: 'popupAux'
      }
    /* End Properties being passed to core-page-type-a */
  
    constructor(
      public override mls: MultiLanguageService,
      private ras: RandomAvatarService,
      private organizationService: OrganizationService
    ) {
      super(mls);
      this.defaultAvatar = ras.get();
  
      /* Get orgIds startup value */
      const newOrgIds: number[] = [];
      this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
      this.onOrgIdsChange(newOrgIds)
    }
  
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.columns.filter((c) => c.field === 'isEmpRegister')[0].templateRef =
                this.isEmpRegister;
            this.columns.filter((c) => c.field === 'isComApprove')[0].templateRef =
                this.isComApprove;
        });
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
  }
  