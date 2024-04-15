import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { IPagination } from 'src/app/interfaces/IQueryListRequest';

@Component({
  selector: 'core-scroll-lazy',
  templateUrl: './core-scroll-lazy.component.html',
  styleUrls: ['./core-scroll-lazy.component.scss']
})
export class CoreScrollLazyComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() visibleOptions!: any[];
  @Input() itemTemplate!: TemplateRef<any>;
  @Input() height!: number;
  @Input() totalHeight!: number;
  @Input() childHeight!: number;
  @Input() search!: number;

  @Output() onPagination = new EventEmitter<IPagination | undefined>();

  renderAhread: number = 20;
  scrollTop: number = 0;
  offsetY!: number;

  scrollStream$ = new Subject<any>();

  subscriptions: Subscription[] = [];

  constructor() {  }

  onScrollLoading(e: any): void {
    this.scrollStream$.next(e);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalHeight']) {
      this.scrollTop = 0;
      this.calculate();
    }
    if (changes['height']) {
      if (!!changes['height'].currentValue) this.calculate()
    }
    if (changes['localOptions']) {
      console.log("localOptions", changes['localOptions'].currentValue)
    }
    if (changes['totalHeight']) {
      console.log("totalHeight", changes['totalHeight'].currentValue)
      if (!!changes['totalHeight'].currentValue) this.calculate()
    }
  }

  calculate(): IPagination | undefined {
    if (!!!this.height || !!!this.visibleOptions.length) return undefined;

    let startNode = Math.floor(this.scrollTop / this.childHeight) - this.renderAhread;
    startNode = Math.max(0, startNode);
    let visibleNodeCount = Math.ceil(this.height / this.childHeight) + 2 * this.renderAhread;
    //visibleNodeCount = Math.min(this.totalHeight / this.visibleOptions.length - startNode, visibleNodeCount);
    /* Fix bug 2023-11-09 09:00AM */
    visibleNodeCount = Math.ceil(Math.min(this.totalHeight / this.visibleOptions.length - startNode, visibleNodeCount));
    this.offsetY = startNode * this.childHeight;

    console.log("visibleNodeCount", visibleNodeCount)
    console.log("this.renderAhread", this.renderAhread)

    return {
      skip: startNode,
      take: visibleNodeCount + this.renderAhread * 2
    }
  }

  ngOnInit(): void {

    if (!!!this.height) this.height = 400;
    if (!!!this.totalHeight) this.totalHeight = 400;

    this.subscriptions.push(
      this.scrollStream$.pipe(
        debounceTime(200)
      ).subscribe(event => {

        this.scrollTop = event.srcElement.scrollTop;

        const pagination = this.calculate();

        this.onPagination.emit(pagination);

      })
    )

  }

  ngAfterViewInit(): void {
    setTimeout(() => this.calculate())
  }

}
