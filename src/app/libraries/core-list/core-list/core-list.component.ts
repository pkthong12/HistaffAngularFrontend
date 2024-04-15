import { Component, ElementRef, Injector, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { Subject, Subscription, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

export interface ICoreListOption {
  value: number;
  text: string;
  active?: boolean;
}

@Component({
  selector: 'core-list',
  templateUrl: './core-list.component.html',
  styleUrls: ['./core-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreListComponent
    }
  ]
})
export class CoreListComponent extends CoreFormControlBaseComponent implements OnChanges, OnInit, OnDestroy {

  ngControl!: NgControl;

  @Input() title!: EnumTranslateKey;
  @Input() options!: ICoreListOption[];

  subscriptions: Subscription[] = [];
  localOptions: ICoreListOption[] = [];
  searchText: string = "";
  placeholder = EnumTranslateKey.UI_COMMON_PLACE_HOLDER_SEARCH_HERE;
  text!: string;
  loading: boolean = false;
  lang!: string;
  searchStream$ = new Subject<string>();

  constructor(
    private mls: MultiLanguageService,
    private injector: Injector
  ) { super() }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.localOptions = changes['options'].currentValue;
    }
  }

  ngOnInit(): void {

    this.ngControl = this.injector.get(NgControl);

    setTimeout(() => {
      this.subscriptions.push(
        this.ngControl.control?.valueChanges.subscribe(x => {
          if (!!!x) this.text = ""
        })!
      )
    })

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

    /***********/
    this.subscriptions.push(
      this.searchStream$.pipe(
        map(x => {
          console.log("map", x)
          return x;
        }),
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(text => {
        console.log("this.searchStream$", text)
        this.localOptions = this.options.filter(x => x.text.toLowerCase().indexOf(text.toLowerCase()) >= 0)
      })
    )
  }

  /*
  async onScrollLoadData(){
    const nativeElement= this.ulElement.nativeElement
    console.log(nativeElement.scrollTop)
    if(nativeElement.clientHeight + Math.round(nativeElement.scrollTop) === nativeElement.scrollHeight  &&  this.options.length !== this.totalCount){
      //this.localOptions = this.options;
      this.pageIndex +=1;
      nativeElement.scrollTop=0;
    }
  }
  */

  onListItemClick(option: ICoreListOption) {
    console.log("CoreListComponent onListItemClick", option);
    this.writeValue(option.value)
    this.onChange(option.value)
  }

  onSearchTextChange(e: any) {
    console.log("onSearchTextChange", e)
    this.searchStream$.next(e);
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
  }
}
