import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, isDevMode } from '@angular/core';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { AlertService } from '../../alert/alert.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { alertOptions, noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';

export interface ICoreRadioOption {
  value: any;
  text: string;
}

@Component({
  selector: 'core-radio-group',
  templateUrl: './core-radio-group.component.html',
  styleUrls: ['./core-radio-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreRadioGroupComponent
    }
  ]
})
export class CoreRadioGroupComponent extends CoreFormControlBaseComponent implements OnInit, OnDestroy {

  @Input() options$!: BehaviorSubject<ICoreRadioOption[]>;
  @Input() vertical!: boolean;

  options!: ICoreRadioOption[];

  lang!: string;
  subscriptions: Subscription[] = [];

  disabledMessage: EnumTranslateKey = EnumTranslateKey.UI_CONTROL_DISABLED;

  constructor(
    private mls: MultiLanguageService,
    private alertService: AlertService
    ) {
    super()
  }

  ngOnInit(): void {

    // Check error

    if (!!!this.options$) {

      if (isDevMode())
      this.alertService.error(`CoreRadioGroup requires options input`, noneAutoClosedAlertOptions)


      this.options = [
        {
          value: 1,
          text: "option1"
        },
        {
          value: 2,
          text: 'option2'
        }
      ]
    }

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

    this.subscriptions.push(
      this.options$.subscribe(x => this.options = x)
    )
  }

  onLabelClick(e: ICoreRadioOption): void {
    if (!!this.disabled) {
      this.alertService.info(this.mls.trans(this.disabledMessage), alertOptions);
      return;
    }
    if(this.value == e.value){
      this.value = null
    }
    else{
      this.value = e.value;
    }
    
    this.onChange(this.value);
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
  }

}
