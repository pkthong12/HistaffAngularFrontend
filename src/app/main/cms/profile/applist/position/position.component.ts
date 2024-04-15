import {
  Component,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { setCulture } from '@syncfusion/ej2-base';
import {
  FilterService,
  VirtualScrollService,
} from '@syncfusion/ej2-angular-grids';
import {
  ListBoxComponent,
  CheckBoxSelection,
} from '@syncfusion/ej2-angular-dropdowns';
ListBoxComponent.Inject(CheckBoxSelection);
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import {
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICorePageListEditRouting,
} from 'src/app/libraries/core-page-list/core-page-list.component';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { ICoreButtonVNS } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { EnumCoreButtonVNSCode } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EnumFilterOperator,
  IFilterOperator,
  IInOperator,
} from 'src/app/interfaces/IQueryListRequest';
import { OrganizationService } from 'src/app/services/organization.service';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { DialogService } from 'src/app/services/dialog.service';
import { AppService } from 'src/app/services/app.service';
import { IAlertOptions } from 'src/app/libraries/alert/alert/alert.model';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { CorePageListService } from 'src/app/libraries/core-page-list/core-page-list.service';
import { PositionEditService } from './edit/positon.edit.service';
setCulture('en');

@Component({
  selector: 'cms-app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class PositionComponent extends BaseComponent implements AfterViewInit {
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]

  @ViewChild('isTDV') isTDV!: TemplateRef<any>;
  @ViewChild('isNotot') isNotot!: TemplateRef<any>;
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  // @ViewChild('isplan') isplan!: TemplateRef<any>;
  // @ViewChild('isnonphysical') isnonphysical!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;
  orgIds!: number[];
  orgId!: number;

  listInstance!: number;
  selectedIds: number[] = [];
  outerParam$ = new BehaviorSubject<any>(null);

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_POSITION_QUERY_LIST,
  };
  title = EnumTranslateKey.UI_COMPONENT_TITLE_POSITION;
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_POSITION_DELETE_IDS,
    toggleActiveIds: api.HU_POSITION_CHANGESTATUS
  };

  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL,
    },
  ];
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || [],
    },
  ];
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_IS_ACTIVE,
      field: 'active',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_ACTIVE_INACTIVE,
      type: 'string',
      align: 'center',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 110,
      hidden:true
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_MASTER,
      field: 'masterName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_INTERIM,
      field: 'interimName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_ORGNAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_LM_JOB,
      field: 'lmJobName',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_LM,
      field: 'lmName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_CSM_JOB,
      field: 'csmJobName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_CSM,
      field: 'csmName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_IS_TDV,
      field: 'isTDV',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'left',
      width: 200,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_IS_NOT_OT,
      field: 'isNotot',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'left',
      width: 200,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_EFFECTIVE_DATE,
      field: 'effectiveDate',
      pipe: EnumCoreTablePipeType.DATE,
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_JOB_DESC,
      field: 'jobDesc',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
    
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(
    public positionEditService : PositionEditService,
    public override mls: MultiLanguageService,
    public router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private alertService: AlertService,
    public dialogService: DialogService,
    public appService: AppService,
    private corePageListService: CorePageListService
  ) {
    super(mls);

    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map((x) =>
      newOrgIds.push(Number(x))
    );
    this.onOrgIdsChange(newOrgIds);
    this.listInstance = Number(
      this.route.snapshot.paramMap.get('listInstance')!
    );
    
  }

  onSelectedIdsChangeeee(e: number[]): void {
    this.selectedIds = e;
  }
  onRowClick(event : any){

  }




  ngAfterViewInit(): void {
    // trong ngAfterViewInit nếu muốn thay đổi thuộc tính của ts cần gói vào setTimeout

    setTimeout(() => {
      this.columns.filter((c) => c.field === 'isTDV')[0].templateRef =
        this.isTDV;
      this.columns.filter((c) => c.field === 'isNotot')[0].templateRef =
        this.isNotot;
        const stickerFilter = this.columns.filter(c => c.field === 'active');
        if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
      // this.columns.filter(c => c.field === 'isplan')[0].templateRef = this.isplan;
      // this.columns.filter(c => c.field === 'isnonphysical')[0].templateRef = this.isnonphysical;
    });
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

  onInstanceCreated(event: number) {
    this.listInstance = event;
  }
  swapMasterInterim(): void {
    if (this.selectedIds == null || this.selectedIds.length == 0|| this.selectedIds == undefined) {
      return this.alertService.warn(
        this.mls.trans('UI_COMPONENT_TITLE_POSITION_IDS_NULL'),
        this.alertOptions
      );
    }
    const confirm = window.confirm(
      this.mls.trans('common.confirm.job.swap.masterinterim') + '?'
    );
    if (confirm) {
      
      this.subscriptions.push(
        // <== Inner push
        this.appService
          .post(api.HU_POSITION_SWAP, { ids: this.selectedIds })
          .subscribe((res: any) => {
            if (!!res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body;
              // reload màn hình
              const listInstances = this.corePageListService.instances.filter(
                (y) => y.instanceNumber === this.listInstance
              );
              if (!!listInstances.length) {
                listInstances[0].reloadFlag$.next(
                  !!!listInstances[0].reloadFlag$.value
                );
              }
              // end reload màn hình
              // this.alertService.success(
              //   this.mls.trans(body.messageCode),
              //   //this.alertOptions
              // );
            }
          })
      );
    }
  }
  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    //console.log("StaffProfileComponent onCorePageHeaderButtonClick", e)
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        //this.router.navigate([btoa('0')], { relativeTo: this.route })
        
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        
        break;
      case EnumCoreButtonVNSCode.HEADER_SWAP:
        this.swapMasterInterim();
        break;
      default:
    }
  }
}
