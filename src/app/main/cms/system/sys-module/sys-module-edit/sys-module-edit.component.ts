import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { EnumFormBaseContolType, ICoreFormSection } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { ICorePageEditCRUD } from 'src/app/libraries/core-page-edit/core-page-edit.component';
import { AppService } from 'src/app/services/app.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-sys-module-edit',
  templateUrl: './sys-module-edit.component.html',
  styleUrls: ['./sys-module-edit.component.scss']
})
export class SysModuleEditComponent extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = "SYS_MODULE";
  captionCode!: EnumTranslateKey;
  subsctiptions: Subscription[] = [];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'number',
              hidden : true
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_APPLICATION_ID,
              field: 'aplicationId',
              value: 1,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'number',
              hidden : true
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MODULE_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(2),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                },

              ]
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MODULE_NAME,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(3),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                },

              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_IS_ACTIVE,
              field: 'isActive',
              value: false,
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
          ],
        ]
      },
    ];
  constructor(
    public override dialogService: DialogService,
    private appService: AppService,
  ) {

    super(dialogService);
    this.captionCode = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MODULE_EDIT_TITLE;
    this.crud = {
      c: api.SYS_MODULE_CREATE,
      r: api.SYS_MODULE_READ,
      u: api.SYS_MODULE_UPDATE,
      d: api.SYS_MODULE_DELETE,
    };

  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
