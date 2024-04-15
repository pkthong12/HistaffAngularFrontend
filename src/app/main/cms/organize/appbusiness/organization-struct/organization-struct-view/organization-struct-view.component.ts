import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { AppService } from 'src/app/services/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { api } from 'src/app/constants/api/apiDefinitions';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { EnumCoreViewItemType, ICoreViewSection } from 'src/app/libraries/core-page-view/enum-interfaces';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { OrganizationStructService } from '../organization-struct.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-organization-struct-view',
  templateUrl: './organization-struct-view.component.html',
  styleUrls: ['./organization-struct-view.component.scss']
})
export class OrganizationStructViewComponent extends BaseComponent implements OnInit {

  getByIdApi =  api.HU_ORGANIZATION_READ;
  data: any;
  boundSuccess: boolean = false;
  loading!: boolean;
  title: EnumTranslateKey = EnumTranslateKey.ADD_ARREARS_INF
  sections: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            labelFlexSize: 2,
            flexSize: 2,
            field: 'code',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_CODE,
          },
          {
            labelFlexSize: 2,
            flexSize: 2,
            field: 'foundationDate',
            controlType: EnumCoreViewItemType.TEXT,
            pipe: EnumCoreTablePipeType.DATE,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_FOUNDATION_DATE,
          },
          {
            labelFlexSize: 2,
            flexSize: 2,
            field: 'orgLevelName',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_ORG_LEVEL_ID,
          },
        ],
        [
          {
            labelFlexSize: 2,
            flexSize: 2,
            field: 'companyNameVn',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_COMPANY_NAME_VN,
          },
          {
            labelFlexSize: 2,
            flexSize: 2,
            field: 'dissolveDate',
            controlType: EnumCoreViewItemType.TEXT,
            pipe: EnumCoreTablePipeType.DATE,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_DISSOLVE_DATE,
          },
          {
            labelFlexSize: 2,
            flexSize: 2,
            field: 'orderNum',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_ORG_ORDER_NUM,
          },
          // {
          //   labelFlexSize: 2,
          //   flexSize: 10,
          //   field: 'name',
          //   controlType: EnumCoreViewItemType.TEXT,
          //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_NAME,
          // }
        ],
        [
          {
            labelFlexSize: 2,
            flexSize: 2,
            field: 'companyNameEn',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_COMPANY_NAME_EN,
          },
          {
            labelFlexSize: 2,
            flexSize: 2,
            field: 'headPosName',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_HU_ORGANIZATION_HEAD_OF_UNIT_NAME,
          },
          {
            labelFlexSize: 2,
            flexSize: 2,
            field: 'address',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_ADDRESS,
          },
        ],
        [
          {
            labelFlexSize: 2,
            flexSize: 2,
            field: 'parentName',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_PARENT_ID,
          },
          {
            labelFlexSize: 2,
            flexSize: 2,
            field: 'headEmployeeNames',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_HU_ORGANIZATION_HEAD_OF_UNIT_EMPLOYEE_NAME,
          },
          {
            labelFlexSize: 2,
            flexSize: 2,
            height: 100,
            field: 'note',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_ORG_NOTE,
          }
        ],
      ]
    }
  ]

  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private organizationStructService: OrganizationStructService
  ) { 
    super(mls)
    this.subscriptions.push(
      this.route.paramMap.pipe(
        filter(x => !!x.get('id')!)
      ).subscribe(x => {
        if (!!!this.organizationStructService.currentOrgIds$.value.length) {
          this.organizationStructService.currentOrgIds$.next([Number(atob(x.get('id')!))])
        }
      })
    ) 
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe(x => {
        console.log("this.route.params.subscribe", x)

        let id: string;
        id = Number(atob(x['id'])).toString();
        this.organizationStructService.currentOrg = id;
        if (id !== '0') {
          this.loading = true;
          this.subscriptions.push(
            this.appService.get(this.getByIdApi + "?id=" + id).subscribe((x) => {
              const body: IFormatedResponse = x.body;
              if ((body.statusCode = 200)) {
                this.data = body.innerBody;
                this.title = this.data.name
                this.organizationStructService.currentViewFormData = this.data

                // bind data to the items the sections
                this.sections.map(section => {
                  section.rows.map(row => {
                    row.map(item => {
                      item.value = this.data[item.field]
                    })
                  })
                })

                this.boundSuccess = true;

              }

              this.loading = false;
            })
          );
        }
      })

    )

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
  }

}
