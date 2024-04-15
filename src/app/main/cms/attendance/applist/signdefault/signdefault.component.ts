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
import { IGenerateTemplateRequest } from "src/app/libraries/core-page-list/core-page-list.service";

@Component({
  selector: "cms-app-sign-default",
  templateUrl: "./signdefault.component.html",
  styleUrls: ["./signdefault.component.scss"],
})
export class SignDefaultComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  @Input() hideHeader!: boolean;

  /* START: Local filter params */
  orgIds!: number[];
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_SIGN_DEFAULT
  generateTemplateRequest!: IGenerateTemplateRequest;
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
    queryListRelativePath: api.AT_SIGN_DEFAULT_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.AT_SIGN_DEFAULT_DELETE_IDS,
    toggleActiveIds: api.AT_SIGN_DEFAULT_TOGGLE_ACTIVE_IDS,
  }

  avatarTemplate!: TemplateRef<any>;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SIGN_DEFAULT_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 90,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SIGN_DEFAULT_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 170,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SIGN_DEFAULT_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_ORGANIZATION_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SIGN_DEFAULT_SHIFT,
      field: 'signDefaultName',
      type: 'string',
      align: 'left',
      width: 100
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EFFECT_DAY,
      field: 'effectDateFrom',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EXPIRE_DAY,
      field: 'effectDateTo',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
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
    private router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService
  ) {
    super(mls);
    this.defaultAvatar = ras.get();

    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
  }

  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: "AT_SIGN_DEFAULT",
        lang: x
      }
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
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
