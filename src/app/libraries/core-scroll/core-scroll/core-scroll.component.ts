import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'core-scroll',
  templateUrl: './core-scroll.component.html',
  styleUrls: ['./core-scroll.component.scss']
})
export class CoreScrollComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() localOptions!: any[];
  @Input() itemTemplate!: TemplateRef<any>;
  @Input() itemCount!: number;
  @Input() height!: number;
  @Input() childHeight!: number;
  @Input() renderAhread: number = 20;

  totalHeight!: number;
  scrollTop: number = 0;
  offsetY!: number;
  visibleOptions!: any[];

  scrollStream$ = new Subject<any>();

  subscriptions: Subscription[] = [];

  constructor() { }

  onScrollLoading(e: any): void {
    this.scrollStream$.next(e);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemCount']) {
      this.totalHeight = changes['itemCount'].currentValue * this.childHeight;
    }
    if (changes['localOptions']) {
      this.calculate()
    }
  }

  calculate(): void {
    let startNode = Math.floor(this.scrollTop / this.childHeight) - this.renderAhread;
    startNode = Math.max(0, startNode);
    let visibleNodeCount = Math.ceil(this.height / this.childHeight) + 2 * this.renderAhread;
    visibleNodeCount = Math.min(this.itemCount - startNode, visibleNodeCount);
    this.offsetY = startNode * this.childHeight;
    const newVisibleOptions: any[] = [];

    for (let i = startNode; i < startNode + visibleNodeCount; i++) {
      newVisibleOptions.push(this.localOptions[i])
    }

    this.visibleOptions = newVisibleOptions;
  }

  ngOnInit(): void {

    this.subscriptions.push(
      this.scrollStream$.pipe(
        debounceTime(200)
      ).subscribe(event => {

        this.scrollTop = event.srcElement.scrollTop;

        this.calculate();

      })
    )

  }

  ngAfterViewInit(): void {
    setTimeout(() => this.calculate())
  }

}