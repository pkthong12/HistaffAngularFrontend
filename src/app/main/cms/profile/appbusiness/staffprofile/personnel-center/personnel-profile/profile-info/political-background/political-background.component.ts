import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, isDevMode } from '@angular/core';
import {  ProfileInfoService } from '../profile-info.service';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumCoreViewItemType, ICoreViewSection } from 'src/app/libraries/core-page-view/enum-interfaces';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { PersonnelCenterService } from '../../../personnel-center.service';
import { AppService } from 'src/app/services/app.service';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { ResponseService } from 'src/app/services/response.service';
import { filter } from 'rxjs';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { alertOptions } from 'src/app/constants/alertOptions';


interface IPoliticalBackground{
  prisonNote : string;
  familyDetail : string;
}
@Component({
  selector: 'app-political-background',
  templateUrl: './political-background.component.html',
  styleUrls: ['./political-background.component.scss']
})
export class PoliticalBackgroundComponent extends BaseComponent implements OnInit  {

  @ViewChild('container') container!: ElementRef;
  getPoliticalBackgroundApi: api = api.HU_EMPLOYEE_CV_GET_POLITICAL_BACKGROUND;
  data!: IPoliticalBackground;
  boundSuccess!: boolean; 
  sections: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            labelFlexSize: 0,
            flexSize: 12,
            field: 'prisonNote',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_NOTE_PRISON,
          },
          
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 12,
            field: 'familyDetail',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FAMILY_DETAIL,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 12,
            field: 'yellowFlag',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_IS_YELLOW_FLAG,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 12,
            field: 'relations',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_RELATIONS,
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
