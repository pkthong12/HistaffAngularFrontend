import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, isDevMode, ViewChild, Injector, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { EnumCoreFormControlSeekerSourceType } from '../EnumCoreFormControlSeekerSourceType';
import { AlertService } from '../../alert/alert.service';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ICoreFormControlSeekerExtraBindingModel } from '../../core-form/core-form/enum-interfaces';
import { noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { IOrgTreeItem } from '../../core-org-tree/core-org-tree/IOrgTreeItem';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';
import { ECoreTableToolClass, ECoreTableToolCode, ICoreTableColumnItem, ICoreTableToolClickEventEmitterData, ICoreTableToolItem } from '../../core-table/core-table.component';

import { CoreEmployeeSeekerComponent } from '../../core-employee-seeker/core-employee-seeker/core-employee-seeker.component';
import { CoreContractSeekerComponent } from '../../core-contract-seeker/core-contract-seeker/core-contract-seeker.component';
import { CoreWorkingSeekerComponent } from '../../core-working-seeker/core-working-seeker/core-working-seeker.component';
import { CoreWageSeekerComponent } from '../../core-wage-seeker/core-wage-seeker/core-wage-seeker.component';
import { CorePositionSeekerComponent } from '../../core-position-seeker/core-position-seeker/core-position-seeker.component';

@Component({
  selector: 'core-form-control-seeker',
  templateUrl: './core-form-control-seeker.component.html',
  styleUrls: ['./core-form-control-seeker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreFormControlSeekerComponent
    },
    CoreEmployeeSeekerComponent,
    CoreContractSeekerComponent,
    CoreWorkingSeekerComponent,
    CoreWageSeekerComponent,
    CorePositionSeekerComponent,
  ]
})

export class CoreFormControlSeekerComponent extends CoreFormControlBaseComponent implements OnInit, AfterViewInit, OnDestroy {


  @ViewChild('avatar') avatar!: TemplateRef<any>;

  ngControl!: NgControl;

  lang!: string;

  @Input() title!: EnumTranslateKey;
  @Input() showPageHeader!: boolean;
  @Input() preDefinedOuterParam$!: BehaviorSubject<any>;
  @Input() getByIdObject$!: BehaviorSubject<any>;
  @Input() paramMode!: boolean;
  @Input() multiMode!: boolean;
  @Input() objectList$!: BehaviorSubject<any[]>;
  @Input() shownSeekerColumns!: string[]; // Reduce visible columns from base component.

  /* START: REQUIRED */
  @Input() seekerSourceType!: EnumCoreFormControlSeekerSourceType;
  @Input() boundFrom!: string; // take this field from GetById response innerBody to bind to the value
  @Input() shownFrom!: string; // take this field from GetById response innerBody to bind to the text
  /* END: REQUIRED when EMPLOYEE_SEEKER */

  @Input() alsoBindTo!: ICoreFormControlSeekerExtraBindingModel[];
  @Output() onDoubleClick = new EventEmitter<any>();

  @ViewChild('container') container!: ElementRef;

  sourceOpen!: boolean;

  valueToShow!: string;
  placeholder!: string;

  subscriptions: Subscription[] = [];

  /* for multiMode */
  pendingSelectedData: any[] = [];
  selectedData: any[] = [];
  multiModeColumns: ICoreTableColumnItem[] = [];
  tools: ICoreTableToolItem[] = [{
    code: ECoreTableToolCode.delete,
    class: ECoreTableToolClass.delete,
    caption: EnumTranslateKey.UI_CORE_CONTROL_TABLE_TOOL_DELETE
  }];

  showClearIcon!: boolean;
  defaultAvatar!: string;
  hideFooter: boolean = false;

  constructor(
    private alertService: AlertService,
    private injector: Injector,
    private mls: MultiLanguageService,
    private coreEmployeeSeekerComponent: CoreEmployeeSeekerComponent,
    private coreContractSeekerComponent: CoreContractSeekerComponent,
    private coreWorkingSeekerComponent: CoreWorkingSeekerComponent,
    private coreWageSeekerComponent: CoreWageSeekerComponent,
    private corePositionSeekerComponent: CorePositionSeekerComponent,
    private ras: RandomAvatarService
  ) {
    super();
    this.defaultAvatar = ras.get()
  }

  private asignMultiModeColumns(): void {
    switch (this.seekerSourceType) {
      case EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK:
        this.multiModeColumns = this.coreEmployeeSeekerComponent.columns;
        if (!!!this.multiMode) {
          this.hideFooter = true;
        }
        break;
      case EnumCoreFormControlSeekerSourceType.CONTRACT_SEEK:
        this.multiModeColumns = this.coreContractSeekerComponent.columns;
        break;
      case EnumCoreFormControlSeekerSourceType.WORKING_SEEK:
        this.multiModeColumns = this.coreWorkingSeekerComponent.columns;
        break;
      case EnumCoreFormControlSeekerSourceType.WAGE_SEEK:
        this.multiModeColumns = this.coreWageSeekerComponent.columns;
        break;
      case EnumCoreFormControlSeekerSourceType.POSITION_SEEK:
        this.multiModeColumns = this.corePositionSeekerComponent.columns;
        if (!!!this.multiMode) {
          this.hideFooter = true;
        }
        break;
      case EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK:
        this.multiModeColumns = [];
        if (!!!this.multiMode) {
          this.hideFooter = true;
        }
        break;
      default:
        break;
    }

  }

  ngOnInit(): void {

    /*
    If we try to inject NgControl directly within the constructor, we will get an error: “Error: NG0200: Circular dependency in DI detected…”.
    Thus, we inject NgControl in the OnInit lifecycle hook via Injector without any error.
    */
    this.ngControl = this.injector.get(NgControl);
    this.asignMultiModeColumns();

  }

  ngAfterViewInit(): void {

    setTimeout(() => {

      this.multiModeColumns.map(c => {
        if (c.field === 'avatar' && !!!c.templateRef) c.templateRef = this.avatar
      })

      const el = this.container?.nativeElement;
      const height = el.getBoundingClientRect().height;
      el.style.setProperty('--height', (height || 50) + 'px');

      this.subscriptions.push(
        this.mls.lang$.subscribe(x => this.lang = x)
      )

      this.subscriptions.push(
        this.ngControl.control?.valueChanges.subscribe(x => {
          if (!!!x) this.valueToShow = ""
        })!
      )

      /* START: CHECK INPUTS */


      if (isDevMode()) {
        if (!!!this.seekerSourceType) {
          this.alertService.error(
            `CoreFormControlSeekerComponent Error: Required inputs:
                seekerSourceType: EnumCoreFormControlSeekerSourceType (for '${this.ngControl.name}')`
          );
        } else {


          if (!!!this.paramMode) {

            //getByIdObject$
            if (!!!this.getByIdObject$) {
              this.alertService.error(
                `CoreFormControlSeekerComponent Error: Required inputs:
                  getByIdObject$: BehaviorSubject&lt;any&gt; (for '${this.ngControl.name}')`
              );
            }
          }

          if (!!!this.boundFrom) {
            this.alertService.error(
              `All _SEEKER controls require input:
                    boundFrom: string; (for '${this.ngControl.name}')`,
              noneAutoClosedAlertOptions
            );
          }
          if (!!!this.shownFrom) {
            this.alertService.error(
              `All _SEEKER controls require input:
                    shownFrom: string; (for '${this.ngControl.name}')`,
              noneAutoClosedAlertOptions
            );
          }

        }
      }


      /* END: CHECK INPUTS */

      this.subscriptions.push(
        this.getByIdObject$?.subscribe(x => {

          if (!!x) {
            if (!!!this.multiMode) {
              this.valueToShow = x[this.shownFrom];
            }
          } else {
            if (!!!this.multiMode) {
              this.valueToShow = "";
            }
          }
        })
      )

      if (!!this.objectList$) {
        this.subscriptions.push(
          this.objectList$.subscribe(x => this.selectedData = x)
        )
      }

    })


  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

  override writeValue(obj: any): void {
    setTimeout(() => this.value = obj);
    if (!!this.multiMode) {
      console.group('Write value for ' + this.ngControl.name);
      console.log("this.multiModeColumns", this.multiModeColumns)
      console.log('To do: Assign api res to the selectedData')
      console.groupEnd();
    }
  }

  onClickSeek(): void {
    if (this.disabled || this.readonly) return;
    this.sourceOpen = true;
  }

  onSelect(): void {
    if (!!this.multiMode) {
      const filter = this.pendingSelectedData.filter(x => this.selectedData.filter(y => y.id === x.Id).length === 0)
      const newSelectedData = [...this.selectedData, ...filter];
      const newSelectedIds: any[] = [];
      newSelectedData.map(x => newSelectedIds.push(x.id))
      this.objectList$.next(newSelectedData);
      //this.selectedData = newSelectedData;
      this.value = newSelectedIds;
      this.markAsTouched();
      this.onChange(newSelectedIds)
      this.pendingSelectedData = [];
      this.sourceOpen = false;
    } else {

    }
  }

  onCancel(): void {
    this.sourceOpen = false;
  }

  onRowDoubleClick(e: any) {
    this.writeValue(e[this.boundFrom]);
    this.onChange(e[this.boundFrom]);
    this.valueToShow = e[this.shownFrom];
    this.sourceOpen = false;

    if (!!this.alsoBindTo) {
      const form = this.ngControl.control?.parent;
      if (form) {
        this.alsoBindTo.map((x, index) => {

          /*
          start: Validate Developer input
          */
          if (isDevMode() && index === 0) {
            if (!!!x.takeFrom) {
              this.alertService.error("takeFrom was undefined", noneAutoClosedAlertOptions)
            } else {
              if (!!!e[x.takeFrom]) {
                this.alertService.error(`You expect a value from '${x.takeFrom}', but the seeker grid does not have this column`, noneAutoClosedAlertOptions)
              }
            }
            if (!!!x.bindTo) {
              this.alertService.error("bindTo was undefined", noneAutoClosedAlertOptions)
            } else {
              if (!!!form.get(x.bindTo)) {
                this.alertService.error(`You expect to bind value to '${x.bindTo}', but the form group does not have this control`, noneAutoClosedAlertOptions)
              }
            }

          }
          /*
          end: Validate Developer input
          */

          form.get(x.bindTo)?.setValue(e[x.takeFrom]);
          form.get(x.bindTo)?.markAsTouched;
          form.get(x.bindTo)?.markAsDirty();
        })
      }
    }
  }

  onItemDoubleClick(e: IOrgTreeItem) {
    this.writeValue(e.id);
    this.valueToShow = e.tree$Title;
    this.onChange(e.id);
    this.markAsTouched();
    this.sourceOpen = false;
    this.onDoubleClick.emit(e);
  }

  onColumnsInit(e: any): void {
    this.multiModeColumns = e;
  }

  onSelectedDataChange(e: any) {
    this.multiModeColumns = e.columns;
    this.pendingSelectedData = e.data;
  }

  onToolClick(e: ICoreTableToolClickEventEmitterData) {
    if (e.code === ECoreTableToolCode.delete) {
      const newObjectList = this.objectList$.value.filter(x => x.id !== e.id)
      const newIds = this.value.filter((x: any) => x !== e.id)

      this.value = newIds;
      this.objectList$.next(newObjectList);

      this.onChange(newIds);
      this.markAsTouched();
    }
  }

  onClickClear() {

    this.writeValue(null);
    this.onChange(null);
    this.valueToShow = "";

  }

}