import { AfterViewInit, Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { api } from 'src/app/constants/api/apiDefinitions';
import {
  EnumFormBaseContolType,
  ICoreFormSection,
} from 'src/app/libraries/core-form/core-form/enum-interfaces';
import {
  ICorePageEditCRUD,
  ICorePageEditColumnComposition,
} from 'src/app/libraries/core-page-edit/core-page-edit.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { DialogService } from 'src/app/services/dialog.service';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { ICoreDropdownOption } from 'src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component';
import { InsTypeService } from './ins-type-service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-ins-type-edit',
  templateUrl: './ins-type-edit.component.html',
  styleUrls: ['./ins-type-edit.component.scss'],
})
export class InsTypeEditComponent extends BaseEditComponent {
  override entityTable = 'INS_TYPE';
  captionCode!: EnumTranslateKey;
  subsctiptions: Subscription[] = [];
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  typeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  typeGetByIdObject$ = new BehaviorSubject<any>(null);
  typeGetByIdApi = api.SYS_OTHERLIST_READ;

  insRegionGetByIdObject$ = new BehaviorSubject<any>(null);
  insRegionGetByIdApi = api.SYS_OTHERLIST_READ;
  insregionOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_LANGUAGE_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TYPE_TYPE_NAME,
            field: 'typeId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.typeGetByIdObject$,
            getByIdApi: this.typeGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.typeOptions$,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'minLength',
                validator: Validators.min(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TYPE_CODE,
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
              },
            ],
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TYPE_NAME,
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
              {
                name: 'minLength',
                validator: Validators.minLength(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
      ],
    },
  ];
  loading: boolean = false;
  constructor(
    public override dialogService: DialogService,
    private insTypeService: InsTypeService,
    private appService: AppService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_INS_TYPE_EDIT;

    this.crud = {
      c: api.INS_TYPE_CREATE,
      r: api.INS_TYPE_READ_BY,
      u: api.INS_TYPE_UPDATE,
      d: api.INS_TYPE_DELETE_IDS,
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
  ngOnInit(): void {
    this.loading = true;
    this.subsctiptions.push(
      this.insTypeService
        .getListInsType()
        .pipe(
          map((f: any) => {
            const options: { value: number; text: string }[] = [];
            f.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
              });
            });
            return options;
          })
        )
        .subscribe((response) => {
          this.typeOptions$.next(response);
          this.loading = false;
        })

    );
  }

}
