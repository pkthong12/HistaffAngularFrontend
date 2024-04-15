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

import { EnumFilterOperator, IFilterOperator } from "src/app/interfaces/IQueryListRequest";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { api } from "src/app/constants/api/apiDefinitions";
import { AppService } from "src/app/services/app.service";
import { CorePageListService } from "src/app/libraries/core-page-list/core-page-list.service";
import { ICoreButtonVNS } from "src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS";
import { EnumCoreButtonVNSCode } from "src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode";
import { IFormatedResponse } from "src/app/interfaces/IFormatedResponse";
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [FilterService],
  encapsulation: ViewEncapsulation.None,
})
export class CompanyComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  @Input() hideHeader!: boolean;

  orgId!: number;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY

  outerParam$ = new BehaviorSubject<any>(null);
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL
    }
  ]

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_COMPANY_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_COMPANY_DELETE_IDS,
    toggleActiveIds: api.HU_COMPANY_TOGGLE_ACTIVE_IDS
  }

  avatarTemplate!: TemplateRef<any>;

  columns: ICoreTableColumnItem[] = [
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_STT,
    //   field: 'order',
    //   type: 'string',
    //   align: 'left',
    //   width: 50,
    // },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_STATUS,
      field: 'isActiveStr',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 50,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_NAME_VN,
      field: 'nameVn',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_NAME_EN,
      field: 'nameEn',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_SHORT_NAME,
      field: 'shortName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_REGION,
    //   field: 'regionName',
    //   type: 'string',
    //   align: 'left',
    //   width: 150,
    // },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_ADDRESS_GPKD,
      field: 'gpkdAddress',
      type: 'string',
      align: 'left',
      width: 500,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_ADDRESS_WORKING,
      field: 'workAddress',
      type: 'string',
      align: 'left',
      width: 400,
    },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_INSURANCE_UNIT,
    //   field: 'insUnitName',
    //   type: 'string',
    //   align: 'left',
    //   width: 150,
    // },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_TAX,
      field: 'pitCode',
      type: 'string',
      align: 'left',
      width: 150,
    },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_TAX_DATE,
    //   field: 'pitCodeDate',
    //   type: 'date',
    //   pipe: EnumCoreTablePipeType.DATE,
    //   align: 'left',
    //   width: 150,
    // },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_REPRESENT,
      field: 'representativeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_TITLE,
      field: 'representativeTitle',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_GPKD,
      field: 'gpkdNo',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_PHONE,
      field: 'phoneNumber',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_EMAIL,
      field: 'email',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_FAX,
      field: 'fax',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_OTHER_INFO,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
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
    private appService: AppService,
    public corePageListService : CorePageListService
  ) {
    super(mls);
    this.defaultAvatar = ras.get();
  }
  ngAfterViewInit(): void {
    const stickerFilter = this.columns.filter(c => c.field === 'isActiveStr');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }

  onOrgIdChange(orgId: number) {
    if (!!this.outerParam$.value) {
      const newOuterParam = JSON.parse(JSON.stringify(this.outerParam$.value))
      newOuterParam['orgId'] = orgId;
      this.outerParam$.next(newOuterParam);
    } else {
      this.outerParam$.next({ orgId });
    }
  }


  // khai báo thuộc tính "selectedIds"
  // để lưu mảng các id
  public selectedIds!: number[];


  // vì có code mẫu áp dụng/ngừng áp dụng
  // nên tôi cmt code viết tay lại
  
  // khai báo phương thức
  // public onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
  //   // in ra console log cái đối tượng "e"
  //   console.log("StaffProfileComponent onCorePageHeaderButtonClick", e);

  //   debugger;

  //   switch (e.code) {
  //     // khi bấm áp dụng
  //     case EnumCoreButtonVNSCode.HEADER_ACTIVATE:
  //       // viết code xử lý
  //       // khi bấm button áp dụng

  //       console.log("bạn đã bấm áp dụng");
  //       console.log("mảng selectedIds sau khi lấy được:\n", this.selectedIds);

  //       debugger;

  //       // post cái mảng id lên server
  //       this.appService.post(api.HU_COMPANY_SUBMIT_ACTIVE, this.selectedIds).subscribe(x => {
          
  //         // chỗ này là copy code
  //         if (x.ok && x.status === 200) {
  //           // khai báo biến "body"
  //           const body: IFormatedResponse = x.body
            
  //           if (body.statusCode === 200) {
  //             // sử dụng reloadFlag$
  //             // để cập nhật lưới ở ngoài giao diện
              
  //             // kiểu bản đầu có 4 bản ghi
  //             // sau khi phê duyệt 1 bản ghi
  //             // thì cập nhật lại cái lưới
  //             // để hiển thị ra 3 bản ghi

  //             this.corePageListService.instances[0].reloadFlag$.next(!this.corePageListService.instances[0].reloadFlag$.value)


  //             // sau khi post lên server thành công
  //             // thì xóa hết dữ liệu trong mảng chứa "id" đi
  //             this.selectedIds = [];
  //           }
  //           else {
  //             // ...
  //           }
  //         }
  //         else {
  //           // ...
  //         }

  //       });
        
  //       break;


  //     // khi bấm ngừng áp dụng
  //     case EnumCoreButtonVNSCode.HEADER_INACTIVATE:
  //       // viết code xử lý
  //       // khi bấm button ngừng áp dụng

  //       console.log("bạn đã bấm ngừng áp dụng");
  //       console.log("mảng selectedIds sau khi lấy được:\n", this.selectedIds);

  //       debugger;

  //       // post cái mảng id lên server
  //       this.appService.post(api.HU_COMPANY_SUBMIT_STOP_ACTIVE, this.selectedIds).subscribe(x => {
          
  //         // chỗ này là copy code
  //         if (x.ok && x.status === 200) {
  //           // khai báo biến "body"
  //           const body: IFormatedResponse = x.body
            
  //           if (body.statusCode === 200) {
  //             // sử dụng reloadFlag$
  //             // để cập nhật lưới ở ngoài giao diện
              
  //             // kiểu bản đầu có 4 bản ghi
  //             // sau khi phê duyệt 1 bản ghi
  //             // thì cập nhật lại cái lưới
  //             // để hiển thị ra 3 bản ghi

  //             this.corePageListService.instances[0].reloadFlag$.next(!this.corePageListService.instances[0].reloadFlag$.value)


  //             // sau khi post lên server thành công
  //             // thì xóa hết dữ liệu trong mảng chứa "id" đi
  //             this.selectedIds = [];
  //           }
  //           else {
  //             // ...
  //           }
  //         }
  //         else {
  //           // ...
  //         }

  //       });
        
  //       break;


  //     default:
  //       break;
  //   }
  // }


  // khai báo phương thức onSelectedIdsChange()
  // để lấy mảng ở ngoài giao diện
  // chính là đối tượng "e"
  // lấy được rồi thì gán vào mảng "selectedIds"
  public onSelectedIdsChange(e: any) {
    // in ra console log cái "e"
    console.log("in ra đối tượng \"e\" khi bấm vào checkbox\n:", e);

    this.selectedIds = e;
  }

}
