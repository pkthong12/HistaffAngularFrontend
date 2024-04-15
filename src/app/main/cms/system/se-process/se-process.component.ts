import { Component, ViewEncapsulation, AfterViewInit, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import {
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICorePageListEditRouting,
} from 'src/app/libraries/core-page-list/core-page-list.component';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

import { FilterService, VirtualScrollService } from '@syncfusion/ej2-angular-grids';

import { ListBoxComponent, CheckBoxSelection } from '@syncfusion/ej2-angular-dropdowns';
import { setCulture } from '@syncfusion/ej2-base';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { EnumFilterOperator, IFilterOperator, IInOperator } from 'src/app/interfaces/IQueryListRequest';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-phase-advance',
  templateUrl: './se-process.component.html',
  styleUrls: ['./se-process.component.scss'],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class SeProcessComponent implements OnInit, OnDestroy {
  @ViewChild('isNotiApprove') isNotiApprove!: TemplateRef<any>;
  @ViewChild('isNotiNotApprove') isNotiNotApprove!: TemplateRef<any>;
  @ViewChild('isNotiApproveSuccess') isNotiApproveSuccess!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;

  outerParam$ = new BehaviorSubject<any>(null);

  title = EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SE_PROCESS_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.SE_PROCESS_DELETE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: 'id',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_TYPE,
      field: 'processTypeId',
      type: 'string',
      align: 'left',
      width: 250,
      hidden: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_TYPE,
      field: 'processTypeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_CONTENT_APPROVE,
      field: 'approvedContent',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_CONTENT_APPROVE_SUCCESS,
      field: 'approvedSucessContent',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_CONTENT_NOT_APPROVE,
      field: 'notApprovedContent',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_IS_NOTI_APPROVE,
      field: 'isNotiApprove',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'left',
      readonly: true,
      templateRef: this.checkboxTemplate,
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_IS_NOTI_NOT_APPROVE,
      field: 'isNotiNotApprove',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'left',
      readonly: true,
      templateRef: this.checkboxTemplate,
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_IS_NOTI_APPROVE_SS,
      field: 'isNotiApproveSuccess',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      readonly: true,
      templateRef: this.checkboxTemplate,
      width: 350,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_DESCRIPTION,
      field: 'proDescription',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_APPROVE,
      field: 'approve',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_REFUSE,
      field: 'refuse',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_ADJUSTMENT_PARAM,
      field: 'adjustmentParam',
      type: 'string',
      align: 'left',
      width: 250,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(private organizationService: OrganizationService) {}

  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'isNotiApprove')[0].templateRef = this.isNotiApprove;
    this.columns.filter((c) => c.field === 'isNotiApproveSuccess')[0].templateRef = this.isNotiApproveSuccess;
    this.columns.filter((c) => c.field === 'isNotiNotApprove')[0].templateRef = this.isNotiNotApprove;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
