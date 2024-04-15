import { Component, ViewEncapsulation } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { setCulture } from "@syncfusion/ej2-base";
import { BehaviorSubject, map , Subscription, Observable} from "rxjs";
import { api } from "src/app/constants/api/apiDefinitions";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { BaseEditComponent } from "src/app/libraries/base-edit/base-edit/base-edit.component";
import { ICoreDropdownOption } from "src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component";
import { ICoreFormSection, EnumFormBaseContolType } from "src/app/libraries/core-form/core-form/enum-interfaces";
import { ICorePageEditCRUD } from "src/app/libraries/core-page-edit/core-page-edit.component";
import { DialogService } from "src/app/services/dialog.service";
import { AppService } from 'src/app/services/app.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

setCulture("en");

@Component({
  selector: 'app-hu-nation-edit',
  templateUrl: './hu-nation-edit.component.html',
  styleUrls: ['./hu-nation-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HuNationEditComponent extends BaseEditComponent {

  loading: boolean = false;
  subsctiptions: Subscription[] = [];
  override entityTable = "HU_NATION";
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
              hidden: true,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text'
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_NATION_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: true,
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
              label: EnumTranslateKey.UI_COMPONENT_LABEL_NATION_NAME,
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
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_NATION_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            }
          ]
        ]
      }
    ];

  constructor(
    public override dialogService: DialogService,
    private appService: AppService ,
    private CommonHttpRequestService :CommonHttpRequestService
  ) {

    super(dialogService);
    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_NATION_EDIT;

    this.crud = {
      c: api.HU_NATION_CREATE,
      r: api.HU_NATION_READ,
      u: api.HU_NATION_UPDATE,
      d: api.HU_NATION_DELETE,
    };

  }

  ngOnInit(): void {
  }

  getCode(): Observable<any> {
    return this.CommonHttpRequestService.makeGetRequest('getCode', '/api/HuNationList/CreateNewCode');
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.getCode()
        .pipe(
          map((f: any) => {
            let options: string = "";
            options = f.body.innerBody.code;
            return options;
          })
        )
        .subscribe((response :any) => {
          console.log(this.form.get('code'));
          if(this.form.get('code')?.value == "")
            this.form.get('code')?.patchValue(response);
        })
    );
  }
  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
