import { Component, ViewEncapsulation, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import {
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICorePageListEditRouting,
} from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

import {
  FilterService,
  VirtualScrollService,
} from '@syncfusion/ej2-angular-grids';

import {
  ListBoxComponent,
  CheckBoxSelection,
} from '@syncfusion/ej2-angular-dropdowns';
import { setCulture } from '@syncfusion/ej2-base';
import { PayrollFormulaService } from './payrollformula.service';

ListBoxComponent.Inject(CheckBoxSelection);

const _ = require('lodash');
setCulture('en');

@Component({
  selector: 'app-hu-payroll-formula',
  templateUrl: './payrollformula.component.html',
  styleUrls: ['./payrollformula.component.scss'],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class PayrollFormulaComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /* START: Local filter params */
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]
  outerParam$ = new BehaviorSubject<any>(null);

  title = EnumTranslateKey.UI_COMPONENT_TITLE_SYS_PA_FORMULA;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_SALARY_TYPE_QUERY_LIST,
  };

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_SALARY_TYPE_DELETE_IDS,
    toggleActiveIds: api.HU_SALARY_TYPE_TOGGLE_ACTIVE_IDS,
  };

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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_TYPE_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_TYPE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_TYPE_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_TYPE_GROUP,
      field: 'salaryTypeGroupName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_TYPE_DESCRIPTION,
      field: 'description',
      type: 'string',
      align: 'left',
      width: 500,
    },
    
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  corePageListInstanceNumber!: number;

  constructor(
    public override mls: MultiLanguageService,
    private router: Router,
    private route: ActivatedRoute,
    public payrollFormulaService: PayrollFormulaService,
  ) {
    super(mls);
    this.corePageListInstanceNumber = new Date().getTime();
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.columns.filter((c) => c.field === 'status')[0].templateRef = this.sticker

    })
  }


  onRowDoubleClick(e: any) {

    this.payrollFormulaService.changeObjSalaryId(e.id);
    console.log(e.id);
    this.router.navigate(
      [
        btoa(e.id),
        { listInstance: this.corePageListInstanceNumber },
      ],
      {
        relativeTo: this.route.parent,
      }
    );

  }


}