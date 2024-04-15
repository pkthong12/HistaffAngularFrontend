import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BaseComponent } from '../../base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

@Component({
  selector: 'core-pagination-full',
  templateUrl: './core-pagination-full.component.html',
  styleUrls: ['./core-pagination-full.component.scss']
})
export class CorePaginationFullComponent extends BaseComponent implements OnChanges, OnInit {

  @Input() currentPage$!: BehaviorSubject<number>;
  @Input() height!: number;
  @Input() pageCount!: number;
  @Input() loading!: boolean;
  @Input() showAdd!: boolean;
  @Input() background!: string;
  @Input() pageSize$!: BehaviorSubject<number>;
  @Input() innerBodyCount$!: BehaviorSubject<number>;
  @Input() pagination$!: BehaviorSubject<any>;
  @Input() fixedPageSize!: number;
  @Output() onClickAdd = new EventEmitter();
  @Output() onCurrentPageChange = new EventEmitter();

  @ViewChild('container') container!: ElementRef;
  @ViewChild('current') current!: ElementRef;

  navigationDirection: number = 1;
  displayPageCount: any[] = []
  mouseDownStream$!: Observable<any>;
  touchStartStream$!: Observable<any>;
  mouseUpStream$!: Observable<any>;
  touchEndStream$!: Observable<any>;
  mouseDownSubscription$!: Subscription;
  touchStartSubscription$!: Subscription;
  mouseUpSubscription$!: Subscription;
  touchEndSubscription$!: Subscription;
  SizeChanger: any[] = [5,10,20,50,200,500,1000,5000,10000]
  selectedSize: number = 50

  currentButtonContent!: string;

  constructor(public override mls: MultiLanguageService) { super(mls) }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageCount']) {
      if (this.pageCount !== undefined) {
        this.resolvePageCount();
      }
    }
  }
  override ngOnInit(): void {

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

    this.subscriptions.push(
      this.pageSize$.subscribe(x => this.selectedSize = x)
    )

    this.subscriptions.push(
      this.currentPage$.subscribe(x => this.currentButtonContent = x.toString())
    )

  }
  onSizeChange(event: any) {
    this.pageSize$.next(event)
    this.pageCount = Math.ceil(this.innerBodyCount$.value / this.pageSize$.value);
    this.pagination$.next({ skip: 0, take: this.pageSize$.value })
  }

  private resolvePageCount() {
    let arrayPageCount = this.chunkArray(this.pageCount, 4)
    this.displayPageCount = !!arrayPageCount.length ? arrayPageCount[0] : [];
    this.subscriptions.push(
      this.currentPage$.subscribe(x => {
        for (let i = 0; i < arrayPageCount.length; i++) {
          if (arrayPageCount[i].includes(this.currentPage$.value)) {
            this.displayPageCount = arrayPageCount[i]
          }
        }
      })
    )

  }
  chunkArray<T>(pageCount: number, chunkSize: number) {
    let array = Array.from({ length: pageCount }, (_, index) => index + 1)
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  clickPageNumber(event: number) {
    console.log(event)
    if (event === this.currentPage$.value) {
      return;
    } else {
      this.currentPage$.next(event)
      this.onCurrentPageChange.emit(event)
    }

  }

  goFirst() {
    this.navigationDirection = -1;
    if (!!this.pageCount) setTimeout(() => {
      this.currentPage$.next(1)
      this.onCurrentPageChange.emit(1)
      console.log("goFirst");

    });
  }

  goLast() {
    this.navigationDirection = 1;
    if (!!this.pageCount) setTimeout(() => {
      this.currentPage$.next(this.pageCount)
      this.onCurrentPageChange.emit(this.pageCount)
      console.log("goLast");
    });
  }

  goPrevious() {
    this.navigationDirection = -1;
    if (this.currentPage$.value > 1) setTimeout(() => {
      this.currentPage$.next(this.currentPage$.value - 1)
      this.onCurrentPageChange.emit(this.currentPage$.value)
      console.log("goPrevious");

    });
  }

  goNext() {
    this.navigationDirection = 1;
    if (this.currentPage$.value < this.pageCount) setTimeout(() => {
      this.currentPage$.next(this.currentPage$.value + 1)
      this.onCurrentPageChange.emit(this.currentPage$.value)
      console.log("goNext");
      
    });
  }

  onClickAddLocal() {
    this.onClickAdd.emit();
  }

  ngAfterViewInit(): void {

    if (this.height) {
      this.container.nativeElement.style.setProperty('--height', this.height + 'px')
    }

    // this.mouseDownStream$ = fromEvent(this.current.nativeElement, 'mousedown', _ => {
    //   this.currentButtonContent = `${this.currentPage$.value}/${this.pageCount}`;
    // });
    // this.touchStartStream$ = fromEvent(this.current.nativeElement, 'touchstart', _ => {
    //   this.currentButtonContent = `${this.currentPage$.value}/${this.pageCount}`;
    // });


    // this.mouseUpStream$ = fromEvent(this.current.nativeElement, 'mouseup', _ => {
    //   this.currentButtonContent = `${this.currentPage$.value}`;
    // });
    // this.touchEndStream$ = fromEvent(this.current.nativeElement, 'touchend', _ => {
    //   this.currentButtonContent = `${this.currentPage$.value}`;
    // });


    // this.mouseDownSubscription$ = this.mouseDownStream$.subscribe();
    // this.touchStartSubscription$ = this.touchStartStream$.subscribe();
    // this.mouseUpSubscription$ = this.mouseUpStream$.subscribe();
    // this.touchEndSubscription$ = this.touchEndStream$.subscribe();

    if (this.background) setTimeout(() => this.container.nativeElement.style.setProperty('--bg', this.background));

  }

  override ngOnDestroy(): void {
    if (this.mouseDownSubscription$) this.mouseDownSubscription$.unsubscribe();
    if (this.touchStartSubscription$) this.touchStartSubscription$.unsubscribe();
    if (this.mouseUpSubscription$) this.mouseUpSubscription$.unsubscribe();
    if (this.touchEndSubscription$) this.touchEndSubscription$.unsubscribe();
    if(this.pagination$) this.pagination$.unsubscribe();
    this.subscriptions.map(x => x?.unsubscribe());
  }

}
