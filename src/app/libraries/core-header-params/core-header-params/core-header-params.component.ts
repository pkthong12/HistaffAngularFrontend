import {
  Component,
  OnChanges,
  OnInit,
  Input,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { Subscription } from 'rxjs';

import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { ICoreParamControl } from '../enum-and-interfaces';

@Component({
  selector: 'core-header-params',
  templateUrl: './core-header-params.component.html',
  styleUrls: ['./core-header-params.component.scss'],
})
export class CoreHeaderParamsComponent
  extends CoreFormControlBaseComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() enableTimeZoneConverterForDateTimePeriodParameters!: boolean;
  @Input() rows!: ICoreParamControl[][];
  @Input() toggleAllValue!: boolean;

  lang!: string;
  subscriptions: Subscription[] = [];

  constructor(private mls: MultiLanguageService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows']) {
      console.log(
        "CoreHeaderParamsComponent changes['rows']",
        changes['rows'].currentValue
      );
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(this.mls.lang$.subscribe((x) => (this.lang = x)));
  }

  ngOnDestroy(): void {
    this.subscriptions.map((x) => x?.unsubscribe());
  }

  onFromDateChange(e: any) {
    this.onChange({
      ...this.value,
      fromDate: e,
    });
  }

  onToDateChange(e: any) {
    this.onChange({
      ...this.value,
      toDate: e,
    });
  }

  onInclusionChange(e: any) {
    this.onChange({
      ...this.value,
      inclusion: e,
    });
  }
}
