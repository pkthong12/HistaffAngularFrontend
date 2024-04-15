import {
  Component,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

// Service Translate
// Import the locale files
// Globals File
import {
  FilterService,
  VirtualScrollService,
} from '@syncfusion/ej2-angular-grids';
import {
  ListBoxComponent,
  CheckBoxSelection,
} from '@syncfusion/ej2-angular-dropdowns';
ListBoxComponent.Inject(CheckBoxSelection);

import {
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICorePageListEditRouting,
} from 'src/app/libraries/core-page-list/core-page-list.component';
import {
  ICoreTableColumnItem,
} from 'src/app/libraries/core-table/core-table.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumCoreOrgTreeaAccessorMode } from 'src/app/libraries/core-org-tree/core-org-tree/core-org-tree.component';
import { FormGroup } from '@angular/forms';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { OrganizationService } from 'src/app/services/organization.service';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { SalaryPeriodService } from './salaryperiod.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'cms-app-salaryperiod',
  templateUrl: './salaryperiod.component.html',
  styleUrls: ['./salaryperiod.component.scss'],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class SalaryPeriodComponent
  extends BaseComponent
  implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD;

  subsctiptions: Subscription[] = [];
  //list!: any[]
  form!: FormGroup;
  accessorMode: EnumCoreOrgTreeaAccessorMode =
    EnumCoreOrgTreeaAccessorMode.CHECKED;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_SALARY_PERIOD_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.AT_SALARY_PERIOD_DELETE_IDS,
    toggleActiveIds: api.AT_SALARY_PERIOD_TOGGLE_ACTIVE_IDS
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_IS_ACTIVE,
      field: 'actflg',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_YEAR,
      field: 'year',
      type: 'string',
      align: 'left',
      width: 70,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_MONTH,
      field: 'month',
      type: 'string',
      align: 'center',
      width: 60,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_DATE_START,
      field: 'startDate',
      type: 'string',
      align: 'center',
      width: 110,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_DATE_END,
      field: 'endDate',
      type: 'string',
      align: 'center',
      width: 110,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_IS_ACTIVE,
      field: 'actflg',
      type: 'string',
      align: 'left',
      width: 200,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ];

  checkedOrgIds!: number[];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private salaryPeriodService: SalaryPeriodService,
    private alertService: AlertService,
    private organizationService: OrganizationService,
    private appService: AppService

  ) {
    super(mls);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.checkedOrgIds = [];
      const stickerFilter = this.columns.filter(c => c.field === 'actflg');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }

  onRowClick(e: any) {

    this.checkedOrgIds = e.orgIds;

    /*
    if (e) {
      
      this.subsctiptions.push(
        this.appService.get(api.AT_SALARY_PERIOD_READ + `?id=${e.id}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                this.checkedOrgIds = body.innerBody.orgIds;
                console.log(this.checkedOrgIds);
                
              }
            }
          })
      )!;
      
    }
    */

  }
}
