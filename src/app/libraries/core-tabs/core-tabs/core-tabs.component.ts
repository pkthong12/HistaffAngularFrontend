import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { LayoutService } from 'src/app/services/layout.service';

export interface ICoreTabsToolItemEventData {
  tabIndex: number;
  code: string;
}

@Component({
  selector: 'core-tabs',
  templateUrl: './core-tabs.component.html',
  styleUrls: ['./core-tabs.component.scss']
})
export class CoreTabsComponent extends BaseComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() headers!: string[];
  @Input() contents!: TemplateRef<any>[];
  @Input() headerTools!: any[];
  @Input() height!: number;
  @Input() headerLineHeight!: number;
  @Output() onHeaderClick = new EventEmitter<any>();
  @Output() onToolItemClick = new EventEmitter<ICoreTabsToolItemEventData>();

  activeIndex: number = 0;

  contentHeight!: number;

  constructor(
    public override mls: MultiLanguageService,
    private layoutService: LayoutService
  ) {
    super(mls);
  }
  @ViewChild('container') container!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['height']) {
      this.contentHeight = changes['height'].currentValue - (this.headerLineHeight || this.layoutService.coreTabsHeaderLineHeight)
    }
  }

  onClick(index: number) {
    this.activeIndex = index;
    this.onHeaderClick.emit({
      index,
      header: this.headers[index]
    })
  }

  onToolItemClickLocal(code: string) {
    this.onToolItemClick.emit({ tabIndex: this.activeIndex, code })
  }

  private resize(): void {
    if (!!!this.height) {
      const containerHeight = this.layoutService.contentContainerHeight$.value;
      const corePageListHeaderHeight = Number(getComputedStyle(document.documentElement).getPropertyValue('--size-core-page-header-height').replace('px', ''))
      const coreTabHeaderHeight = Number(getComputedStyle(document.documentElement).getPropertyValue('--size-core-tabs-header-height').replace('px', ''))
      const blockCellSpacing = Number(getComputedStyle(document.documentElement).getPropertyValue('--size-layout-block-cell-spacing').replace('px', ''))
      const coreTabHeight = Number(getComputedStyle(document.documentElement).getPropertyValue('--size-core-tabs-height').replace('px', ''))
      this.container.nativeElement.style.setProperty('--height-core-tab-content', 
        containerHeight - coreTabHeaderHeight - corePageListHeaderHeight - blockCellSpacing * 2 - coreTabHeight + 'px')
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.resize()
      if (!!!this.headerLineHeight) this.headerLineHeight = this.layoutService.coreTabsHeaderLineHeight;
      this.contentHeight = this.height - this.headerLineHeight;
    })
  }

}
