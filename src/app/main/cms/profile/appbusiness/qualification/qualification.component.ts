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
import { EnumSortDirection, IInOperator, ISortItem } from "src/app/interfaces/IQueryListRequest";
import { OrganizationService } from "src/app/services/organization.service";
import { EnumFilterOperator, IFilterOperator } from "src/app/interfaces/IQueryListRequest";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { api } from "src/app/constants/api/apiDefinitions";
import { Router, ActivatedRoute } from "@angular/router";
import { IGenerateTemplateRequest } from "src/app/libraries/core-page-list/core-page-list.service";

//setCulture("en");
@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.scss'],
  providers: [FilterService],
  encapsulation: ViewEncapsulation.None,
})
export class QualificationComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('isPrime') isPrime!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;
  generateTemplateRequest!: IGenerateTemplateRequest;
  headerFirstRowHeight: number = 60;

  datePeriodComparisonFor: string = 'effectFrom';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EFFECT_DAY;
  statusInclusionFor: string = 'workStatusId';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EMPLOYEE_STATUS;
  workStatusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;

  @Input() hideHeader!: boolean;
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  orgIds!: number[];

  title = EnumTranslateKey.UI_COMPONENT_TITLE_CERTIFICATE
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

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_CERTIFICATE_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_CERTIFICATE_DELETE_IDS,
  }

  avatarTemplate!: TemplateRef<any>;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
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
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EMPLOYEE_NAME,
      field: 'employeeFullName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TITLE_NAME,
      field: 'titleName',
      type: 'string',
      align: 'left',
      width: 330,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TYPECERTIFICATENAME,
      field: 'typeCertificateName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_IS_PRIME,
      field: 'isPrime',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      width: 100,
      readonly:true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TRAIN_FROM,
      field: 'trainFromDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TRAIN_TO,
      field: 'trainToDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EFFECT_DATE,
      field: 'effectFrom',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EXPIRE_DATE,
      field: 'effectTo',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_LEVEL,
      field: 'levelName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_MAJOR,
      field: 'major',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_LEVELTRAINNAME,
      field: 'levelTrainName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_CONTENTTRAIN,
      field: 'contentTrain',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_SCHOOLNAME,
      field: 'schoolName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_YEAR,
      field: 'year',
      type: 'string',
      align: 'left',
      width: 65,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_MARK,
      field: 'mark',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TYPETRAINNAME,
      field: 'typeTrainName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private ras: RandomAvatarService,
    private organizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(mls);
        const newOrgIds: number[] = [];
        this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
        this.onOrgIdsChange(newOrgIds)
  }
  ngAfterViewInit(): void {
    this.columns.filter(c => c.field === 'isPrime')[0].templateRef = this.isPrime;
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
        exCode: 'HU_CERTIFICATE',
        lang: x
      }
    })
  }
}
