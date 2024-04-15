import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { ICoreDropdownOption } from 'src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component';
import { DialogService } from 'src/app/services/dialog.service';
import { PersonnelCenterService } from '../../../../personnel-center.service';
import { AppService } from 'src/app/services/app.service';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumFormBaseContolType, ICoreFormSection } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { ICorePageEditCRUD } from 'src/app/libraries/core-page-edit/core-page-edit.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EnumCoreFormControlSeekerSourceType } from 'src/app/libraries/core-form-control-seeker/EnumCoreFormControlSeekerSourceType';

@Component({
  selector: 'app-basic-edit',
  templateUrl: './basic-edit.component.html',
  styleUrls: ['./basic-edit.component.scss']
})
export class BasicEditComponent extends BaseEditComponent implements OnInit, OnDestroy, AfterViewInit {

  override entityTable = "HU_EMPLOYEE_CV";

  subscriptions: Subscription[] = []
  orgGetById$ = new BehaviorSubject<any>(null);
  orgGetByIdApi = api.HU_ORGANIZATION_READ;

  positionGetByIdObject$ = new BehaviorSubject<any>(null);
  positionGetByIdApi = api.HU_POSITION_READ;

  objectEmployeeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  objectEmployeeGetByIdObject$ = new BehaviorSubject<any>(null);
  objectEmployeeGetByIdApi = api.SYS_OTHERLIST_READ;
  captionCode!: EnumTranslateKey.UI_COMPONENT_TITLE_GENERAL_INFO_EDIT;
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
              hidden : true
            },
          ],
          [
            {
              // mã nhân viên
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CODE,
              field: 'employeeCode',
              value: "",
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            {
              // mã chấm công
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TIME_KEEPING,
              field: 'itimeId',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              // tên gọi khác
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_OTHER_NAME,
              field: 'otherName',
              value: "",
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              // disabled: true
            }
          ],
          [
            {
              // vị trí/chức danh
              flexSize: 4,
              field: 'positionId',
              getByIdObject$: this.positionGetByIdObject$,
              getByIdApi: this.positionGetByIdApi,
              objectList$: new BehaviorSubject<any[]>([]),
              boundFrom: 'id',
              shownFrom: 'name',
              alsoBindTo: [
              { takeFrom: 'empLmName', bindTo: 'directManager' },
              { takeFrom: 'lmJobName', bindTo: 'positionDirectManager' }],
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_TITLE_POSITION,
              controlType: EnumFormBaseContolType.SEEKER,
              seekerSourceType: EnumCoreFormControlSeekerSourceType.POSITION_SEEK,
              type: 'string',
              value: '',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ],
              readonly : true,
              disabled: true,
            },
            {
              // chức danh quản lý trực tiếp
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_DIRECT_MANAGEMENT_POSITION,
              field: 'positionDirectManager',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              disabled: true,
            },
            {
              // quản lý trực tiếp
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_DIRECT_MANAGEMENT,
              field: 'directManager',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              disabled: true,
            }
          ],
          [
            {
              // phòng ban
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_ORGNAME,
              field: 'orgId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,
              objectList$: new BehaviorSubject<any[]>([]),

              /* 
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
               */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,
              getByIdObject$: this.orgGetById$,
              getByIdApi: this.orgGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              alsoBindTo: [
              { takeFrom: 'companyNameVn', bindTo: 'company' },
              {takeFrom : 'address', bindTo : 'workingAddress'},
              { takeFrom: 'orgId', bindTo: 'orgId' }],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'text',
              readonly: true,
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              // công ty
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_COMPANY,
              field: 'company',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              disabled: true,
            },
            {
              // nơi làm việc
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_WORKING_ADDRESS,
              field: 'workingAddress',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              disabled: true,
            }
          ],
          [
            {
              // đối tượng nhân viên
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_OBJECT,
              field: 'objectEmployeeId',
              value: '',
              getByIdObject$: this.objectEmployeeGetByIdObject$,
              getByIdApi: this.objectEmployeeGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.objectEmployeeOptions$,
              controlType: EnumFormBaseContolType.DROPDOWN,
              readonly : false,
              disabled: false,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              // bị ẩn
              // đối tượng không giao kết hợp đồng
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_IS_NOT_CONTRACT_VIEW,
              field: 'isNotContract',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              // disabled: true,
              // hidden: true,
            },
            {
              // đối tượng không giao kết hợp đồng
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_IS_NOT_CONTRACT_VIEW,
              field: 'isNotContractStr',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              disabled: true,
              hidden: true,
            },
            {
              // check disable
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_IS_NOT_CONTRACT_VIEW,
              field: 'disableIsNotContract',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              disabled: true,
              hidden: true,
            },
            
          ]
        ]
      },
    ];
  constructor(
    public override dialogService: DialogService,
    private personnelCenterService: PersonnelCenterService,
    private appService: AppService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_GENERAL_INFO_EDIT;

    this.crud = {
      r: api.HU_EMPLOYEE_CV_GENERAL_INFO_READ,
      u: api.HU_EMPLOYEE_CV_GENERAL_INFO_UPDATE,
    };

  }

  ngOnInit(): void {
    
    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'OBJECT_EMPLOYEE').subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            const newObjectEmployeeOptions: ICoreDropdownOption[] = [];
            body.innerBody.map((item: any) => {
              newObjectEmployeeOptions.push({
                value: item.id,
                text: item.name
              })
            });
            this.objectEmployeeOptions$.next(newObjectEmployeeOptions);
          }
        }
      })
      
    )
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    console.log(this.form)
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.personnelCenterService.reloadFlag$.next(true);
    this.subscriptions.map(x => x?.unsubscribe());
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.subscriptions.push(
        this.form.get('disableIsNotContract')?.valueChanges.subscribe(x => {
          if(x == true) {
            this.form.controls['isNotContract']?.disable();
            this.sections.map(section => {
              section.rows.map(row => {
                row.map(item => {
                  // item.value = this.data[item.field]
                  if(item.field == 'isNotContract') {
                    item.disabled = true;
                  }
                })
              })
            })
          }
        })!
      )
    })
  }

}
