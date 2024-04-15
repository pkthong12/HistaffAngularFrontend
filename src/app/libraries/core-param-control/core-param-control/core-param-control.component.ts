import { Component, Input, OnInit } from '@angular/core';
import { ICoreParamControl } from '../../core-header-params/enum-and-interfaces';
import { BaseComponent } from '../../base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'core-param-control',
  templateUrl: './core-param-control.component.html',
  styleUrls: ['./core-param-control.component.scss'],
})
export class CoreParamControlComponent extends BaseComponent implements OnInit {
  @Input() control!: ICoreParamControl;
  @Input() enableTimeZoneConverterForDateTimePeriodParameters!: boolean;

  controlType!: string;

  constructor(
    public override mls: MultiLanguageService,
    public alertService: AlertService
  ) {
    super(mls);
  }

  override ngOnInit(): void {
    this.subscriptions.push(this.mls.lang$.subscribe((x) => (this.lang = x)));
    this.controlType = this.control.controlType;
  }
}
