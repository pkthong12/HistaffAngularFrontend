import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

@Component({
  selector: 'core-ios-switcher',
  templateUrl: './core-ios-switcher.component.html',
  styleUrls: ['./core-ios-switcher.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreIosSwitcherComponent
    }
  ]
})
export class CoreIosSwitcherComponent extends CoreFormControlBaseComponent implements AfterViewInit, OnDestroy {

  @Input() bgColor!: string;

  @ViewChild('container') container!: ElementRef;

  override value!: boolean;
  labelText!: string;

  subscriptions: Subscription[] = [];
  lang!: string;
  truelyText = 'on'
  falsyText = 'off'

  constructor(
    private mls: MultiLanguageService
  ) {
    super()
    
  }

  override writeValue(obj: boolean): void {
    this.value = obj;
    this.labelText = !!obj ? this.truelyText : this.falsyText;
  }

  onValueChange(event: any) {
    this.onChange(this.value);
  }

  onClick(): void {
    this.value = !!!this.value;
    this.labelText = !!this.value ? this.truelyText : this.falsyText;
    this.onChange(this.value)
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.container.nativeElement.style.setProperty('--outer-truely-bg-color', this.bgColor))
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

}
