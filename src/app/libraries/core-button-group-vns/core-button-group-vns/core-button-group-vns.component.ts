import { Component, EventEmitter, Input, OnInit, AfterViewInit, Output, SimpleChanges, OnDestroy, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { EnumIconClass } from 'src/app/enum/EnumIconClass';
import { ICoreButtonVNS } from './ICoreButtonVNS';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { EnumCoreButtonVNSCode } from './EnumCoreButtonVNSCode';
import { EnumStyleButtonClass } from 'src/app/enum/EnumStyleButtonClass';
import { AuthService } from 'src/app/services/auth.service';
import { BaseComponent } from '../../base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { IFunctionWithFullActions, RoutingService } from 'src/app/services/routing.service';
import { AlertService } from '../../alert/alert.service';
import { alertOptions, noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { CoreButtonGroupService } from '../core-button-group-service';
import { BehaviorSubject } from 'rxjs';

export const CORE_VNS_BUTTONS: ICoreButtonVNS[] = [

  /**********************
  HEADER_GROUP
  ***********************/
  {
    code: EnumCoreButtonVNSCode.HEADER_VIEW_ABSTRACT,
    iconClass: EnumIconClass.FEATHER_VIEW,
    styleClass: EnumStyleButtonClass.EDIT,
    caption: EnumTranslateKey.UI_BUTTON_HEADER_VIEW_ABSTRACT,
    isHeader: true,
    hidden: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_EDIT,
    iconClass: EnumIconClass.FEATHER_EDIT,
    styleClass: EnumStyleButtonClass.EDIT,
    caption: EnumTranslateKey.UI_BUTTON_EDIT,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_SAVE,
    iconClass: EnumIconClass.FEATHER_SAVE,
    styleClass: EnumStyleButtonClass.HEADER_SAVE,
    caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON_SAVE,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_CANCEL,
    iconClass: EnumIconClass.FEATHER_CANCEL,
    styleClass: EnumStyleButtonClass.HEADER_SAVE,
    caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON_CANCEL,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_COPY,
    iconClass: EnumIconClass.FEATHER_COPY,
    styleClass: EnumStyleButtonClass.HEADER_SAVE,
    caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON_COPY,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_ACTIVATE,
    iconClass: EnumIconClass.CUSTOM_CHECK,
    styleClass: EnumStyleButtonClass.ACTIVATE,
    caption: EnumTranslateKey.UI_BUTTON_ACTIVATE,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_INACTIVATE,
    iconClass: EnumIconClass.CUSTOM_UNCHECK,
    styleClass: EnumStyleButtonClass.INACTIVATE,
    caption: EnumTranslateKey.UI_BUTTON_INACTIVATE,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_DELETE,
    iconClass: EnumIconClass.FEATHER_DELETE,
    styleClass: EnumStyleButtonClass.DELETE,
    caption: EnumTranslateKey.UI_BUTTON_DELETE,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_PRINT,
    iconClass: EnumIconClass.FEATHER_PRINT,
    styleClass: EnumStyleButtonClass.PRINT,
    caption: EnumTranslateKey.UI_BUTTON_PRINT,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_PRINT_2C_98,
    iconClass: EnumIconClass.FEATHER_PRINT_2C,
    styleClass: EnumStyleButtonClass.PRINT_2C,
    caption: EnumTranslateKey.UI_BUTTON_PRINT_2C_98,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_PRINT_2C,
    iconClass: EnumIconClass.FEATHER_PRINT_2C,
    styleClass: EnumStyleButtonClass.PRINT_2C,
    caption: EnumTranslateKey.UI_BUTTON_PRINT_2C,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_PRINT_2C_2008,
    iconClass: EnumIconClass.FEATHER_PRINT,
    styleClass: EnumStyleButtonClass.PRINT,
    caption: EnumTranslateKey.UI_BUTTON_PRINT_2C_2008,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_DOWNLOAD,
    iconClass: EnumIconClass.FEATHER_DOWNLOAD,
    styleClass: EnumStyleButtonClass.DOWNLOAD,
    caption: EnumTranslateKey.UI_BUTTON_EXPORT_EXCEL_TEMPLATE,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_UPLOAD,
    iconClass: EnumIconClass.FEATHER_UPLOAD,
    styleClass: EnumStyleButtonClass.UPLOAD,
    caption: EnumTranslateKey.UI_BUTTON_IMPORT_EXCEL_TEMPLATE,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_EXPORTEXEL,
    iconClass: EnumIconClass.CUSTOM_DOWNLOAD_EXEL,
    styleClass: EnumStyleButtonClass.DOWNLOAD,
    caption: EnumTranslateKey.UI_BUTTON_EXPORT_TO_EXCEL,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_DROP,
    iconClass: EnumIconClass.FEATHER_DROP,
    styleClass: EnumStyleButtonClass.ADD,
    caption: '',
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_DECLAREINSARISING,
    iconClass: EnumIconClass.FEATHER_FILE,
    styleClass: EnumStyleButtonClass.DECLAREINSARISING,
    caption: EnumTranslateKey.UI_BUTTON_DECLARE_INS_ARISING,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_GETSHIFTDEFAULT,
    styleClass: EnumStyleButtonClass.GETSHIFTDEFAULT,
    caption: EnumTranslateKey.UI_GRID_FORM_BUTTON_GET_SHIFT_DEFAULT,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_LOCK,
    styleClass: EnumStyleButtonClass.LOCK,
    caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON_LOCK,
    iconClass: EnumIconClass.FEATHER_LOCK,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_UNLOCK,
    styleClass: EnumStyleButtonClass.UNLOCK,
    caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON__UNLOCK,
    iconClass: EnumIconClass.FEATHER_UNLOCK,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_CONFIRM,
    styleClass: EnumStyleButtonClass.CONFIRM,
    caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON_CONFIRM,
    iconClass: EnumIconClass.FEATHER_CONFIRM,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_UNCONFIRM,
    styleClass: EnumStyleButtonClass.UNCONFIRM,
    caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON_UNCONFIRM,
    iconClass: EnumIconClass.FEATHER_UNCONFIRM,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_SWAP,
    styleClass: EnumStyleButtonClass.EDIT,
    iconClass: EnumIconClass.FEATHER_SWAP,
    caption: EnumTranslateKey.UI_BUTTON_SWAP,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_APPROVE,
    styleClass: EnumStyleButtonClass.APPROVING,
    iconClass: EnumIconClass.FEATHER_APPROVE,
    caption: EnumTranslateKey.UI_BUTTON_APPROVE,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_UNAPPROVE,
    styleClass: EnumStyleButtonClass.UNAPPROVE,
    iconClass: EnumIconClass.FEATHER_UNAPPROVE,
    caption: EnumTranslateKey.UI_BUTTON_UNAPPROVE,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_CALCULATE,
    styleClass: EnumStyleButtonClass.CALCULATE,
    iconClass: EnumIconClass.FEATHER_CALCULATE,
    caption: EnumTranslateKey.UI_BUTTON_CALCULATE,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_UPDATE,
    styleClass: EnumStyleButtonClass.UPDATE,
    iconClass: EnumIconClass.FEATHER_UPDATE,
    caption: EnumTranslateKey.UI_BUTTON_UPDATE,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_PENDING_APPROVE,
    styleClass: EnumStyleButtonClass.PENDING_APPROVE,
    iconClass: EnumIconClass.FEATHER_PENDING_APPROVE,
    caption: EnumTranslateKey.UI_BUTTON_PENDING_APPROVE,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_HANDLE,
    styleClass: EnumStyleButtonClass.HEADER_HANDLE,
    iconClass: EnumIconClass.CUSTOM_HEADER_HANDLE,
    caption: EnumTranslateKey.UI_BUTTON_HEADER_HANDLE,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_RESET,
    styleClass: EnumStyleButtonClass.HEADER_RESET,
    iconClass: EnumIconClass.CUSTOM_HEADER_RESET,
    caption: EnumTranslateKey.UI_BUTTON_HEADER_RESET,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_SYNCHRONOUS,
    styleClass: EnumStyleButtonClass.HEADER_SYNCHRONOUS,
    iconClass: EnumIconClass.CUSTOM_HEADER_SYNCHRONOUS,
    caption: EnumTranslateKey.UI_BUTTON_HEADER_SYNCHRONOUS,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_UPERMISSION_DELETE,
    styleClass: EnumStyleButtonClass.HEADER_UPERMISSION_DELETE,
    iconClass: EnumIconClass.CUSTOM_HEADER_UPERMISSION_DELETE,
    caption: EnumTranslateKey.UI_BUTTON_HEADER_PERMISSION_DELETE,
    isHeader: true
  },
  {
    code: EnumCoreButtonVNSCode.HEADER_LIQUIDATE_CONTRACT,
    styleClass: EnumStyleButtonClass.LIQUIDATE,
    iconClass: EnumIconClass.FEATHER_LIQUIDATE,
    caption: EnumTranslateKey.UI_BUTTON_LIQUIDATE_CONTRACT,
    isHeader: true
  },
  // CREATE luôn luôn đứng sau cùng
  { // <== the last is HEADER_CREATE
    code: EnumCoreButtonVNSCode.HEADER_CREATE,
    iconClass: EnumIconClass.FEATHER_ADD,
    styleClass: EnumStyleButtonClass.ADD,
    caption: EnumTranslateKey.UI_BUTTON_CREATE,
    isHeader: true
  },

  /**********************
  NONE_HEADER_GROUP
  ***********************/
  {
    code: EnumCoreButtonVNSCode.NONE_HEADER_CANCEL,
    styleClass: EnumStyleButtonClass.NONE_HEADER_CANCEL,
    caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON_CANCEL,
    isHeader: false
  },
  {
    code: EnumCoreButtonVNSCode.NONE_HEADER_SAVE,
    styleClass: EnumStyleButtonClass.SAVE,
    caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON_SAVE,
    isHeader: false
  },
  {
    code: EnumCoreButtonVNSCode.NONE_HEADER_HANDLE,
    styleClass: EnumStyleButtonClass.HANDLE,
    caption: EnumTranslateKey.UI_BUTTON_HANDLE,
    isHeader: false
  },
  {
    code: EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
    styleClass: EnumStyleButtonClass.SEARCH,
    caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON_SEARCH,
    isHeader: false
  },
  {
    code: EnumCoreButtonVNSCode.NONE_HEADER_DELETE,
    styleClass: EnumStyleButtonClass.SAVE,
    caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON_DELETE,
    isHeader: false
  },
  {
    code: EnumCoreButtonVNSCode.NONE_HEADER_CONFIRM,
    styleClass: EnumStyleButtonClass.SAVE,
    caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON_NONE_HEADER_CONFIRM,
    isHeader: false
  },
  {
    code: EnumCoreButtonVNSCode.NONE_HEADER_IMPORT_OPTION,
    styleClass: EnumStyleButtonClass.SAVE,
    caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON_NONE_HEADER_IMPROT_OPTION,
    isHeader: false
  },
  {
    code: EnumCoreButtonVNSCode.NONE_HEADER_UPDATE,
    styleClass: EnumStyleButtonClass.SAVE,
    caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON_NONE_HEADER_UPDATE,
    isHeader: false
  },
  {
    code: EnumCoreButtonVNSCode.NONE_HEADER_LIQUIDATE_CONTRACT,
    styleClass: EnumStyleButtonClass.SAVE,
    caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON_NONE_HEADER_LIQUIDATE_CONTRACT,
    isHeader: false
  },

];
@Component({
  selector: 'core-button-group-vns',
  templateUrl: './core-button-group-vns.component.html',
  styleUrls: ['./core-button-group-vns.component.scss']
})
export class CoreButtonGroupVnsComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() instanceNumber!: number;
  @Input() forHeader!: boolean;
  @Input() shownItems!: EnumCoreButtonVNSCode[];
  @Input() showCaption!: boolean;
  @Output() buttonClick = new EventEmitter<ICoreButtonVNS>();
  buttons: ICoreButtonVNS[] = [];

  isRootUser!: boolean | undefined;
  isAdminUser!: boolean | undefined;
  function!: IFunctionWithFullActions | undefined;
  currentFunctionAssigmentDone!: boolean;
  

  /* Bộ ba các nút dưới đây cần ẩn/hiện theo tình huống */
  headerEdit!: ICoreButtonVNS[];
  headerSave!: ICoreButtonVNS[];
  headerCancel!: ICoreButtonVNS[];
  /*** */

  constructor(
    public override mls: MultiLanguageService,
    private router: Router,
    private authService: AuthService,
    private routingService: RoutingService,
    private alertService: AlertService,
    private coreButtonGroupService: CoreButtonGroupService
  ) {
    super(mls);
  }

  override ngOnInit(): void {

    this.coreButtonGroupService.instances.push({
      instanceNumber: this.instanceNumber,
      mustBeHidden$: new BehaviorSubject<EnumCoreButtonVNSCode[]>([])
    })

    this.subscriptions.push(
      this.authService.data$.subscribe(x => {
        this.isRootUser = x?.isRoot;
        this.isAdminUser = x?.isAdmin;
      })
    )

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
  }

  ngOnChanges(e: SimpleChanges): void {
    if (!!e['shownItems']?.currentValue) {
      this.buttons = CORE_VNS_BUTTONS.filter(x => this.shownItems.includes(x.code))
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.routingService.currentFunction$.subscribe(x => {
          this.function = x;
          this.currentFunctionAssigmentDone = true;
          if (!!this.forHeader) {
            if (!!this.isRootUser || !!this.isAdminUser) {
              this.buttons = CORE_VNS_BUTTONS.filter(x => !!!x.hidden).filter(button => {
                if (!!this.function) {
                  return this.function!.actionCodes!.indexOf(button.code) >= 0 && button.isHeader
                } else {
                  return false;
                }
              })
            } else {
              const functionFilter = this.authService.data$.value!.permissionActions.filter(pa => {
                return pa.functionId === this.function?.id
              });
              if (functionFilter.length) {
                const { allowedActionCodes } = functionFilter[0];
                this.buttons = CORE_VNS_BUTTONS.filter(x => !!!x.hidden).filter(button => {
                  return allowedActionCodes!.indexOf(button.code) >= 0 && button.isHeader
                })
              } else {
                this.buttons = [];
              }
            }
          } else {
            // To be improved
            if (!!!this.shownItems) {
              this.buttons = CORE_VNS_BUTTONS.filter(x => !!!x.isHeader)
            } else {
              this.buttons = CORE_VNS_BUTTONS.filter(x => this.shownItems.includes(x.code))
            }
          }
        })
      )

      /*
      const filter = this.coreButtonGroupService.instances.filter(x => x.instanceNumber === this.instanceNumber);
      if (!!filter.length) {
        this.subscriptions.push(
          filter[0].mustBeHidden$.subscribe(mbh => {
            this.buttons.map(b => {
              if (mbh.includes(b.code)) {
                b.hidden = true;
              } else {
                b.hidden = false;
              }
            })
          })
        )
      } else {
        if (isDevMode()) {
          this.alertService.warn("Không tìm thấy instance number của nhóm nút", noneAutoClosedAlertOptions);
        }
      }
      */

    })
  }

  swapTrioEditSaveCancel(editActive: boolean): void {
    this.headerEdit = this.buttons.filter(x => x.code === EnumCoreButtonVNSCode.HEADER_EDIT);
    this.headerSave = this.buttons.filter(x => x.code === EnumCoreButtonVNSCode.HEADER_SAVE);
    this.headerCancel = this.buttons.filter(x => x.code === EnumCoreButtonVNSCode.HEADER_CANCEL);
    if (editActive) {
        this.headerEdit[0].hidden = true;
        this.headerSave[0].hidden = false;
        this.headerCancel[0].hidden = false;
    } else {
        this.headerEdit[0].hidden = false;
        this.headerSave[0].hidden = true;
        this.headerCancel[0].hidden = true;
    }
  }

  onButtonClick(e: ICoreButtonVNS): void {
    console.log("button-group onButtonClick", e)
    this.buttonClick.emit(e);
  }

  onMapperClick(): void {
    if (!!this.function) {
      this.router.navigate(
        [
          '/root',
          'action-mapper',
        ]
      );
    } else {
      this.alertService.info(this.mls.trans(EnumTranslateKey.ROOT_MAPPER_UPDATE_FUNCTION_ID_FOR_THE_MENU_ITEM), alertOptions)
    }
  }

  override ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
    const newInstances = this.coreButtonGroupService.instances.filter(x => x.instanceNumber !== this.instanceNumber);
    this.coreButtonGroupService.instances = newInstances;
  }

}
