import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Inject,
  AfterViewInit,
  TemplateRef,
} from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// Service Translate
import { TranslationLoaderService } from 'src/app/common/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
// Import the locale files
// Globals File
import { Globals } from 'src/app/common/globals';
import { Configs } from 'src/app/common/configs';
import { Notification } from 'src/app/common/notification';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import {
  FilterService,
  GridComponent,
  VirtualScrollService,
} from '@syncfusion/ej2-angular-grids';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-grids';
import { ToolbarItem, ToolbarInterface } from 'src/app/_models/index';
import { Query } from '@syncfusion/ej2-data';
import {
  ListBoxComponent,
  CheckBoxSelection,
} from '@syncfusion/ej2-angular-dropdowns';
ListBoxComponent.Inject(CheckBoxSelection);
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { HttpResponse } from '@angular/common/http';
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
import {
  EnumFilterOperator,
  IFilterOperator,
} from 'src/app/interfaces/IQueryListRequest';
import { SysOrtherlistEditService } from '../sys-otherlist-edit/sys-ortherlist.edit.service';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { ICoreListOption } from 'src/app/libraries/core-list/core-list/core-list.component';
import { ISysGroup } from 'src/app/interfaces/entitiesCamelCase/ISysGroup';
import { log } from 'console';
setCulture('en');
@Component({
  selector: 'app-sys-otherlist',
  templateUrl: './sys-otherlist.component.html',
  styleUrls: ['./sys-otherlist.component.scss'],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class SysOtherlistComponent
  extends BaseComponent
  implements AfterViewInit, OnInit
{
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  override subscriptions: Subscription[] = [];
  otherListOption: ICoreListOption[] = [];
  typeId!: number;
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'typeId',
      operator: EnumFilterOperator.EQUAL,
    },
  ];

  outerParam$ = new BehaviorSubject<any>(null);
  title = EnumTranslateKey.UI_COMPONENT_TITLE_ORTHERLIST;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_OTHERLIST_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_OTHERLIST_DELETE_IDS,
    toggleActiveIds: api.SYS_OTHER_LIST_ACTIVE
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: 'ContractType.ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_IS_ACTIVE,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_TYPENAME,
      field: 'typeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_EFFECTIVE_DATE,
      field: 'effectiveDate',
      type: 'date',
      align: 'left',
      width: 250,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_EXPIRATION_DATE,
      field: 'expirationDate',
      type: 'date',
      align: 'left',
      width: 250,
      pipe: EnumCoreTablePipeType.DATE
    },
    
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_OTHERLIST_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250,
    },
    
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private sysOtherListService: SysOrtherlistEditService
  ) {
    super(mls);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }
  override ngOnInit(): void {
    this.subscriptions.push(
      this.sysOtherListService.GetAllGroupOtherListType().subscribe((x) => {
        if (x.ok && x.status === 200) {
          const newGroupOptions: ICoreListOption[] = [];
          (x.body.innerBody as ISysGroup[]).map((x) => {
            newGroupOptions.push({
              value: x.id,
              text: x.name,
            });
          });
          this.otherListOption = newGroupOptions;
        }
      })
    );
  }

  onOtherListTypeChange(typeId: number) {
    if (!!this.outerParam$.value) {
      const newOuterFilterParam = JSON.parse(
        JSON.stringify(this.outerParam$.value)
      );
      newOuterFilterParam['typeId'] = typeId;
      this.outerParam$.next(newOuterFilterParam);
      this.subscriptions.push();
    } else {
      this.outerParam$.next({ typeId });
    }

    this.sysOtherListService.typeId = typeId;
  }
}
