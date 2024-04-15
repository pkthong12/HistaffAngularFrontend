import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { ISearchItem } from 'src/app/interfaces/IQueryListRequest';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { LayoutService } from 'src/app/services/layout.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { RoutingService } from 'src/app/services/routing.service';
@Component({
  selector: 'app-in-memory',
  templateUrl: './in-memory.component.html',
  styleUrls: ['./in-memory.component.scss']
})
export class InMemoryComponent extends BaseComponent implements OnInit, AfterViewInit {

  title!: EnumTranslateKey;

  tabHeaders: string[] = [
    EnumTranslateKey.UI_IN_MEMORY_OBJECT_FUNCTION_ACTIONS, // make use of an existing key
    EnumTranslateKey.UI_USER_GROUP_PERMISSION_ORG_UNIT_TAB, // make use of an existing key
  ]

  tabsHeight!: number;

  tab1Columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_PATH,
      field: 'path',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_PATH_FULL_MATCH,
      field: 'pathFullMatch',
      type: 'boolean',
      align: 'left',
      width: 150,
    },
  ]

  tab1Data!: any[];
  tab1FilteredData!: any[];

  tableHeight!: number;

  constructor(
    public layoutService: LayoutService,
    public override mls: MultiLanguageService,
    private routingService: RoutingService
  ) {
    super(mls);
    this.title = EnumTranslateKey.UI_COMPONENT_TITLE_IN_MEMORY;
  }

  override ngOnInit(): void {

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

    this.layoutService.contentContainerHeight$.subscribe(x => {
      this.tabsHeight = x - this.layoutService.corePageHeaderHeight - this.layoutService.basicSpacing * 2;
      this.tableHeight = this.tabsHeight - this.layoutService.coreTabsHeaderLineHeight - this.layoutService.basicSpacing;
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.routingService.fullFunctions$.subscribe(fs => {
          this.tab1Data = fs;
          this.tab1FilteredData = fs;
        })
      )
    })
  }

  onTab1Searching(e: ISearchItem[]): void {

    const loopFilter = (x: ISearchItem, current: any[]) => {
      return current.filter(i => i[x.field].toString().toUpperCase().indexOf(x.searchFor.toUpperCase())>=0)
    }

    let newData: any[] = JSON.parse(JSON.stringify(this.tab1Data));
    e.map(x => {
      newData = loopFilter(x, newData)
    })

    this.tab1FilteredData = newData;

  }

  onTab1ColumnCaptionClick(e: any): void {
    
  }

}
