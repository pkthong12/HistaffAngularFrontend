import {
  Component,
  ViewEncapsulation,
} from "@angular/core";
import { BehaviorSubject, Subscription, debounceTime, distinctUntilChanged } from "rxjs";
import { setCulture } from "@syncfusion/ej2-base";
import {
  FilterService,
  VirtualScrollService,
} from "@syncfusion/ej2-angular-grids";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseEditComponent } from "src/app/libraries/base-edit/base-edit/base-edit.component";
import { api } from "src/app/constants/api/apiDefinitions";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { ICoreDropdownOption } from "src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component";
import { ICoreFormSection, EnumFormBaseContolType } from "src/app/libraries/core-form/core-form/enum-interfaces";
import { ICorePageEditCRUD } from "src/app/libraries/core-page-edit/core-page-edit.component";
import { DialogService } from "src/app/services/dialog.service";
import { ICoreChecklistOption } from "src/app/libraries/core-checklist/core-checklist/core-checklist.component";
import { IFormatedResponse } from "src/app/interfaces/IFormatedResponse";
import { AppService } from "src/app/services/app.service";
setCulture("en");

@Component({
  selector: "app-job-edit",
  templateUrl: "./job-edit.component.html",
  styleUrls: ["./job-edit.component.scss"],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class JobEditComponent extends BaseEditComponent {


  loading: boolean = false;
  override entityTable = "HU_JOB";
  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  groupJobOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  subsctiptions: Subscription[] = [];

  groupJobGetByIdObject$ = new BehaviorSubject<any>(null);
  groupJobGetByIdApi = api.SYS_OTHERLIST_READ;

  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              hidden: true
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_IS_ACTIVE,
              field: 'actflg',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              hidden: true
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_CODE,
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
                {
                  name: 'pattern',
                  validator: Validators.pattern('[qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0-9\-]+'),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_JOB_FIXED_LENGTH,
                },
              ],
              hidden: true,
              readonly: true,
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_NAMEVN,
              field: 'nameVnNoCode',
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_NAMEEN,
              field: 'nameEn',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_PURPOSE,
              field: 'purpose',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
              textareaRows: 4
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_JOB_FAMILY,
              field: 'jobFamilyId',
              value: '',
              getByIdObject$: this.groupJobGetByIdObject$,
              getByIdApi: this.groupJobGetByIdApi,
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.groupJobOptions$,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            }
          ],

          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
              textareaRows: 4
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_ORDERNUM,
              field: 'ordernum',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            }
          ],
        ]
      }
    ];
  scaleOptions$: BehaviorSubject<ICoreDropdownOption[]> | undefined;

  constructor(
    public override dialogService: DialogService,
    private appService: AppService // CoreService is DEPRECATED!!!
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_JOB_EDIT;

    this.crud = {
      c: api.HU_JOB_CREATE,
      r: api.HU_JOB_READ,
      u: api.HU_JOB_UPDATE,
      d: api.HU_JOB_DELETE,
    };

  }

  ngOnInit(): void {
    this.loading = true;
    this.subsctiptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "HU_JOB_FAMILY")
        .subscribe((res: any) => {

          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {


              const options: { value: number | null; text: string; }[] = [];
              options.push({
                value: Number(),
                text: ''
              })
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name
                })
              })
              this.groupJobOptions$.next(options);
            }
          }
        })
    )
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    setTimeout(() => {
      if (this.form.get('id')?.value && !!this.form.get('actflg')?.value && this.form.get('actflg')?.value == "A") {
        this.form.get('code')?.disable();
        this.form.get('nameVnNoCode')?.disable();
        this.form.get('nameEn')?.disable();
        this.form.get('jobFamilyId')?.disable();
        this.form.get('purpose')?.disable();
        this.form.get('note')?.disable();
        this.form.get('ordernum')?.disable();
      }
    }, 1500)

    const reg = /[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+/;
    this.form.get('nameVnNoCode')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
      if (!!x) {
        var codeNew = (x.split(' ').map((x1: string) => x1.charAt(0)).join('')).toUpperCase();
        codeNew = codeNew.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "a");
        codeNew = codeNew.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "e");
        codeNew = codeNew.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
        codeNew = codeNew.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "o");
        codeNew = codeNew.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "u");
        codeNew = codeNew.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
        codeNew = codeNew.replace(/Đ/g, "D");
        this.form.get('code')?.setValue(codeNew);
      } else {
        this.form.get('code')?.setValue("");
      }
    })!
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
