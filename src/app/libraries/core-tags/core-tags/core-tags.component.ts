import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, isDevMode } from '@angular/core';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { ITag } from '../interfaces';
import { EnumCoreButtonCode } from '../../core-button-group/core-button/EnumButtonCaptionCode';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICoreButtonVNS } from '../../core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { CorePermissionService } from '../../core-permission/core-permission.service';
import { AlertService } from '../../alert/alert.service';
import { Subscription } from 'rxjs';
import { ICoreFunctionAction } from '../../core-permission-actions/core-permission-actions/core-permission-actions.component';
import { alertOptions, noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { IFunctionWithFullActions, RoutingService } from 'src/app/services/routing.service';

import { CORE_VNS_BUTTONS } from '../../core-button-group-vns/core-button-group-vns/core-button-group-vns.component';
import { EnumCoreButtonVNSCode } from '../../core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';

@Component({
  selector: 'core-tags',
  templateUrl: './core-tags.component.html',
  styleUrls: ['./core-tags.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreTagsComponent
    }
  ]
})
export class CoreTagsComponent extends CoreFormControlBaseComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() functionId!: number;
  @Input() allOptions!: ITag[];
  @Input() override disabled!: boolean;
  @Output() onValueChange = new EventEmitter<ICoreFunctionAction>();  // to bypass using ngModel binding inside ngTemplate

  override value: number[] = [];
  lang!: string;

  tags: ITag[] = [];
  search: string = "";
  checkAll!: boolean;

  actionButtons: ICoreButtonVNS[] = [];

  subscriptions: Subscription[] = [];

  shownButtons: EnumCoreButtonCode[] = [EnumCoreButtonCode.SAVE];

  viewAbstractButton: ICoreButtonVNS = CORE_VNS_BUTTONS.filter(x => x.code === EnumCoreButtonVNSCode.HEADER_VIEW_ABSTRACT)[0];

  constructor(
    private corePermissionService: CorePermissionService,
    private alertService: AlertService,
    private mls: MultiLanguageService,
    private routingService: RoutingService,
  ) {
    super();
  }

  override writeValue(obj: number[]): void {
    this.value = obj
    this.allOptions.map(t => {
      if (obj?.includes(t.id)) {
        t.enabled = true;
      } else {
        t.enabled = false;
      }
    })
  }

  mapActionButton(): void {
    this.tags.map(x => {
      const filter = this.actionButtons.filter(ab => ab.code === x.text);
      if (!!filter.length) {
        x.actionButton = filter[0];
      } else {
        x.actionButton = this.viewAbstractButton;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allOptions']) {
      this.tags = JSON.parse(JSON.stringify(changes['allOptions'].currentValue))
      const filter = this.tags.filter(x => x.text === 'HEADER_VIEW_ABSTRACT');
      if (!!filter.length) {
        filter[0].actionButton = this.viewAbstractButton;
      }
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    const filter = this.routingService.fullFunctions$.value.filter(x => x.id === this.functionId);
    if (!!filter.length) {
      const actions: string[] = filter[0].actionCodes;
      const newActionButtons: ICoreButtonVNS[] = [];
      actions.map(a => {
        const actionButtons = CORE_VNS_BUTTONS.filter(b => b.code === a);
        if (!!actionButtons.length) {
          newActionButtons.push(actionButtons[0]);
        }
      })
      this.actionButtons = newActionButtons;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.corePermissionService.selectedObjectActionPermissions$.subscribe(x => {
          this.tags.map(tag => {
            const filter = x.filter(m => m.functionId === this.functionId);
            if (filter.length === 1) {
              tag.enabled = filter[0].allowedActionIds.includes(tag.id);
            } else if (filter.length === 0) {
              tag.enabled = false;
            } else {
              if (isDevMode()) {
                this.alertService.error(`selectedObjectActionPermissions has duplicate functionId=${this.functionId}`, noneAutoClosedAlertOptions);
              }
            }
          })
        })
      )
      this.mapActionButton();
    })
  }

  onSuggestItemClick(tag: ITag): void {

  }

  onInputKeydown(e: any): void {

  }

  onActive(tag: ITag): void {

  }

  onToogleItem(tag: ITag): void {
    if (!!this.disabled) {
      this.alertService.info(this.mls.trans('UI_USER_PERMISSION_TO_EDIT_PLEASE_SELECT_A_USER_AND_CLICK_THE_PENCIL', this.lang), alertOptions);
      return;
    }

    tag.enabled = !tag.enabled;

    // recalculate the value
    const newValue = [...this.value].filter(x => x != tag.id)
    if (!!tag.enabled) newValue.push(tag.id);
    this.value = newValue;
    this.onChange(newValue);

    this.onValueChange.emit({
      functionId: this.functionId,
      allowedActionIds: newValue
    });

  }

  toggleCheckAll() {
    if (!!this.disabled) {
      this.alertService.info(this.mls.trans('UI_USER_PERMISSION_TO_EDIT_PLEASE_SELECT_A_USER_AND_CLICK_THE_PENCIL', this.lang), alertOptions);
      return;
    }

    this.checkAll = !this.checkAll;
    this.tags.map(t => t.enabled = this.checkAll)

    // recalculate the value
    const newValue: number[] = [];
    if (!!this.checkAll) {
      this.allOptions.map(x => {
        newValue.push(x.id);
      })
    }
    this.value = newValue;
    this.onChange(newValue);

    this.onValueChange.emit({
      functionId: this.functionId,
      allowedActionIds: newValue
    });

  }

}
