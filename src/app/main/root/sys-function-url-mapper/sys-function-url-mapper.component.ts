import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, distinctUntilChanged, filter, map, switchMap, zip } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { ICoreDropdownOption } from 'src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component';
import { EnumFormBaseContolType, ICoreFormSection, IValidator } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { ICorePageEditCRUD } from 'src/app/libraries/core-page-edit/core-page-edit.component';
import { DialogService } from 'src/app/services/dialog.service';
import { FunctionEditService } from '../../cms/system/function/edit/function-edit.services';
import { RoutingService } from 'src/app/services/routing.service';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { CoreFormService } from 'src/app/libraries/core-form/core-form.service';
import { ICorePageListApiDefinition } from 'src/app/libraries/core-page-list/core-page-list.component';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { ICoreRadioOption } from 'src/app/libraries/core-radio-group/core-radio-group/core-radio-group.component';
import { AppService } from 'src/app/services/app.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { Location } from '@angular/common';
import { NavigatorService } from 'src/app/libraries/navigator/navigator/navigator.service';
import { INavigatorItem } from 'src/app/libraries/navigator/navigator/INavigatorItem';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { StringService } from 'src/app/libraries/services/string.service';

@Component({
  selector: 'app-sys-function-url-mapper',
  templateUrl: './sys-function-url-mapper.component.html',
  styleUrls: ['./sys-function-url-mapper.component.scss']
})
export class SysFunctionUrlMapperComponent extends BaseEditComponent implements AfterViewInit, OnDestroy {

  pendingUrl!: string;
  lastClickedMenuItem!: INavigatorItem;
  lastClickedMenuItemString!: string;

  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = "SYS_FUNCTION";
  subscriptions: Subscription[] = [];
  groupOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  moduleOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;

  checkError$ = new BehaviorSubject<boolean>(false);

  pendingUpdatePayload!: any;
  pendingLastClickedMenuItemString!: string;
  pendingUpdateFunctionIdToMenuItem!: boolean;

  dialogInstanceNumber!: number;

  functionMccColumns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_MODULE_NAME,
      field: 'moduleName',
      type: 'string',
      align: 'left',
      width: 250
    },
    // {
    //   caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_GROUP_NAME,
    //   field: 'groupName',
    //   type: 'string',
    //   align: 'left',
    //   width: 250
    // },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_PATH,
      field: 'path',
      type: 'string',
      align: 'left',
      width: 250,
    },
    // {
    //   caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_STATUS,
    //   field: 'status',
    //   type: 'string',
    //   align: 'left',
    //   width: 200
    // },
  ];

  functionMccApiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_FUNCTION_QUERY_LIST,
  }

  functionMccSelectedRow$ = new BehaviorSubject<any>({});

  moduleValidators: IValidator[] = [
    {
      name: 'required',
      validator: Validators.required,
      errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
    },
    {
      name: 'minLength',
      validator: Validators.min(1),
      errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
    }
  ]

  codeValidators: IValidator[] = [
    {
      name: 'required',
      validator: Validators.required,
      errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
    },
    {
      name: 'minLength',
      validator: Validators.minLength(1),
      errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
    }
  ]

  nameValidators: IValidator[] = [
    {
      name: 'required',
      validator: Validators.required,
      errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
    },
    {
      name: 'minLength',
      validator: Validators.minLength(1),
      errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
    }
  ]

  functionIdValidators: IValidator[] = [
    {
      name: 'required',
      validator: Validators.required,
      errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
    },
  ]

  nativeModuleValidator!: ValidatorFn;
  nativeCodeValidator!: ValidatorFn;
  nativeNameValidator!: ValidatorFn;
  nativeFunctionIdValidator!: ValidatorFn;

  sections: ICoreFormSection[] =
    [
      {
        caption: EnumTranslateKey.ROOT_MAPPER_MODE_FOR_THE_URL,
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
              field: 'editMode', // helper
              value: 'CREATE',
              controlType: EnumFormBaseContolType.RADIOGROUP,
              verticalMode: true,
              radioGroupOptions$: new BehaviorSubject<ICoreRadioOption[]>([
                {
                  value: 'CREATE',
                  text: EnumTranslateKey.ROOT_MAPPER_MODE_FOR_THE_URL_CREATE_NEW_FUNCTION
                },
                {
                  value: 'UPDATE',
                  text: EnumTranslateKey.ROOT_MAPPER_MODE_FOR_THE_URL_UPDATE_EXISTING_FUNCTION
                },
                {
                  value: 'ADD_TO_IGNORE',
                  text: EnumTranslateKey.ROOT_MAPPER_MODE_FOR_THE_URL_ADD_PATH_TO_IGNORED_FUNCTION
                },

              ]),
              type: 'string',
            },
          ]
        ]
      },
      {
        caption: EnumTranslateKey.ROOT_MAPPER_MODE_FOR_THE_URL_CREATE_NEW_FUNCTION,
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_MODULE_NAME,
              field: 'moduleId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.moduleOptions$,
              getByIdObject$: new BehaviorSubject<any>(null),
              getByIdApi: api.SYS_MODULE_READ,
              shownFrom: 'name',
              type: 'number',
              validators: this.moduleValidators,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_GROUP_NAME,
              field: 'groupId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.groupOptions$,
              getByIdObject$: new BehaviorSubject<any>(null),
              getByIdApi: api.SYS_FUNCTION_GROUP_READ,
              shownFrom: 'name',
              type: 'number',
            },
          ],
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: this.codeValidators
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_NAME,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: this.nameValidators
            },
          ],
        ]
      },
      {
        caption: EnumTranslateKey.ROOT_MAPPER_MODE_FOR_THE_URL_UPDATE_EXISTING_FUNCTION,
        hidden: true,
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MENU_SYS_FUNCTION,
              field: 'functionId', // helper
              value: null,
              controlType: EnumFormBaseContolType.MCC,
              columns: this.functionMccColumns,
              shownFrom: 'name',
              apiDefinition: this.functionMccApiDefinition,
              getByIdApi: api.SYS_FUNCTION_READ,
              selectedRow$: this.functionMccSelectedRow$,
              type: 'number',
              disabled: true,
              validators: this.functionIdValidators
            },

          ]
        ]
      },
      {
        caption: EnumTranslateKey.ROOT_MAPPER_THE_URL,
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_PATH,
              field: 'path',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_PATH_FULL_MATCH,
              field: 'pathFullMatch',
              value: true,
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
              disabled: true,
            },
          ]

        ]
      },
      {
        caption: EnumTranslateKey.ROOT_MAPPER_LAST_CLICKED_MENU_ITEM_STRING,
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
              field: 'lastClickedMenuItemString',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.ROOT_MAPPER_UPDATE_FUNCTION_ID_FOR_THE_MENU_ITEM,
              field: 'updateFunctionIdToMenuItem',
              value: false,
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
              disabled: true,
            },
          ]

        ]
      },
    ];

  constructor(
    public override dialogService: DialogService,
    private fncService: FunctionEditService,
    private router: Router,
    private coreFormService: CoreFormService,
    private appService: AppService,
    private routingService: RoutingService,
    private mls: MultiLanguageService,
    private navigatorService: NavigatorService,
    private location: Location,
    private alertService: AlertService,
    private stringService: StringService
  ) {

    super(dialogService);

    this.pendingUrl = this.router.getCurrentNavigation()?.extras.state!['url'];
    this.lastClickedMenuItem = this.router.getCurrentNavigation()?.extras.state!['lastClickedMenuItem'];
    this.lastClickedMenuItemString = this.router.getCurrentNavigation()?.extras.state!['lastClickedMenuItemString'];

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SYS_FUNCTION_EDIT;

    this.crud = {
      c: api.SYS_FUNCTION_CREATE,
      r: api.SYS_FUNCTION_READ,
      u: api.SYS_FUNCTION_UPDATE,
      d: api.SYS_FUNCTION_DELETE,
    };

  }

  ngOnInit(): void {

    this.coreFormService.getFormBaseControlByName(this.sections, 'path')!.value = this.pendingUrl;
    this.coreFormService.getFormBaseControlByName(this.sections, 'lastClickedMenuItemString')!.value = this.lastClickedMenuItemString;

    this.subscriptions.push(
      this.dialogService.dialogConfirmed$.pipe(
        filter(x => !!x?.confirmed && !!this.pendingUpdatePayload && x.instanceNumber === this.dialogInstanceNumber)
      ).subscribe(_ => {
        this.dialogService.resetService()
        this.update(this.pendingUpdatePayload, this.pendingLastClickedMenuItemString, this.pendingUpdateFunctionIdToMenuItem);
        this.dialogService.resetService()
      })
    )

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = true;
      this.subscriptions.push(
        zip([
          this.fncService.getModules(),
          this.fncService.getFuncGroups()
        ]).subscribe(x => {
          this.loading = false;
          if (x[0].ok && x[0].status === 200) {
            const body: IFormatedResponse = x[0].body
            const options: { value: number; text: string; }[] = [];
            console.log(body.innerBody)
            console.log(body.innerBody.length)
            this.stringService.sort(body.innerBody, 'name');
            body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            this.moduleOptions$.next(options)
          }
          if (x[1].ok && x[1].status === 200) {
            const body: IFormatedResponse = x[1].body
            const options: { value: number; text: string; }[] = [];
            this.stringService.sort(body.innerBody, 'name');
            body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            this.groupOptions$.next(options)
          }
        })
      )
    })
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;

    if (!!this.lastClickedMenuItemString) {
      const menuUrl = this.lastClickedMenuItemString.split('=>')[2].replace('(', '').replace(')', '');
      if (menuUrl === this.pendingUrl) {
        this.form.get('path')!.disable();
        this.form.get('pathFullMatch')!.patchValue(true);
        //this.form.get('pathFullMatch')!.disable();
        this.form.get('updateFunctionIdToMenuItem')!.patchValue(true);
        //this.form.get('updateFunctionIdToMenuItem')!.disable();
      } else {
        this.form.get('pathFullMatch')!.patchValue(false);
        this.form.get('updateFunctionIdToMenuItem')!.patchValue(false);
      }
    }

    this.nativeModuleValidator = this.form.get("moduleId")!.validator!;
    this.nativeCodeValidator = this.form.get("code")!.validator!;
    this.nativeNameValidator = this.form.get("name")!.validator!;
    this.nativeFunctionIdValidator = this.form.get("functionId")!.validator!;

    this.subscriptions.push(
      this.form.get('functionId')?.valueChanges.pipe(
        filter(x => !!x),
        distinctUntilChanged(),
        switchMap(x => {
          return this.appService.get(api.SYS_FUNCTION_READ + '?id=' + x)
        })
      ).subscribe(x => {
        if (x.ok && x === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            this.form.patchValue(body.innerBody)
          }
        }
      })!
    )


    this.form.get('editMode')?.valueChanges.subscribe(x => {
      const createPart = this.sections.filter(s => s.caption === EnumTranslateKey.ROOT_MAPPER_MODE_FOR_THE_URL_CREATE_NEW_FUNCTION)[0]
      const updatePart = this.sections.filter(s => s.caption === EnumTranslateKey.ROOT_MAPPER_MODE_FOR_THE_URL_UPDATE_EXISTING_FUNCTION)[0]
      const functionlessPart = this.sections.filter(s => s.caption === EnumTranslateKey.ROOT_MAPPER_MODE_FOR_THE_URL_UPDATE_EXISTING_FUNCTION)[0]
      functionlessPart.rows = functionlessPart.rows.filter(r => r.filter(c => c.field === 'path'))
      const bottomPart = this.sections.filter(s => s.caption === EnumTranslateKey.ROOT_MAPPER_LAST_CLICKED_MENU_ITEM_STRING)[0]
      console.log("functionlessPart", functionlessPart)
      if (x === 'CREATE') {

        this.form.get("moduleId")!.validator = this.nativeModuleValidator;
        this.form.get("code")!.validator = this.nativeCodeValidator;
        this.form.get("name")!.validator = this.nativeNameValidator;
        this.form.get("functionId")!.clearValidators();


        this.form.get('functionId')?.patchValue(null);
        createPart.hidden = false;
        updatePart.hidden = true;
        bottomPart.hidden = false;

        createPart.rows.map(row => {
          row.map(column => {
            this.form.get(column.field)?.enable()
          })
        })

      } else if (x === 'UPDATE') {

        this.form.get("moduleId")!.clearValidators();
        this.form.get("code")!.clearValidators();
        this.form.get("name")!.clearValidators();
        this.form.get("functionId")!.validator = this.nativeFunctionIdValidator;

        this.form.patchValue({
          id: null,
          moduleId: null,
          groupId: null,
          code: null,
          name: null,
        })

        createPart.hidden = true;
        updatePart.hidden = false;
        bottomPart.hidden = false;

        updatePart.rows.map(row => {
          row.map(column => {
            this.form.get(column.field)?.enable()
          })
        })
      } else if (x === 'ADD_TO_IGNORE') {
        this.form.get("functionId")!.clearValidators();
        this.form.get("moduleId")!.clearValidators();
        this.form.get("code")!.clearValidators();
        this.form.get("name")!.clearValidators();

        this.form.patchValue({
          id: null,
          moduleId: null,
          groupId: null,
          code: null,
          name: null,
          updateFunctionIdToMenuItem: null
        })

        createPart.hidden = true;
        updatePart.hidden = true;
        bottomPart.hidden = true;

        functionlessPart.rows.map(row => {
          row.map(column => {
            this.form.get(column.field)?.enable()
          })
        })

      }
      this.checkError$.next(false);
    })
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  onSubmit(event: { mode: string; formValue: any }): void {
    if (event.mode === 'CREATE') {
      const { moduleId, groupId, code, name, path, pathFullMatch, lastClickedMenuItemString, updateFunctionIdToMenuItem } = event.formValue
      const payload = { moduleId, groupId, code, name, path, pathFullMatch }

      if (!!updateFunctionIdToMenuItem) {
        if (!!lastClickedMenuItemString) {
          const menuId = Number(lastClickedMenuItemString.split('=>')[0].replace('[', '').replace(']', ''));
          this.subscriptions.push(
            this.appService.post(api.SYS_FUNCTION_CREATE_THEN_UPDATE_FUNCTION_ID_FOR_MENU, { function: payload, menuId }).subscribe(x => {
              if (x.ok && x.status === 200) {
                const body: IFormatedResponse = x.body
                if (body.statusCode === 200) {
                  this.reloadFunctions()
                }
              }
            }))
        } else {
          this.alertService.error("lastClickedMenuItemString was null", noneAutoClosedAlertOptions);
        }
      } else {
        this.subscriptions.push(
          this.appService.post(api.SYS_FUNCTION_CREATE, payload).subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body
              if (body.statusCode === 200) {
                this.reloadFunctions()
              }
            }
          }))
      }

    } else if (event.mode === 'UPDATE') {
      const { id, moduleId, groupId, code, name, path } = this.functionMccSelectedRow$.value
      const { lastClickedMenuItemString, updateFunctionIdToMenuItem, pathFullMatch } = event.formValue
      const newPath = event.formValue.path;
      const payload = { id, moduleId, groupId, code, name, path: newPath, pathFullMatch }

      if (newPath !== path) {
        this.dialogInstanceNumber = new Date().getTime();
        this.dialogService.dialogConfirmed$.next({
          instanceNumber: this.dialogInstanceNumber,
          confirmed: false
        });
        this.dialogService.title$.next(EnumTranslateKey.UI_CORE_DIALOG_SERVICE_CONFIRMATION)
        this.dialogService.body$.next(EnumTranslateKey.ROOT_MAPPER_DO_YOU_WANT_TO_OVERWRITE_THE_EXISTING_URL)
        this.dialogService.showCancelOnly$.next(false)
        this.dialogService.okButtonText$.next(EnumTranslateKey.YES)
        this.dialogService.cancelButtonText$.next(EnumTranslateKey.CANCEL)
        this.dialogService.informationLines$.next([
          path,
          this.mls.trans(EnumTranslateKey.UI_PERMISSION_THIS_PATH_WILL_BE_REPLACED_BY),
          newPath
        ])
        this.pendingUpdatePayload = payload
        this.pendingLastClickedMenuItemString = lastClickedMenuItemString
        this.pendingUpdateFunctionIdToMenuItem = updateFunctionIdToMenuItem
        this.dialogService.showConfirmDialog$.next(true)
        return;
      }

      this.update(payload, lastClickedMenuItemString, updateFunctionIdToMenuItem);

    } else if (event.mode === 'ADD_TO_IGNORE') {
      const { path } = event.formValue
      const payload = { path }

      this.subscriptions.push(
        this.appService.post(api.SYS_FUNCTION_IGNORE_CREATE, payload).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body
            if (body.statusCode === 200) {
              this.reloadIgnoredPaths()
            }
          }
        }))
    }
  }

  private reloadFunctions(): void {
    this.subscriptions.push(
        this.routingService.getFullFunctions().subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body
          if (body.statusCode === 200) {
            this.routingService.fullFunctions$.next(body.innerBody)
            this.location.back();
          }
        }          
      })
    )
  }
  private reloadIgnoredPaths(): void {
    this.subscriptions.push(
        this.routingService.getIgnorePaths().subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body
          if (body.statusCode === 200) {
            this.routingService.ignoredPaths$.next(body.innerBody)
            this.location.back();
          }
        }
      })
    )
  }

  private update(payload: any, lastClickedMenuItemString: string, updateFunctionIdToMenuItem: boolean): void {
    if (!!updateFunctionIdToMenuItem) {
      if (!!lastClickedMenuItemString) {
        const menuId = Number(lastClickedMenuItemString.split('=>')[0].replace('[', '').replace(']', ''));
        this.subscriptions.push(
          this.appService.post(api.SYS_FUNCTION_UPDATE_THEN_UPDATE_FUNCTION_ID_FOR_MENU, { function: payload, menuId }).subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body
              if (body.statusCode === 200) {
                this.reloadFunctions()
              }
            }
          }))
      } else {
        this.alertService.error("lastClickedMenuItemString was null", noneAutoClosedAlertOptions);
      }
    } else {
      this.subscriptions.push(
        this.appService.post(api.SYS_FUNCTION_UPDATE, payload).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body
            if (body.statusCode === 200) {
              this.reloadFunctions()
            }
          }
        }))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

}