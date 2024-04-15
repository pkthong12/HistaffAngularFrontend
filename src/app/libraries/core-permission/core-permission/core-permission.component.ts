import { AfterViewInit, Component, ElementRef, Input, TemplateRef, ViewChild, isDevMode } from "@angular/core";
import { BehaviorSubject, Observable, distinctUntilChanged, filter, map, switchMap, zip } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";

import { BaseComponent } from "src/app/libraries/base-component/base/base.component";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { EnumFilterOperator, IFilterOperator } from "src/app/interfaces/IQueryListRequest";
import { ICorePageListApiDefinition, ICorePageListEditRouting } from "src/app/libraries/core-page-list/core-page-list.component";
import { api } from "src/app/constants/api/apiDefinitions";
import { ICoreTableColumnItem } from "src/app/libraries/core-table/core-table.component";
import { EnumCoreTablePipeType } from "src/app/libraries/core-table/EnumCoreTablePipeType";

import { MultiLanguageService } from "src/app/services/multi-language.service";
import { RandomAvatarService } from "src/app/services/random-avatar.service";
import { CorePermissionService } from "src/app/libraries/core-permission/core-permission.service";
import { AppService } from "src/app/services/app.service";
import { AlertService } from "src/app/libraries/alert/alert.service";
import { AuthService } from "src/app/services/auth.service";
import { DomService } from "../../services/dom.service";
import { LayoutService } from "src/app/services/layout.service";

import { ICoreListOption } from "src/app/libraries/core-list/core-list/core-list.component";
import { IFormatedResponse } from "src/app/interfaces/IFormatedResponse";
import { ICoreButtonVNS } from "src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS";
import { EnumCoreOrgTreeaAccessorMode } from "src/app/libraries/core-org-tree/core-org-tree/core-org-tree.component";
import { EnumCoreButtonVNSCode } from "src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode";
import { alertOptions, noneAutoClosedAlertOptions } from "src/app/constants/alertOptions";
import { ICoreFunctionAction } from "src/app/libraries/core-permission-actions/core-permission-actions/core-permission-actions.component";
import { DialogService } from "src/app/services/dialog.service";

export interface IUserPermissionModel {
  userId: string;
  functionId: number;
  actionId: number;
}

export interface IUserOrgPermissionModel {
  userId: string;
  orgId: number;
}

export interface IGroupPermissionModel {
  groupId: number;
  functionId: number;
  actionId: number;
}

export interface IGroupOrgPermissionModel {
  groupId: number;
  orgId: number;
}

export enum EnumPermissionObjectType {
  USER = 'USER',
  USER_GROUP = 'USER_GROUP'
}

@Component({
  selector: 'core-permission',
  templateUrl: './core-permission.component.html',
  styleUrls: ['./core-permission.component.scss']
})
export class CorePermissionComponent extends BaseComponent implements AfterViewInit {

  @Input() type!: EnumPermissionObjectType;
  

  @ViewChild('avatar') avatar!: TemplateRef<any>;
  @ViewChild('actions') actions!: TemplateRef<any>;
  @ViewChild('container') container!: ElementRef;

  height!: number;
  title!: EnumTranslateKey
  loading: boolean = true;
  pipe!: EnumCoreTablePipeType;

  isRootUser!: boolean | undefined;
  compositionHeight!: number;
  selectedData: any[] = [];
  orgIds!: number[];

  constructor(
    public override mls: MultiLanguageService,
    public dialogService: DialogService,
    private ras: RandomAvatarService,
    private corePermissionService: CorePermissionService,
    private appService: AppService,
    public layoutService: LayoutService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private domService: DomService,
  ) {
    super(mls);

    this.defaultAvatar = ras.get();
    this.corePermissionService.instanceNumber = new Date().getTime();

    if (this.router.url.includes('upermission')) this.type = EnumPermissionObjectType.USER
    if (this.router.url.includes('grouppermission')) this.type = EnumPermissionObjectType.USER_GROUP

    this.subscriptions.push(
      this.route.paramMap.subscribe(x => {
        const id = x.get('id');
        if (!!id) {
          if (this.type === EnumPermissionObjectType.USER) {
            this.objectId$.next(id)
          } else if (this.type = EnumPermissionObjectType.USER_GROUP) {
            this.objectId$.next(Number(id))
          }
        }
      })
    )

    this.subscriptions.push(
      this.authService.data$.subscribe(x => this.isRootUser = x?.isRoot)
    )
  }

  tabHeaders: string[] = [
    EnumTranslateKey.UI_USER_GROUP_PERMISSION_FUNCTION_TAB, // make use of an existing key
    EnumTranslateKey.UI_USER_GROUP_PERMISSION_ORG_UNIT_TAB, // make use of an existing key
  ]

  objectId!: string | number;
  objectId$ = new BehaviorSubject<string | number | null>(null);
  objectQueryListApi!: api;
  objectListTextField!: string;
  pendingAction!: any;
  pendingObjectId!: string | number | null;

  showStateTracker!: boolean;

  userListTextPipe: EnumCoreTablePipeType = EnumCoreTablePipeType.UPPERCASE;

  treeAccessorMode: EnumCoreOrgTreeaAccessorMode = EnumCoreOrgTreeaAccessorMode.CHECKED;

  userOptions: ICoreListOption[] = []

  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'userId',
      operator: EnumFilterOperator.EQUAL
    }
  ]

  leftApiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_USER_QUERY_LIST,
  }

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_USER_PERMISSION_QUERY_LIST,
  }

  allowEdit!: boolean;

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
      field: 'moduleNameCode',
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
    /*
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_GROUP_NAMECODE,
      field: 'groupNameCode',
      type: 'string',
      align: 'left',
      width: 150,
    },
    */
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_NAMECODE,
      field: 'functionNameCode',
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
  ]

  defaultAvatar!: string;
  treeHeight!: number;
  corePermissionActionsHeight!: number;
  dialogInstanceNumber!: number;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }

  actionPermissionValue: ICoreFunctionAction[] = []
  orgPermissionValue: number[] = []

  initialActionPermissionValueJsonString!: string
  currentActionPermissionValueJsonString!: string
  initialOrgPermissionValueJsonString!: string
  currentOrgPermissionValueJsonString!: string


  queryFunctionActionPermissionListApiEndpoint!: string;
  queryOrgPermissionListApiEndpoint!: string;

  updateInitialActionPermissionValueJsonString(functionActions: ICoreFunctionAction[]): void {
    this.initialActionPermissionValueJsonString = JSON.stringify({ objectId: this.objectId, actions: functionActions });
  }

  updateInitialOrgPermissionValueJsonString(orgIds: number[]): void {
    this.orgPermissionValue = orgIds;
    this.initialOrgPermissionValueJsonString = JSON.stringify({ objectId: this.objectId, orgIds: orgIds });
  }

  ngAfterViewInit(): void {

    setTimeout(() => {

      this.loading = false;
      this.columns.filter(c => c.field === 'appActions')[0].templateRef = this.actions;

      this.subscriptions.push(
        this.layoutService.contentContainerHeight$.subscribe(x => {
          this.compositionHeight = x - this.layoutService.corePageHeaderHeight - this.layoutService.basicSpacing
          this.corePermissionActionsHeight = this.compositionHeight - this.layoutService.coreTabsHeaderLineHeight - this.layoutService.basicSpacing
          this.treeHeight = x - this.layoutService.corePageHeaderHeight - this.layoutService.basicSpacing * 2 - this.layoutService.coreTabsHeaderLineHeight
        })
      )

      if (this.type === EnumPermissionObjectType.USER) {
        this.title = EnumTranslateKey.UI_COMPONENT_TITLE_USER_PERMISSION
        this.pipe = EnumCoreTablePipeType.LOWERCASE
        this.objectQueryListApi = api.SYS_USER_QUERY_LIST
        this.queryFunctionActionPermissionListApiEndpoint = api.SYS_USER_QUERY_FUNCTION_ACTION_PERMISSION_LIST
        this.queryOrgPermissionListApiEndpoint = api.SYS_USER_QUERY_USER_ORG_PERMISSION_LIST
        this.objectListTextField = "username"
      } else if (this.type === EnumPermissionObjectType.USER_GROUP) {
        this.title = EnumTranslateKey.UI_COMPONENT_TITLE_USER_GROUP_PERMISSION
        this.pipe = EnumCoreTablePipeType.UPPERCASE
        this.objectQueryListApi = api.SYS_GROUP_QUERY_LIST
        this.queryFunctionActionPermissionListApiEndpoint = api.SYS_GROUP_QUERY_FUNCTION_ACTION_PERMISSION_LIST
        this.queryOrgPermissionListApiEndpoint = api.SYS_GROUP_QUERY_GROUP_ORG_PERMISSION_LIST
        this.objectListTextField = "name"
      } else {
        if (isDevMode()) {
          this.alertService.error(this.mls.trans('UI_PERMISSION_OBJECT_IS_UNDEFINED', this.lang), noneAutoClosedAlertOptions)
        }
      }

      this.subscriptions.push(
        this.dialogService.dialogConfirmed$.pipe(
          filter(x => {
            return !!x && !!x.confirmed && !!x?.instanceNumber
          })
        ).subscribe(x => {
          console.log("this.dialogService.dialogConfirmed$", x)
          if (!!!x?.confirmed) {
            this.objectId = this.objectId$.value!;
          }
          this.dialogService.resetService()

        })
      )


      this.subscriptions.push(
        this.corePermissionService.selectedObjectActionPermissions$.subscribe(x => {
          this.actionPermissionValue = x;
        })
      )

      this.subscriptions.push(
        this.corePermissionService.selectedObjectOrgPermissions$.subscribe(x => {
          this.orgIds = x;
          this.orgPermissionValue = x;
        })
      )

      this.subscriptions.push(
        this.objectId$.pipe(
          filter(x => !!x && x !== 0 && x !== '0'),
          distinctUntilChanged(),
          map(x => {
            this.corePermissionService.selectedObjectActionPermissions$.next([]);
            this.orgIds = [];
            return x;
          }),
          switchMap(objectId => {
            this.loading = true;
            if (!!!this.objectId) this.objectId = objectId!;
            return zip([
              this.appService.get(this.queryFunctionActionPermissionListApiEndpoint + '?objectId=' + objectId + "&useGroupIfEmpty=false"),
              this.appService.get(this.queryOrgPermissionListApiEndpoint + '?objectId=' + objectId + "&useGroupIfEmpty=false")])
          })
        ).subscribe(x => {
          this.loading = false;
          if (x[0].ok && x[0].status === 200) {
            const body: IFormatedResponse = x[0].body;
            //this.responseService.resolve(body);
            if (body.statusCode === 200) {
              this.corePermissionService.selectedObjectActionPermissions$.next(body.innerBody);
              this.updateInitialActionPermissionValueJsonString(body.innerBody);
            }
          }
          if (x[1].ok && x[1].status === 200) {
            const body1: IFormatedResponse = x[1].body;
            //this.responseService.resolve(body1);
            if (body1.statusCode === 200) {
              this.orgIds = body1.innerBody;
              this.updateInitialOrgPermissionValueJsonString(body1.innerBody);
            }
          }
        })
      )

      this.container?.nativeElement.style.setProperty('--z-index', this.domService.getMaxZIndex())

    })

  }

  /* We do not update the grid when userId changes */
  onObjectIdChange(objectId: string | number) {
    this.corePermissionService.objectId = objectId;
    this.router.navigate([objectId.toString()], { relativeTo: this.route.parent })
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        if (!!this.objectId) {
          this.allowEdit = true;
        } else {
          this.alertService.info(this.mls.trans('UI_USER_PERMISSION_NO_USER_SELECTED', this.lang), alertOptions);
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_UPERMISSION_DELETE:

        if (!this.objectId) {
          this.alertService.warn(this.mls.trans(EnumTranslateKey.UI_USER_PERMISSION_TO_EDIT_PLEASE_SELECT_A_USER), alertOptions)
        }
        else {
            this.dialogService.title$.next(EnumTranslateKey.UI_CORE_DIALOG_SERVICE_CONFIRMATION)
            this.dialogService.okButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CONFIRM)
            this.dialogService.cancelButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CANCEL)
            this.dialogService.showCancelOnly$.next(false);
            this.dialogService.busy = true;
            this.dialogService.body$.next(EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_ARE_YOU_DELETING_UPERMISSION_OF_USER);
            let listDeleteIds: any[] = [];
            this.selectedData.forEach(x => {
              listDeleteIds.push(x[this.columns[1].field])
            });
            this.dialogService.informationLines$.next(listDeleteIds)
            this.dialogService.showConfirmDialog$.next(true);
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_SAVE:
        if (this.type === EnumPermissionObjectType.USER) {
          const actionRange: IUserPermissionModel[] = [];
          this.actionPermissionValue.map(f => {
            f.allowedActionIds.map(id => {
              actionRange.push({
                userId: this.objectId.toString(),
                functionId: f.functionId,
                actionId: id
              })
            })
          })
          const orgRange: IUserOrgPermissionModel[] = [];
          this.orgIds.map(o => {
            orgRange.push({
              userId: this.objectId.toString(),
              orgId: o
            })
          })
          const actionPayload = { userId: this.objectId, range: actionRange }
          const orgPayload = { userId: this.objectId, range: orgRange }
          this.loading = true;
          this.subscriptions.push(

            zip([
              this.appService.post(api.SYS_USER_FUNCTION_ACTION_PERMISSION_UPDATE_RANGE, actionPayload),
              this.appService.post(api.SYS_USER_ORG_PERMISSION_UPDATE_RANGE, orgPayload)
            ]).subscribe(x => {
              this.allowEdit = false;
              this.loading = false;
              if (x[0].ok && x[0].status === 200) {
                const body: IFormatedResponse = x[0].body;
                //this.responseService.resolve(body);
                if (body.statusCode === 200) {
                }
              } else {
                if (isDevMode()) {
                  //this.alertService.error(JSON.stringify(x[0], null, 2), alertOptions);
                }
              }
              if (x[1].ok && x[1].status === 200) {
                const body1: IFormatedResponse = x[1].body;
                //this.responseService.resolve(body1);
                if (body1.statusCode === 200) {
                }
              } else {
                if (isDevMode()) {
                  //this.alertService.error(JSON.stringify(x[0], null, 2), alertOptions);
                }
              }
            })
          )
        } else if (this.type === EnumPermissionObjectType.USER_GROUP) {
          const actionRange: IGroupPermissionModel[] = [];
          this.actionPermissionValue.map(f => {
            f.allowedActionIds.map(id => {
              actionRange.push({
                groupId: Number(this.objectId),
                functionId: f.functionId,
                actionId: id
              })
            })
          })
          const orgRange: IGroupOrgPermissionModel[] = [];
          this.orgIds.map(o => {
            orgRange.push({
              groupId: Number(this.objectId),
              orgId: o
            })
          })
          const actionPayload = { groupId: this.objectId, range: actionRange }
          const orgPayload = { groupId: this.objectId, range: orgRange }
          this.loading = true;
          this.subscriptions.push(

            zip([
              this.appService.post(api.SYS_GROUP_FUNCTION_ACTION_PERMISSION_UPDATE_RANGE, actionPayload),
              this.appService.post(api.SYS_GROUP_ORG_PERMISSION_UPDATE_RANGE, orgPayload)
            ]).subscribe(x => {
              this.allowEdit = false;
              this.loading = false;
              if (x[0].ok && x[0].status === 200) {
                const body: IFormatedResponse = x[0].body;
                //this.responseService.resolve(body);
                if (body.statusCode === 200) {
                }
              } else {
                if (isDevMode()) {
                  //this.alertService.error(JSON.stringify(x[0], null, 2), alertOptions);
                }
              }
              if (x[1].ok && x[1].status === 200) {
                const body1: IFormatedResponse = x[1].body;
                //this.responseService.resolve(body1);
                if (body1.statusCode === 200) {
                }
              } else {
                if (isDevMode()) {
                  //this.alertService.error(JSON.stringify(x[0], null, 2), alertOptions);
                }
              }
            })
          )
        }

        break;
      default:
        break;
    }
  }

  onActionPermissionValueChange(e: ICoreFunctionAction[]): void {
    console.log("onActionPermissionValueChange", e);
    
  }

  onOrgTreeItemCheck(e: any) {
    if (!!!this.allowEdit) {
      this.alertService.info(this.mls.trans('UI_USER_PERMISSION_TO_EDIT_PLEASE_SELECT_A_USER_AND_CLICK_THE_PENCIL', this.lang), alertOptions);
    }
  }

  onClickCloseState(): void {
    this.showStateTracker = false;
  }

  canDeactivate(): Observable<boolean> | boolean {
    this.currentActionPermissionValueJsonString = JSON.stringify(this.actionPermissionValue);
    const condition1 = this.currentActionPermissionValueJsonString === this.initialActionPermissionValueJsonString;
    this.currentOrgPermissionValueJsonString = JSON.stringify(this.orgPermissionValue);
    const condition2 = this.currentOrgPermissionValueJsonString === this.initialOrgPermissionValueJsonString;
    const condition = condition1 && condition2;

    return true; // TO DO

    if (condition) {
      return true;
    } else {

      this.pendingAction = 'CHANGES_WILL_BE_LOST';
      this.dialogInstanceNumber = new Date().getTime();
      this.showStateTracker = true;

      this.dialogService.busy = true;
      this.dialogService.dialogConfirmed$.next({
        confirmed: false,
        instanceNumber: this.dialogInstanceNumber
      })
      this.dialogService.showConfirmDialog$.next(true);
      this.dialogService.title$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_TITLE);
      this.dialogService.body$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BODY_CHANGES_WILL_BE_LOST);
      this.dialogService.okButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CONFIRM);
      this.dialogService.cancelButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_GO_BACK_TO_EDIT_FORM);
      const observable = this.dialogService.canDeactivate$.asObservable();
      return observable;
    }
  }

  override ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
    this.corePermissionService.instanceNumber = null;
    this.corePermissionService.selectedObject$.next(null);
    this.corePermissionService.selectedObjectActionPermissions$.next([]);
  }

}
