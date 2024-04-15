import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ICorePageListApiDefinition } from '../../core-page-list/core-page-list.component';
import { api } from 'src/app/constants/api/apiDefinitions';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { ICoreTableColumnItem } from '../../core-table/core-table.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/services/layout.service';

import { CorePermissionService } from '../../core-permission/core-permission.service';

export interface ICoreFunctionAction {
  functionId: number;
  allowedActionIds: number[];
}

export interface IUserPermissionAction {
  userId: string;
  functionActions: ICoreFunctionAction[];
}

export interface IGroupPermissionAction {
  groupId: number;
  functionActions: ICoreFunctionAction[];
}

@Component({
  selector: 'core-permission-actions',
  templateUrl: './core-permission-actions.component.html',
  styleUrls: ['./core-permission-actions.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CorePermissionActionsComponent
    }
  ]
})
export class CorePermissionActionsComponent extends CoreFormControlBaseComponent implements OnInit, AfterViewInit {

  @Input() loading!: boolean;
  @Input() height!: number;

  override value: ICoreFunctionAction[] = [];

  @ViewChild('actions') actions!: TemplateRef<any>;

  subscriptions: Subscription[] = [];

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_USER_PERMISSION_QUERY_LIST,
  }

  allowEdit!: boolean;

  corePageListContentHeight!: number;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 0,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MODULE_NAMECODE,
      field: 'moduleName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_NAMECODE,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_PATH,
      field: 'path',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_ACTION_NAMECODE,
      field: 'appActions',
      type: 'string',
      align: 'left',
      hideSearchBox: true,
      width: 1000,
      templateRef: this.actions,
      templateRefAllowEditOnRowActived: true
    },
  ];

  constructor(
    private corePermissionService: CorePermissionService,
    private layoutService: LayoutService
  ) {
    super()
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.corePermissionService.selectedObjectActionPermissions$.subscribe(x => this.value = x)
    );
  }

  override setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {

      this.columns.filter(c => c.field === 'appActions')[0].templateRef = this.actions;

      this.subscriptions.push(
        this.layoutService.contentContainerHeight$.subscribe(x => {
          this.corePageListContentHeight = x - this.layoutService.corePageHeaderHeight - this.layoutService.coreTabsHeaderLineHeight - this.layoutService.basicSpacing * 2
        })
      )
      

    })
  }

  onTagsValueChange(e: ICoreFunctionAction): void {
    const newValue = [...this.value];
    const tryFilter = newValue.filter(f => f.functionId === e.functionId);
    if (!!tryFilter.length) {
      tryFilter[0].allowedActionIds = e.allowedActionIds;
    } else {
      newValue.push(e)
    }
    this.writeValue(newValue);
    this.onChange(newValue);
  }

}
