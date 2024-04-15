import { Component, OnDestroy, OnInit } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { ICorePageEditCRUD } from 'src/app/libraries/core-page-edit/core-page-edit.component';

import { FormGroup, Validators } from '@angular/forms';
import { EnumFormBaseContolType, ICoreFormSection } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { DialogService } from 'src/app/services/dialog.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { AuthService } from 'src/app/services/auth.service';
import { filter } from 'rxjs';
import { Subscription } from 'rxjs';
import { IAuthData } from 'src/app/interfaces/IAuthData';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { IAlertOptions } from 'src/app/libraries/alert/alert/alert.model';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends BaseEditComponent implements OnInit, OnDestroy {

  override form!: FormGroup;

  loading: boolean = false;

  subsctiptions: Subscription[] = [];

  /* Properties to be passed into core-page-edit */

  override entityTable = "TENANT_USER";

  captionCode!: EnumTranslateKey;
  //formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        // caption: ...,
        // iconClass: ...,
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: 0,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              hidden: true // To hide id field
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_OLD_PASSWORD,
              field: 'oldPassword',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'password',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(6),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NEW_PASSWORD,
              field: 'newPassword',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'password',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(8),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NEW_PASSWORD_CONFIRM,
              field: 'confirmNewPassword',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'password',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(8),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
          ],
        ]
      }
    ];
  constructor(
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private alertService: AlertService,
    private appService: AppService,
    private router: Router,
    private urlService: UrlService,
    private authService: AuthService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TENANT_USER_CHANGE_PASSWORD;

    this.crud = {
      r: api.SYS_USER_READ,
      u: api.SYS_USER_CHANGE_PASSWORD,
    };

  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.data$.pipe(filter(x => !!x)).subscribe((x: IAuthData | null) => {
        this.id = x?.id!;

        this.instanceNumber = new Date().getTime();
      }),
      this.appService.get("/api/SysUser/GetByStringIdPortal" + "?id=" + this.id + "&time=" + this.instanceNumber).subscribe(res => {

        this.isFirstLogin = res.body.innerBody.isFirstLogin;
      })
    )
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  onSubmitSuccess(e: boolean): void {
    if (e === true) {
      this.authService.stopSubscription = true;
      this.authService.data$.next({
        ...this.authService.data$.value!,
        isFirstLogin: false
      })
      this.authService.stopSubscription = false;
    }
  }

  subscriptions: Subscription[] = [];
  isFirstLogin!: boolean;
  id!: string;
  instanceNumber!: number;

  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: false,
    timeClose: 10000
  };

  onClickCancel(event: any) {
    //LAM MUA LAM GIO O DAY
    
    this.subscriptions.push(
      this.authService.userLogout().subscribe(x => {
        if (x.ok && x.status === 200) {
          if (this.isFirstLogin == true) {
            this.authService.data$.next(null);
            this.alertService.info(this.mls.trans(x.body.innerBody), this.alertOptions)
          }
          else {
            this.router.navigateByUrl(this.urlService.previousRouteUrl$.value);
          }
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subsctiptions.map(x => x?.unsubscribe())
  }

}