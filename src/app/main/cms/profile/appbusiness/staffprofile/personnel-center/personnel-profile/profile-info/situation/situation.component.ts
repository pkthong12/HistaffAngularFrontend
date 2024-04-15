import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, isDevMode } from '@angular/core';
import { ProfileInfoService } from '../profile-info.service';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { alertOptions } from 'src/app/constants/alertOptions';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { filter } from 'rxjs';
import { ResponseService } from 'src/app/services/response.service';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { AppService } from 'src/app/services/app.service';
import { PersonnelCenterService } from '../../../personnel-center.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { EnumCoreViewItemType, ICoreViewSection } from 'src/app/libraries/core-page-view/enum-interfaces';
import { api } from 'src/app/constants/api/apiDefinitions';

interface ISituation {
  mainIncome : string; //	Lương thu nhập chính của gia đình
  otherSources : string; //Các nguồn khác
  landGranted : string; //Đất được cấp(m2)
  taxGrantedHouse : string; //Loại nhà được cấp thuế
  totalArea : string; //Tổng diện tích Áp dụng(m2)
  selfPurchaseLand : string; //Đất tự mua(m2)
  selfBuildHouse : string; //Loại nhà tự mua tự xây
  totalAppArea : string; //Tổng diện tích Áp dụng(m2)
  landForProduction : string; //Đất sản xuất kinh doanh(m2)
  additionalInformation : string; //Thông tin bổ sung hoàn cảnh kinh tế (gia đình)
}
@Component({
  selector: 'app-situation',
  templateUrl: './situation.component.html',
  styleUrls: ['./situation.component.scss']
})
export class SituationComponent  extends BaseComponent implements OnInit {

  @ViewChild('container') container!: ElementRef;

  getPoliticalBackgroundApi: api = api.HU_EMPLOYEE_CV_GET_SITUATION;
  data!: ISituation;
  boundSuccess!: boolean; 
  sections: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'mainIncome',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_MAIN_INCOME,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'otherSources',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_OTHER_SOURCES,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'landGranted',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_LAND_GRANTED,
          }
          
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'taxGrantedHouse',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_TAX_GRANTED_HOUSE,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'totalArea',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_TOTAL_AREA,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'selfPurchaseLand',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_SELF_PURCHASED_LAND,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'selfBuildHouse',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_SELF_BUILD_HOUSE,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'totalAppArea',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_TOTAL_APP_AREA,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'landForProduction',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_LAND_FOR_PRODUCTION,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 12,
            field: 'additionalInformation',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_ADDITIONAL_INFOMATION,
          }
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
      this.personnelCenterService.employeeCv$.pipe(filter(cv => !!cv)).subscribe(x => {
        this.subscriptions.push( // <== inner push
          this.appService.get(this.getPoliticalBackgroundApi + "/" + x.id).subscribe(res => {
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
                this.alertService.error(this.getPoliticalBackgroundApi + "/" + x.id + ' failed!', alertOptions)
              }
            }
          })
        )
      })
    )
  }
  
}
