import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { DialogService } from 'src/app/services/dialog.service';
import { SysOrtherlistEditService } from '../../sys-otherlist/sys-otherlist-edit/sys-ortherlist.edit.service';
import { ICoreChecklistOption } from 'src/app/libraries/core-checklist/core-checklist/core-checklist.component';
import { ICoreDropdownOption } from 'src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component';
import { BehaviorSubject, map } from 'rxjs';
import { EnumFormBaseContolType, ICoreFormSection } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { ICorePageEditCRUD } from 'src/app/libraries/core-page-edit/core-page-edit.component';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';

@Component({
  selector: 'app-otherlist-type-edit',
  templateUrl: './otherlist-type-edit.component.html',
  styleUrls: ['./otherlist-type-edit.component.scss']
})
export class OtherlistTypeEditComponent extends BaseEditComponent {

  loading: boolean = false;
  override entityTable = "SYS_OTHER_LIST_TYPE";
  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  scaleOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              hidden : true
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_OTHERLIST_TYPE_CODE,
              field: 'code',
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
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_OTHERLIST_TYPE_NAME,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              dropdownOptions$: this.scaleOptions$,
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
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_OTHERLIST_TYPE_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            },
          ]
        ]
      }
    ];

  constructor(
    public override dialogService: DialogService,
    private slrService: SysOrtherlistEditService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_ORTHERLIST_TYPE_EDIT;

    this.crud = {
      c: api.SYS_OTHERLIST_TYPE_CREATE,
      r: api.SYS_OTHERLIST_TYPE_READ,
      u: api.SYS_OTHERLIST_TYPE_UPDATE,
      d: api.SYS_OTHERLIST_TYPE_DELETE_IDS,
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
