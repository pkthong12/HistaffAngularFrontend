import { Component, ElementRef, EventEmitter, Input, OnInit, AfterViewInit, OnDestroy, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'core-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() currentPage$!: BehaviorSubject<number>;
  @Input() suspendCurrentPageSubscription$!: BehaviorSubject<boolean>;
  @Input() pageCount!: number;
  @Input() loading!: boolean;
  @Input() showAdd!: boolean;
  @Input() background!: string;
  @Output() onClickAdd = new EventEmitter();

  @ViewChild('container') container!: ElementRef;
  @ViewChild('current') current!: ElementRef;

  navigationDirection: number = 1;
  mouseDownStream$!: Observable<any>;
  touchStartStream$!: Observable<any>;
  mouseUpStream$!: Observable<any>;
  touchEndStream$!: Observable<any>;
  mouseDownSubscription$!: Subscription;
  touchStartSubscription$!: Subscription;
  mouseUpSubscription$!: Subscription;
  touchEndSubscription$!: Subscription;


  currentButtonContent!: string;

  constructor() { }

  ngOnInit(): void {
    this.currentPage$.subscribe(x => this.currentButtonContent = x.toString());
  }

  goFirst() {
    this.navigationDirection = -1;
    this.suspendCurrentPageSubscription$.next(false);
    if (!!this.pageCount) setTimeout(() => this.currentPage$.next(1));
  }

  goLast() {
    this.navigationDirection = 1;
    this.suspendCurrentPageSubscription$.next(false);
    if (!!this.pageCount) setTimeout(() => this.currentPage$.next(this.pageCount));
  }

  goPrevious() {
    this.navigationDirection = -1;
    this.suspendCurrentPageSubscription$.next(false);
    if (this.currentPage$.value > 1) setTimeout(() => this.currentPage$.next(this.currentPage$.value - 1));
  }

  goNext() {
    this.navigationDirection = 1;
    this.suspendCurrentPageSubscription$.next(false);
    if (this.currentPage$.value < this.pageCount) setTimeout(() => this.currentPage$.next(this.currentPage$.value + 1));
  }

  onClickAddLocal() {
    this.onClickAdd.emit();
  }

  ngAfterViewInit(): void {

    this.mouseDownStream$ = fromEvent(this.current.nativeElement, 'mousedown', _ => {
      this.currentButtonContent = `${this.currentPage$.value}/${this.pageCount}`;
    });
    this.touchStartStream$ = fromEvent(this.current.nativeElement, 'touchstart', _ => {
      this.currentButtonContent = `${this.currentPage$.value}/${this.pageCount}`;
    });


    this.mouseUpStream$ = fromEvent(this.current.nativeElement, 'mouseup', _ => {
      this.currentButtonContent = `${this.currentPage$.value}`;
    });
    this.touchEndStream$ = fromEvent(this.current.nativeElement, 'touchend', _ => {
      this.currentButtonContent = `${this.currentPage$.value}`;
    });


    this.mouseDownSubscription$ = this.mouseDownStream$.subscribe();
    this.touchStartSubscription$ = this.touchStartStream$.subscribe();
    this.mouseUpSubscription$ = this.mouseUpStream$.subscribe();
    this.touchEndSubscription$ = this.touchEndStream$.subscribe();

    if (this.background) setTimeout(() => this.container.nativeElement.style.setProperty('--bg', this.background));
    
  }

  ngOnDestroy(): void {
    if (this.mouseDownSubscription$) this.mouseDownSubscription$.unsubscribe();
    if (this.touchStartSubscription$) this.touchStartSubscription$.unsubscribe();
    if (this.mouseUpSubscription$) this.mouseUpSubscription$.unsubscribe();
    if (this.touchEndSubscription$) this.touchEndSubscription$.unsubscribe();

  }

}
