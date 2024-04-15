import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { ICoreDropdownOption } from 'src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component';
import { ICoreFormSection, EnumFormBaseContolType } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import {
  ICorePageEditCRUD,
  ICorePageEditColumnComposition,
} from 'src/app/libraries/core-page-edit/core-page-edit.component';
import { PeriodStandardEditService } from 'src/app/main/cms/attendance/applist/periodstandard/edit/periodstandard.edit.service';
import { DialogService } from 'src/app/services/dialog.service';
import { InsRegimesEditService } from '../../ins-regimes/edit/insregimes.edit.service';

@Component({
  selector: 'cms-profile-insgroup-edit',
  templateUrl: './insgroup-edit.component.html',
  styleUrls: ['./insgroup-edit.component.scss'],
})
export class InsGroupEditComponent extends BaseEditComponent {
  override entityTable = 'INS_GROUP';

  subsctiptions: Subscription[] = [];
  loading: boolean = false;

  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_GROUP_ID,
            field: 'id',
            value: '',
            hidden: true,
            controlType: EnumFormBaseContolType.TEXTBOX,
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_GROUP_CODE,
            field: 'code',
            value: '',
            readonly: true,
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_GROUP_NAME,
            field: 'name',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_GROUP_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_CODE,
            field: 'isActive',
            value: 'true',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            hidden: true,
            readonly: true,
          },
        ],
      ],
    },
  ];

  constructor(public override dialogService: DialogService, private irsServices: InsRegimesEditService) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_INS_GROUP_EDIT;

    this.crud = {
      c: api.INS_GROUP_CREATE,
      r: api.INS_GROUP_READ,
      u: api.INS_GROUP_UPDATE,
      d: api.INS_GROUP_DELETE_IDS,
    };
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.irsServices
        .CreateNewCodeInsGroup()
        .pipe(
          map((f: any) => {
            let options: string = '';
            options = f.body.innerBody.code;
            return options;
          }),
        )
        .subscribe((response: any) => {
          console.log(this.form.get('code'));
          if (this.form.get('code')?.value == '') this.form.get('code')?.patchValue(response);
        }),
    );
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnInit(): void {}
}
