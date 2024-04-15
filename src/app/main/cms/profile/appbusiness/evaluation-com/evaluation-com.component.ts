import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
  TemplateRef,
  AfterViewInit,
  Input,
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



// thêm code
// để có được bảng bên trái
// lọc nhân viên theo tổ chức
import { EnumFilterOperator, EnumSortDirection, IFilterOperator, IInOperator, ISortItem } from "src/app/interfaces/IQueryListRequest";


// comment code
// import { EnumFilterOperator, IFilterOperator } from "src/app/interfaces/IQueryListRequest";


// thêm code
// để có được bảng bên trái
// lọc nhân viên theo tổ chức
import { OrganizationService } from 'src/app/services/organization.service';


import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { api } from "src/app/constants/api/apiDefinitions";


// cần sử dụng
// kiểu dữ liệu enum EnumCoreButtonVNSCode
import { EnumCoreButtonVNSCode } from "src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode";
import { IGenerateTemplateRequest } from "src/app/libraries/core-page-list/core-page-list.service";


@Component({
  selector: 'app-evaluation-com',
  templateUrl: './evaluation-com.component.html',
  styleUrls: ['./evaluation-com.component.scss'],
  providers: [FilterService],
  encapsulation: ViewEncapsulation.None,
})
export class EvaluationComComponent extends BaseComponent implements AfterViewInit {


  // thêm code
  // để có được bảng bên trái
  // lọc nhân viên theo tổ chức
  orgIds!: number[];

  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  @Input() hideHeader!: boolean;

  orgId!: number;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATION_COM

  outerParam$ = new BehaviorSubject<any>(null);
  
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL
    }
  ];
  generateTemplateRequest!: IGenerateTemplateRequest;

  // thêm code
  // để có được bảng bên trái
  // lọc nhân viên theo tổ chức
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ];

  // ở đây viết api
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_EVALUATION_COM_QUERY_LIST,
  }

  
  // ở đây viết api
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_EVALUATION_COM_DELETE_IDS,
  }

  avatarTemplate!: TemplateRef<any>;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_JOB_ORDER_NUM,
      field: 'jobOrderNum',
      type: 'string',
      align: 'right',
      width: 0,
      hidden: true,
    },
    {
      // đây là trường năm đánh giá
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_YEAR,
      field: 'yearEvaluationStr',
      type: 'string',
      align: 'center',
      width: 100,
    },
    {
      // đây là trường mã nhân viên
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      // đây là trường id bị ẩn
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'id',
      type: 'number',
      align: 'right',
      hidden: true,
      width: 1,
    },
    {
      // đây là trường họ và tên
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_FULL_NAME,
      field: 'fullName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      // đây là trường chi bộ sinh hoạt "Living Area"

      // Thắng làm chi bộ sinh hoạt là "LivingCell"
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_LIVING_AREA,
      field: 'livingCell',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      // đây là trường chức vụ đảng "Position Communist"

      // Thắng đặt tên chức vụ đảng là "MemberPosition"
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_POSITION_COMMUNIST,
      field: 'memberPosition',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      // đây là trường xếp loại đánh giá "Evaluation Category"
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_EVALUATION_CATEGORY,
      field: 'evaluationCategory',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      // đây là trường điểm đánh giá "Point Evaluation"
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_POINT_EVALUATION,
      field: 'pointEvaluationStr',
      type: 'string',
      align: 'center',
      width: 110,
    },
    // tester Tuấn Anh bảo ẩn trường ghi chú

    // {
    //   // đây là trường ghi chú
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_NOTE,
    //   field: 'note',
    //   type: 'string',
    //   align: 'left',
    //   width: 150,
    // },
  ]

  defaultAvatar!: string;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */


  // khai báo thuộc tính
  public buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
  ];


  // khai báo thuộc tính
  public statusInclusionFor: string = 'workStatusId';

  // khai báo thuộc tính
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_STATUS_ID;

  // khai báo thuộc tính
  public statusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;


  // khai báo thuộc tính
  datePeriodComparisonFor: string = 'joinDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_JOIN_DATE


  workStatusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;

  constructor(
    public override mls: MultiLanguageService,
    private ras: RandomAvatarService,


    // thêm code
    // để có được bảng bên trái
    // lọc nhân viên theo tổ chức
    private organizationService: OrganizationService
  ) {
    super(mls);
    this.defaultAvatar = ras.get();


    // thêm code
    // để có được bảng bên trái
    // lọc nhân viên theo tổ chức
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map((x) => newOrgIds.push(Number(x)));
    this.onOrgIdsChange(newOrgIds);
  }
  ngAfterViewInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: 'HU_EVALUATION_COM',
        lang: x
      }
    })
  }

  /*
  onOrgIdChange(orgId: number) {
    if (!!this.outerParam$.value) {
      const newOuterParam = JSON.parse(JSON.stringify(this.outerParam$.value))
      newOuterParam['orgId'] = orgId;
      this.outerParam$.next(newOuterParam);
    } else {
      this.outerParam$.next({ orgId });
    }
  }
  */ 

  // thêm code
  // để có được bảng bên trái
  // lọc nhân viên theo tổ chức
  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }
  onButtonClick(nam: any){
    this.outerParam$.next({
      yearEvaluation: nam
    });
    
  }
}