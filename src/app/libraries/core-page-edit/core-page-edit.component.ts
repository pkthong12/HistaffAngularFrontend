import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, isDevMode, ViewChild, ElementRef, TemplateRef, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CorePageEditService } from './core-page-edit.service';
import { AnimatedTextService } from '../animated-text/animated-text.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { ResponseService } from 'src/app/services/response.service';
import { HubConnectionService } from 'src/app/services/hub-connection.service';
import { UrlService } from 'src/app/services/url.service';
import { RoutingService } from 'src/app/services/routing.service';

import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { AlertService } from '../alert/alert.service';
import { IAlertOptions } from '../alert/alert/alert.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CorePageListService } from '../core-page-list/core-page-list.service';
import { CoreFormService } from '../core-form/core-form.service';
import { EnumFormBaseContolType, ICoreFormSection, } from '../core-form/core-form/enum-interfaces';
import { IDynamicFormEmitOnFormCreated } from '../core-form/core-form/core-form.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { IHubConnectionActivity } from 'src/app/interfaces/IHubConnectionActivity';
import { AuthService } from 'src/app/services/auth.service';
import { EnumSignalRType } from 'src/app/enum/EnumSignalRType';
import { api } from 'src/app/constants/api/apiDefinitions';
import { FormGroup } from '@angular/forms';
import { alertOptions, noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { EnumCoreButtonVNSCode } from '../core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';

export enum EnumCorePageEditMode {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export enum EnumCorePageEditFieldType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
  DATE_TIME = 'datetime',
  TIME = 'time',
  MCC = 'multi_column_combobox',
}

export enum EnumCorePageEditBootstrapClass {
  MD3 = 'md-3',
  MD4 = 'md-4',
  MD6 = 'md-6',
  MD8 = 'md-8',
  MD9 = 'md-9',
  MD12 = 'md-12',
}

export interface ICorePageEditColumnComposition {
  field: string;
  captionKey: string;
  corePageEditFieldType: EnumCorePageEditFieldType;
  bootstrapClass: EnumCorePageEditBootstrapClass;
}

export interface ICorePageEditCRUD {
  c?: api; // Create
  r: api; // GetById
  rChildren?: api; // GetChildrenById
  u: api; // Update
  d?: api; // Delete
}

export interface ISysMutationLogBeforeAfterRequest {
  sysFunctionCode: string;
  sysActionCode: string;
  before: string;
  after: string;
  username: string;
}

@Component({
  selector: 'core-page-edit',
  templateUrl: './core-page-edit.component.html',
  styleUrls: ['./core-page-edit.component.scss'],
})
export class CorePageEditComponent implements OnInit, AfterViewInit {
  @Input() stayAfterSubmit!: boolean;
  @Input() width!: number;
  @Input() entityTable!: string;
  @Input() hasIdOfStringType!: boolean;
  @Input() captionCode!: string;
  @Input() leftInputSections!: ICoreFormSection[];
  @Input() leftInputSectionsFlexSize!: number;
  @Input() sections!: ICoreFormSection[];
  @Input() normalMode!: boolean; // this allows to open the edit form as usual mode
  @Input() bottomTemplateRef!: TemplateRef<any>;
  @Input() autoGetByIdOff!: boolean;
  @Input() autoSubmitLogicOff!: boolean;
  @Input() customFormButtonItems!: EnumCoreButtonVNSCode[];
  @Input() mixedMode!: boolean;
  @Input() checkError$ = new BehaviorSubject<boolean>(false);
  @Input() autoCancelLogicOff!: boolean;


  @Output() submitLogic = new EventEmitter();
  @Output() onFormCreated = new EventEmitter();
  @Output() onSubmitSuccess = new EventEmitter();
  @Output() cancelLogic = new EventEmitter();

  form!: FormGroup;

  @Input() crud!: ICorePageEditCRUD;
  @Input() entityUniqueIndexs: string[][] =
    []; /* For ex: [['id'], ['provinceId', 'districCode']]  etc... */
  @Output() onInitialValueStringReady = new EventEmitter<string>();

  @ViewChild('container') container!: ElementRef;
  @ViewChild('containerBigger') containerBigger!: ElementRef;

  sections$!: BehaviorSubject<ICoreFormSection[]>;
  mode$ = new BehaviorSubject<EnumCorePageEditMode>(
    EnumCorePageEditMode.CREATE
  );

  currentValue: any;
  initialValue!: string;
  subscriptions: Subscription[] = [];

  fromUrl!: string;
  listInstance!: number;
  loading!: boolean;

  lang!: string;

  submitText!: EnumTranslateKey;

  showCaptionButton: boolean = true;

  scroll!: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private corePageEditService: CorePageEditService,
    private commonHttpRequestService: CommonHttpRequestService,
    private animatedTextService: AnimatedTextService,
    private mls: MultiLanguageService,
    private coreFormService: CoreFormService,
    private corePageListService: CorePageListService,
    private hubConnectionService: HubConnectionService,
    private authService: AuthService,
    private alertService: AlertService,
    private urlService: UrlService,
    private routingService: RoutingService,
  ) {
    this.fromUrl = this.corePageEditService.fromUrl;
    this.listInstance = Number(
      this.route.snapshot.paramMap.get('listInstance')!
    );
  }

  private sendSignal(data: any) {
    const connection = this.hubConnectionService.hubConnection$.value;
    if (!!connection) {
      const message: IHubConnectionActivity = {
        sid: this.authService.data$.value?.id!,
        username: this.authService.data$.value?.fullName!,
        avatar: this.authService.data$.value?.avatar!,
        signalType: EnumSignalRType.ENTITY_CHANGED,
        message: `${this.authService.data$.value
          ?.userName!} has changed entity ${this.entityTable}`,
        loginTime: this.authService.data$.value?.loginTime!,
        data: null,
      };
      connection.invoke('SendMessage', message);
    }
  }

  ngOnInit(): void {

    this.sections$ = new BehaviorSubject<ICoreFormSection[]>(this.sections);

    if (!!!this.entityTable) {
      alert(
        'Property entityTable (name) is required for component ' +
        this.captionCode
      );
      console.error(
        'Property entityTable (name) is required for component ' +
        this.captionCode
      );
    }
  }

  ngAfterViewInit(): void {
    if (!!this.normalMode) {
      console.log(this.container)
      this.container.nativeElement.style.setProperty('--width', '100%');
    } else {
      if (!!this.width) {
        this.container.nativeElement.style.setProperty(
          '--width',
          this.width + 'px'
        );
      }
      this.containerBigger.nativeElement.style.setProperty(
        '--height',
        '95%'
      )
    }

    setTimeout(() => {
      this.scroll = this.container.nativeElement.scrollHeight > this.container.nativeElement.offsetHeight
    });

    setTimeout(() => {
      if (!!!this.mixedMode) {
        this.subscriptions.push(
          this.route.params.subscribe(x => {
            console.log("this.route.params.subscribe", x)

            let id: string = '0';
            if (this.hasIdOfStringType) {
              try {
                id = atob(x['id']);
              } catch { return }
            } else {
              try {
                id = Number(atob(x['id'])).toString();
              } catch { return }
            }

            if (id !== '0') {
              this.mode$.next(EnumCorePageEditMode.UPDATE);

              this.submitText = EnumTranslateKey.UI_EDIT_FORM_BUTTON_SAVE;

              if (!!!this.autoGetByIdOff) {
                this.loading = true;
                this.subscriptions.push(
                  this.corePageEditService.getById(id, this.crud.r).subscribe((x) => {
                    this.loading = false;
                    const body: IFormatedResponse = x.body;
                    //this.responseService.resolve(body);
                    if ((body.statusCode = 200)) {
                      /* #region Exclude sections with flag addModeOnly=true */
                      if (!!body.innerBody.id) {
                        // remove relevant controls from form group
                        const addModeOnlySections = this.sections.filter(
                          (x) => !!x.addModeOnly
                        );
                        addModeOnlySections.map((addModeOnlySection) => {
                          addModeOnlySection.rows.map((addModeOnlyRow) => {
                            addModeOnlyRow.map((addModeOnlyControl) => {
                              this.form.removeControl(addModeOnlyControl.field);
                            });
                          });
                        });

                        // remove relevant controls from form sections
                        const newSections = this.sections.filter((x) => !!!x.addModeOnly);
                        this.sections = newSections;
                        this.sections$.next(this.sections);
                      }
                      /* #endregion Exclude sections with flag addModeOnly=true */

                      /* #region: Assign value to attachment fields when controlType = ATTACHMENT */
                      this.sections.map((section) => {
                        section.rows.map((row) => {
                          row.map((control) => {
                            if (control.controlType === EnumFormBaseContolType.ATTACHMENT) {
                              control.valueToShow = body.innerBody[control.assignTo!]
                            }
                          });
                        });
                      });

                      /* #endregion: Assign value to basic fields when controlType = ATTACHMENT */

                      /* #region: Using PatchValue instead of setValue */
                      // Forms often have extra helper fields

                      // thus, if we use setValue method, the helper fields will be lost:
                      // this.form.setValue(body.innerBody)

                      // so, we use patchValue method :
                      this.currentValue = body.innerBody;
                      this.form.patchValue(this.currentValue);

                      this.sections.map((section) => {
                        section.rows.map((row) => {
                          row.map((control) => {
                            if (
                              [
                                EnumFormBaseContolType.SEEKER,
                                EnumFormBaseContolType.DROPDOWN,
                                EnumFormBaseContolType.CHECKLIST,
                              ].includes(control.controlType)
                            ) {
                              if (!!this.currentValue[control.field]) {

                                if (isDevMode() && !!!control.getByIdApi) {
                                  switch (control.controlType) {
                                    case EnumFormBaseContolType.DROPDOWN:
                                      if (!!!control.dropdownOptions$?.value) {
                                        this.alertService.error(`getByIdApi not provided for '${control.field}'`, noneAutoClosedAlertOptions)
                                      }
                                      break;
                                    case EnumFormBaseContolType.CHECKLIST:
                                      if (!!!control.checklistOptions$?.value) {
                                        this.alertService.error(`getByIdApi not provided for '${control.field}'`, noneAutoClosedAlertOptions)
                                      }
                                      break;
                                    default:
                                      this.alertService.error(`getByIdApi not provided for '${control.field}'`, noneAutoClosedAlertOptions)
                                      break;
                                  }

                                }

                                this.subscriptions.push(
                                  this.commonHttpRequestService
                                    .makeGetRequest(
                                      'getById',
                                      control.getByIdApi +
                                      `?id=${this.currentValue[control.field]}`
                                    )
                                    .subscribe((x) => {
                                      console.log("form getById result: ", this.currentValue)
                                      if (x.ok && x.status === 200) {
                                        const body: IFormatedResponse = x.body;
                                        if (body.statusCode === 200) {
                                          control.getByIdObject$?.next(body.innerBody);
                                        } else {
                                          control.getByIdObject$?.next(null);
                                        }
                                      }
                                    })
                                );
                              }
                            }

                            if (control.controlType === EnumFormBaseContolType.SEEKER && control.multiMode) {
                              control.objectList$?.next(body.innerBody[control.getObjectListFrom!])
                            }

                          });
                        });
                      });

                      this.sections$.next(this.sections);

                      /* #endregion: Using PatchValue instead of setValue */
                    }
                    // return initFormValueString to the caller
                    this.onInitialValueStringReady.emit(
                      JSON.stringify(this.form.getRawValue())
                    );
                  })
                );
              }
            }
            else {
              this.mode$.next(EnumCorePageEditMode.CREATE);
              this.submitText = EnumTranslateKey.UI_EDIT_FORM_BUTTON_ADD;
            }
          })
        )
      }
      this.subscriptions.push(
        this.mls.lang$.subscribe(x => this.lang = x)
      )
    })

  }

  private toggleReloadFlagForTheCaller(id: number): void {

    const instancesFilter = this.corePageListService.instances.filter(
      (x) => x.instanceNumber === this.listInstance
    );
    if (!!instancesFilter.length) {
      const instance = instancesFilter[0];
      instance.id$.next(id);
      //if (!!!this.normalMode) instance.reloadFlag$?.next(!instance.reloadFlag$.value);

      if (isDevMode()) {
        this.alertService.info(`CorePageList instance number ${this.listInstance} current id is: ${instance.id$.value}`, alertOptions)
      }

    } else {
      if (isDevMode()) {
        this.alertService.info(`CorePageList instances do not include number ${this.listInstance}`, alertOptions)
      }
    }
  }

  onNotOk200Response(x: object): void {
    if (isDevMode()) {
      if (Object.keys(x).length === 0) {
        this.alertService.error("No response content. It was possibly a CORS error.", noneAutoClosedAlertOptions)
      } else {
        //this.alertService.error(JSON.stringify(x, null, 2), noneAutoClosedAlertOptions)
      }
    }
  }

  onSubmit(): void {

    /* IF id is falsy => CREAT, otherwise UPDATE */

    /* FOR CONTROL OF TYPE GRIDBUFFER, SET EVERY id TO NULL */
    this.sections.map(section => {
      section.rows.map(row => {
        row.map(control => {
          console.log(control.controlType)
          if (control.controlType === EnumFormBaseContolType.GRIDBUFFER) {
            const abstractControl = this.form.get(control.field)?.value;
            // TO DO 17/08/2023 ===========
            abstractControl?.value?.map((x: any) => x.id = null);
            // =========================
          }
        })
      })
    })

    if (!!this.mixedMode) {
      this.submitLogic.emit(
        {
          mode: this.form.get('editMode')?.value,
          formValue: this.form.getRawValue()
        }
      );
      return;
    }

    if (!!this.autoSubmitLogicOff) {
      // DO your logic here
      this.submitLogic.emit(JSON.stringify(this.form.getRawValue()));
      return;
    }

    else if (!!!this.form.get('id')!.value) {
      this.loading = true;

      const sysMutationLogBeforeAfterRequest: ISysMutationLogBeforeAfterRequest = {
        sysFunctionCode: this.routingService.currentFunction$.value?.code!,
        sysActionCode: EnumCoreButtonVNSCode.HEADER_CREATE,
        before: JSON.stringify(this.currentValue) ?? '""',
        after: JSON.stringify(this.form.getRawValue()),
        username: this.authService.data$.value?.userName!
      }

      this.animatedTextService.text$.next(
        this.mls.trans(EnumTranslateKey.UI_DIALOG_ADDING_PLEASE_WAIT)
      );

      this.commonHttpRequestService
        .makePostRequest(
          'create ' + this.entityTable,
          this.crud.c!,
          {
            ...this.form.getRawValue(),
            sysMutationLogBeforeAfterRequest,
          }
        )
        .subscribe((x) => {
          this.loading = false;
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            //this.responseService.resolve(body);
            if (body.statusCode === 200) {
              if (isDevMode()) {
                this.sendSignal(body.innerBody);
                this.onSubmitSuccess.emit(true);
              }

              this.onInitialValueStringReady.emit(
                JSON.stringify(this.form.getRawValue())
              );

              /*
              Transfer newly created record id
            */
              this.toggleReloadFlagForTheCaller(body.innerBody.id);
              this.router.navigate(['../'], { relativeTo: this.route, state: { id: body.innerBody.id, instanceNumber: this.listInstance } });
            }
          } else {
            this.onNotOk200Response(x);
          }
        });
    } else {
      this.loading = true;

      const sysMutationLogBeforeAfterRequest: ISysMutationLogBeforeAfterRequest = {
        sysFunctionCode: this.routingService.currentFunction$.value?.code!,
        sysActionCode: EnumCoreButtonVNSCode.HEADER_SAVE,
        before: JSON.stringify(this.currentValue) ?? '""',
        after: JSON.stringify(this.form.getRawValue()),
        username: this.authService.data$.value?.userName!
      }

      const a1 = this.coreFormService.getAllFormBaseControlNames(this.leftInputSections?.filter(x => !x.hidden));
      const a2 = this.coreFormService.getAllFormBaseControlNames(this.sections?.filter(x => !x.hidden));
      const actualFormDeclaredFields = [...a1, ...a2];

      this.animatedTextService.text$.next(
        this.mls.trans(EnumTranslateKey.UI_DIALOG_UPDATING_PLEASE_WAIT)
      );
      this.commonHttpRequestService
        .makePostRequest(
          'update ' + this.entityTable,
          this.crud.u,
          {
            ...this.form.getRawValue(),
            sysMutationLogBeforeAfterRequest,
            actualFormDeclaredFields
          }
        )
        .subscribe((x) => {
          this.loading = false;
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            //this.responseService.resolve(body);
            if (body.statusCode === 200) {
              if (isDevMode()) {
                this.sendSignal(body.innerBody);
                this.onSubmitSuccess.emit(true);
              }

              this.onInitialValueStringReady.emit(
                JSON.stringify(this.form.getRawValue())
              );
              /*
              Transfer current record id
            */
              this.toggleReloadFlagForTheCaller(body.innerBody.id);
              this.router.navigate(['../'], { relativeTo: this.route, state: { id: body.innerBody.id, instanceNumber: this.listInstance } });
            }
          } else {
            this.onNotOk200Response(x);
          }
        });
    }
  }

  onCancel(): void {
    if (!!this.autoCancelLogicOff) {
      this.cancelLogic.emit(true);
      return
    }

    if (!!this.urlService.previousRouteUrl$.value.length) {
      this.router.navigateByUrl(this.urlService.previousRouteUrl$.value);
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onFormCreatedLocal(e: IDynamicFormEmitOnFormCreated): void {
    this.form = e.formGroup;
    this.form.patchValue(this.currentValue);
    this.onFormCreated.emit(this.form);

    // Now we can return initFormValueString to the caller
    this.onInitialValueStringReady.emit(
      JSON.stringify(this.form.getRawValue())
    );
  }
}
