import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, isDevMode } from '@angular/core';
import { ProfileInfoService } from '../profile-info.service';
import { PersonnelCenterService } from '../../../personnel-center.service';
import { AppService } from 'src/app/services/app.service';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { ResponseService } from 'src/app/services/response.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { EnumCoreViewItemType, ICoreViewSection } from 'src/app/libraries/core-page-view/enum-interfaces';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { api } from 'src/app/constants/api/apiDefinitions';
import { filter } from 'rxjs';
import { alertOptions } from 'src/app/constants/alertOptions';
interface IBacsic {
  id: number;
  employeeCode: string;
  positionDirectManager: string;
  company: string;
  directManager: string;
  orgName: string;
  objectEmployee: string;
  position: string;
  workingAddress: string;
}
@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent extends BaseComponent implements OnInit {

  @ViewChild('container') container!: ElementRef;
  getBasicApi: api = api.HU_EMPLOYEE_CV_GET_BASIC;
  data!: IBacsic;
  boundSuccess!: boolean; 
  sections: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            // mã nhân viên
            labelFlexSize: 0,
            flexSize: 4,
            field: 'employeeCode',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CODE,
          },
          {
            // mã chấm công
            labelFlexSize: 0,
            flexSize: 4,
            field: 'itimeId',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TIME_KEEPING,
          },
          {
            // tên gọi khác
            labelFlexSize: 0,
            flexSize: 4,
            field: 'otherName',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_OTHER_NAME,
          }
        ],
        [
          {
            // vị trí chức danh
            labelFlexSize: 0,
            flexSize: 4,
            field: 'position',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_POSITION,
          },
          {
            // chức danh quản lý trực tiếp
            labelFlexSize: 0,
            flexSize: 4,
            field: 'positionDirectManager',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_POSITION_DIRECT_MANAGER,
          },
          {
            // quản lý trực tiếp
            labelFlexSize: 0,
            flexSize: 4,
            field: 'directManager',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_DIRECT_MANAGER,
          }          
        ],
        [
          {
            // phòng ban
            labelFlexSize: 0,
            flexSize: 4,
            field: 'orgName',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_ORGNAME,
          },
          {
            // công ty
            labelFlexSize: 0,
            flexSize: 4,
            field: 'company',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_COMPANY,
          },
          {
            // nơi làm việc
            labelFlexSize: 0,
            flexSize: 4,
            field: 'workingAddress',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_WORKING_ADDRESS,
          },
        ],
        [
          {
            // đối tượng nhân viên
            labelFlexSize: 0,
            flexSize: 4,
            field: 'objectEmployee',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_OBJECT,
          },
          {
            // đối tượng không giao kết hợp đồng
            labelFlexSize: 0,
            flexSize: 4,
            field: 'isNotContract',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_IS_NOT_CONTRACT_VIEW,
          },
        ],
      ]
    }
  ]

  constructor(
    private profileInfoService: ProfileInfoService,
    public override mls: MultiLanguageService,
    public personnelCenterService: PersonnelCenterService,
    private appService: AppService,
    private alertService: AlertService,
    private responseService: ResponseService,
  ) { 
    super(mls)
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    );
    this.subscriptions.push( // <== outer push
      this.personnelCenterService.employee$.pipe(filter(cv => !!cv)).subscribe(x => {
        this.subscriptions.push( // <== inner push
          this.appService.get(this.getBasicApi + "/" + x.id).subscribe(res => {
            if (res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200) {
                this.data = body.innerBody;
                // bind data to the items the sections
                this.sections.map(section => {
                  section.rows.map(row => {
                    row.map(item => {
                      item.value = (this.data as any)[item.field]
                    })
                  })
                })

                this.boundSuccess = true;;
              } else {
                if (isDevMode()) {
                  //this.responseService.resolve(body);
                }
              }
            } else {
              if (isDevMode()) {
                this.alertService.error(this.getBasicApi + "/" + x.id + ' failed!', alertOptions)
              }
            }
          })
        )
      })
    )
  }

}
