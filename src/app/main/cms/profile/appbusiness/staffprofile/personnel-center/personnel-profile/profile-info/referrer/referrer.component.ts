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
interface IReferrer{
  presenter : string;
  presenterPhoneNumber : string;
  presenterAddress : string;
}
@Component({
  selector: 'app-referrer',
  templateUrl: './referrer.component.html',
  styleUrls: ['./referrer.component.scss']
})
export class ReferrerComponent  extends BaseComponent implements OnInit {

  @ViewChild('container') container!: ElementRef;

  getPoliticalBackgroundApi: api = api.HU_EMPLOYEE_CV_GET_PRESENTER;
  data!: IReferrer;
  boundSuccess!: boolean; 
  sections: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            labelFlexSize: 6,
            flexSize: 6,
            field: 'presenter',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PRESENTER,
          },
          
        ],
        [
          {
            labelFlexSize: 6,
            flexSize: 6,
            field: 'presenterPhoneNumber',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PHONE_NUMBER,
          }
        ],
        [
          {
            labelFlexSize: 6,
            flexSize: 6,
            field: 'presenterAddress',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PRESENTER_ADDRESS,
          }
        ]
        
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
