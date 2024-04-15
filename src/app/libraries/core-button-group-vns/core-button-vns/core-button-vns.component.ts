import { Component, EventEmitter, Input, OnInit, Output, isDevMode } from '@angular/core';
import { Subscription } from 'rxjs';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { ICoreButtonVNS } from '../core-button-group-vns/ICoreButtonVNS';
import { CoreButtonGroupService } from '../core-button-group-service';
import { AlertService } from '../../alert/alert.service';
import { noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';

@Component({
  selector: 'core-button-vns',
  templateUrl: './core-button-vns.component.html',
  styleUrls: ['./core-button-vns.component.scss']
})
export class CoreButtonVnsComponent implements OnInit {

  @Input() data!: ICoreButtonVNS;
  @Input() instanceNumber!: number;
  @Input() disabled!: boolean; 
  @Input() showCaption: boolean = false;
  @Output() buttonClick = new EventEmitter<ICoreButtonVNS>();

  lang!: string
  subscriptions: Subscription[] = [];
  hidden!: boolean;

  constructor(
    private mls: MultiLanguageService,
    private coreButtonGroupService: CoreButtonGroupService,
    private alertService: AlertService
  ) { }
  ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    const filter = this.coreButtonGroupService.instances.filter(x => x.instanceNumber === this.instanceNumber);
    if (!!filter.length) {
      this.subscriptions.push(
        filter[0].mustBeHidden$.subscribe(mbh => this.hidden = mbh.includes(this.data.code))
      )
    } else {
      if (isDevMode()) {
        this.alertService.warn("Không tìm thấy instance number của nhóm nút", noneAutoClosedAlertOptions);
      }
    }

  }

  onButtonClick(): void {
    this.buttonClick.emit(this.data);
  }

}
