import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, map } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  VirtualScrollService,
} from '@syncfusion/ej2-angular-grids';
import { ToolbarItem, ToolbarInterface } from 'src/app/_models/index';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Query, Predicate } from '@syncfusion/ej2-data';
import { FieldSettingsModel } from '@syncfusion/ej2-dropdowns';
import { CoreService } from 'src/app/services/core.service';
import { ModalService } from 'src/app/services/modal.service';
import { ConfigService } from 'src/app/services/config.service';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { ICoreDropdownOption } from 'src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component';
import {
  ICoreFormSection,
  EnumFormBaseContolType,
} from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { ICorePageEditCRUD } from 'src/app/libraries/core-page-edit/core-page-edit.component';
import { DialogService } from 'src/app/services/dialog.service';
import { ICoreChecklistOption } from 'src/app/libraries/core-checklist/core-checklist/core-checklist.component';
import { SysOrtherlistEditService } from './sys-ortherlist.edit.service';
import { AppService } from 'src/app/services/app.service';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { CustomValidators } from 'src/app/libraries/core-form/custom-validators';
setCulture('en');

@Component({
  selector: 'app-sys-otherlist-edit',
  templateUrl: './sys-otherlist-edit.component.html',
  styleUrls: ['./sys-otherlist-edit.component.scss'],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class SysOtherlistEditComponent extends BaseEditComponent {
  loading: boolean = false;
  override entityTable = 'SYS_OTHER_LIST';
  scaleOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  scaleGetByIdObject$ = new BehaviorSubject<any>(null);
  typeGetByIdApi = api.SYS_OTHERLIST_TYPE_READ;
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  subsctiptions: Subscription[] = [];
  sections!: ICoreFormSection[];

  constructor(
    public override dialogService: DialogService,
    private sysOrtherlistEditService: SysOrtherlistEditService,
    private appService: AppService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_ORTHERLIST_EDIT;

    this.crud = {
      c: api.SYS_OTHERLIST_CREATE,
      r: api.SYS_OTHERLIST_READ,
      u: api.SYS_OTHERLIST_UPDATE,
      d: api.SYS_OTHERLIST_DELETE_IDS,
    };
  }

  ngOnInit(): void {
    this.loading = true;
    this.sysOrtherlistEditService
      .getScales()
      .pipe(
        map((x: any) => {
          if (x.ok && x.status === 200) {
            const options: { value: number; text: string }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
              });
            });
            return options;
          } else {
            return [];
          }
        })
      )
      .subscribe((response) => {
        this.scaleOptions$.next(response);
        this.loading = false;
      });

    this.sections = [
      {
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              hidden: true,
            },
          ],
          [
            {
              flexSize: 12,
              label:
                EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_TYPENAME,
              field: 'typeId',
              value: this.sysOrtherlistEditService.typeId,
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.scaleOptions$,
              getByIdObject$: this.scaleGetByIdObject$,
              getByIdApi: this.typeGetByIdApi,
              shownFrom: 'name',
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(1),
                  errorMessage:
                    EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                },
              ],
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(1),
                  errorMessage:
                    EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                },
              ],
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_NAME,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(1),
                  errorMessage:
                    EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                },
              ],
            },
          ],

          [
            {
              flexSize: 12,
              label:
                EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_EFFECTIVE_DATE,
              field: 'effectiveDate',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'Date',
              pipe: EnumCoreTablePipeType.DATE,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'checkExpirationDate',
                  validator: SysOtherlistEditComponent.checkEffectDate,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
                },

              ],
            },
          ],
          [
            {
              flexSize: 12,
              label:
                EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_EXPIRATION_DATE,
              field: 'expirationDate',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'Date',
              pipe: EnumCoreTablePipeType.DATE,
              validators: [
                {
                  name: 'checkExpirationDate',
                  validator: SysOtherlistEditComponent.checkExpirationDate,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
                },
              ],
            },

          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_OTHERLIST_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
          ],
        ],
      },
    ];
  }
  static checkExpirationDate(expirationDate: AbstractControl) {
    let valid = true;
    let messageCode = "";
    if (expirationDate.parent?.get('effectiveDate')?.value != null) {
      const effectDate = new Date(expirationDate.parent?.get("effectiveDate")?.value);
      const toDate = new Date(expirationDate.value)
      if (effectDate > toDate && effectDate != null && toDate != null) {
        valid = false;
        messageCode = EnumTranslateKey.UI_FORM_CONTROL_WELFARE_ERROR_TO_EXPIRATION_DATE_MORE_THAN_EFFECT_DATE
      }
    }
    return CustomValidators.core("checkExpirationDate", valid, messageCode)(expirationDate)

  }

  static checkEffectDate(effectDate: AbstractControl) {
    let valid = true;
    let errorMessage = "";
    if (effectDate.parent?.get("expirationDate")?.value != null) {
      const toDate = new Date(effectDate.parent?.get("expirationDate")?.value);
      const fromDate = new Date(effectDate.value);
      if (fromDate > toDate && toDate != null && fromDate != null) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WELFARE_ERROR_EFFECT_DATE_MORE_THAN_EXPIRATION_DATE
      }
    }
    return CustomValidators.core("checkEffectDate", valid, errorMessage)(effectDate)
  }
  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GET_CODE)
        .pipe(
          map((f: any) => {
            let options: string = '';
            options = f.body.innerBody.code;
            return options;
          })
        )
        .subscribe((response) => {
          if (this.form.get('code')?.value == '')
            this.form.get('code')?.patchValue(response);
        })
    )!;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
