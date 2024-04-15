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
import { HuProvinceEditService } from "./hu-province-edit.services";

setCulture("en");

@Component({
  selector: 'app-hu-province-edit',
  templateUrl: './hu-province-edit.component.html',
  styleUrls: ['./hu-province-edit.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class HuProvinceEditComponent extends BaseEditComponent {
  sysOtherlistGetByIdObject$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi = api.HU_NATION_READ;
  loading: boolean = false;
  subsctiptions: Subscription[] = [];
  override entityTable = "HU_PROVINCE";
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
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_PROVINCE_CODE,
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
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_NATION_NAME,
              field: 'nationId',
              value: '',
              getByIdObject$: this.sysOtherlistGetByIdObject$,
              getByIdApi: this.sysOtherlistGetByIdApi,
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              dropdownOptions$: this.scaleOptions$,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_PROVINCE_NAME,
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
              label: EnumTranslateKey.UI_COMPONENT_LABEL_PROVINCE_NOTE,
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
    private slrService: HuProvinceEditService,
    private CommonHttpRequestService :CommonHttpRequestService
  ) {

    super(dialogService);
    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_PROVINCE_EDIT;

    this.crud = {
      c: api.HU_PROVINCE_CREATE,
      r: api.HU_PROVINCE_READ,
      u: api.HU_PROVINCE_UPDATE,
      d: api.HU_PROVINCE_DELETE,
    };

  }

  ngOnInit(): void {

    this.loading = true;
    this.slrService.getAllNation()
      .pipe(
        map((x: any) => {
          if (x.ok && x.status === 200) {
            const options: { value: number; text: string; }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            return options;
          } else {
            return [];
          }
        })
      )
      .subscribe(response => {
        this.scaleOptions$.next(response);
        this.loading = false;
      })
  }

  getCode(): Observable<any> {
    return this.CommonHttpRequestService.makeGetRequest('getCode', '/api/HuProvinceList/CreateNewCode');
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
