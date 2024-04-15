import { Component, OnInit } from '@angular/core';
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
  selector: 'app-sys-action-edit',
  templateUrl: './sys-action-edit.component.html',
  styleUrls: ['./sys-action-edit.component.scss']
})
export class SysActionEditComponent extends BaseEditComponent  implements OnInit {

      /* Properties to be passed into core-page-edit */
      loading: boolean = false;
      override entityTable = "SYS_ACTION";
      captionCode!: EnumTranslateKey;
      subsctiptions: Subscription[] = [];
      crud!: ICorePageEditCRUD;
      sections: ICoreFormSection[] =
        [
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
                  type: 'number',
                  hidden : true
                }
              ],
              [
                {
                  flexSize: 12,
                  label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_ACTION_CODE,
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
                  ]
                }
              ],
              /*
              [
                {
                  flexSize: 12,
                  label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_ACTION_NAME_VN,
                  field: 'nameVn',
                  value: '',
                  controlType: EnumFormBaseContolType.TEXTBOX,
                  type: 'string',
                  validators: [
                    {
                      name: 'required',
                      validator: Validators.required,
                      errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                    },
    
                  ]
                },
              ],
              [
                {
                  flexSize: 12,
                  label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_ACTION_NAME_EN,
                  field: 'nameEn',
                  value: '',
                  controlType: EnumFormBaseContolType.TEXTBOX,
                  type: 'string',
                  validators: [
                    {
                      name: 'required',
                      validator: Validators.required,
                      errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                    },
    
                  ]
                },
              ],
              */
            ]
          },
        ];
      constructor(
        public override dialogService: DialogService,
        private appService: AppService,
      ) {
    
        super(dialogService);
        this.captionCode = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_GROUP_EDIT_TITLE;
        this.crud = {
          c: api.SYS_ACTION_CREATE,
          r: api.SYS_ACTION_READ,
          u: api.SYS_ACTION_UPDATE,
          d: api.SYS_ACTION_DELETE,
        };
    
      }
    
      ngOnInit(): void {
    
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
