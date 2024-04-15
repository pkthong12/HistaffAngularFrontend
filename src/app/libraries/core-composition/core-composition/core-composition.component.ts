import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

import { CoreCompositionState } from '../core-composition-state';
import { BaseComponent } from '../../base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { BehaviorSubject } from 'rxjs';
import { CoreCompositionService } from '../core-composition.service';

@Component({
  selector: 'core-composition',
  templateUrl: './core-composition.component.html',
  styleUrls: ['./core-composition.component.scss'],
  providers: [CoreCompositionState]
})
export class CoreCompositionComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() coreCompositionInstanceNumber!: number;
  @Input() top!: TemplateRef<any>;
  @Input() left!: TemplateRef<any>;
  @Input() leftWidth!: number;
  @Input() main!: TemplateRef<any>;
  @Input() height!: number;
  @Input() defaultResizeOff!: boolean;

  @ViewChild('container') container!: ElementRef;
  @ViewChild('topRef') topRef!: ElementRef;
  @ViewChild('leftRef') leftRef!: ElementRef;
  @ViewChild('mainRef') mainRef!: ElementRef;

  reduced$ = new BehaviorSubject<boolean>(false);

  constructor(
    public override mls: MultiLanguageService,
    private coreCompositionState: CoreCompositionState,
    private coreCompositionService: CoreCompositionService
  ) {
    super(mls);
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.coreCompositionState.leftPartReduced$.next(false);
  }

  ngAfterViewInit(): void {

    this.coreCompositionService.instances.push({
      instanceNumber: this.coreCompositionInstanceNumber,
      leftRef$: new BehaviorSubject<ElementRef>(this.leftRef),
      topRef$: new BehaviorSubject<ElementRef>(this.topRef),
      mainRef$: new BehaviorSubject<ElementRef>(this.mainRef),
    })

    this.coreCompositionState.topRef = this.topRef;
    this.coreCompositionState.leftRef = this.leftRef;
    this.coreCompositionState.mainRef = this.mainRef;

    if (!!this.height) {
      setTimeout(() => this.container.nativeElement.style.setProperty('--height', this.height + 'px'))
    } else {
      if (!!!this.defaultResizeOff) {
        const documentHeader = Number(getComputedStyle(document.documentElement).getPropertyValue("--size-header-height").replace('px', ''));
        const pageHeader = Number(getComputedStyle(document.documentElement).getPropertyValue("--size-core-page-header-height").replace('px', ''));
        const spacing = Number(getComputedStyle(document.documentElement).getPropertyValue("--size-layout-block-cell-spacing").replace('px', ''));
        // subtract -1 to kill scroll Y
        setTimeout(() => this.container.nativeElement.style.setProperty('--height', (window.innerHeight - documentHeader - pageHeader - 2 * spacing - 15 /* subtract -1 to kill scroll Y */) + 'px'))
      }
    }

    setTimeout(() => this.coreCompositionState.mainViewpotY$.next(this.mainRef.nativeElement.getBoundingClientRect().y))

    if (!!!this.left) {
      setTimeout(() => this.container.nativeElement.style.setProperty("--leftpart-width", '0px'))
    }

    if (!!this.leftWidth) {
      setTimeout(() => this.container.nativeElement.style.setProperty("--leftpart-width", this.leftWidth + 'px'))
    }
  }

  onLeftPartReducerClick() {
    console.log("CURRENT OF this.coreCompositionState.leftPartReduced$.value", this.coreCompositionState.leftPartReduced$.value)
    this.coreCompositionState.leftPartReduced$.next(!this.coreCompositionState.leftPartReduced$.value)
    console.log("NEXT OF this.coreCompositionState.leftPartReduced$.value", this.coreCompositionState.leftPartReduced$.value)
  }

}
