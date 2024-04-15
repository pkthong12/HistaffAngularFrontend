import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LongTaskService } from '../../services/long-task.service';
import { BaseComponent } from '../../base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

@Component({
  selector: 'core-api-progress',
  templateUrl: './core-api-progress.component.html',
  styleUrls: ['./core-api-progress.component.scss']
})
export class CoreApiProgressComponent extends BaseComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  message!: string;
  outerMessage!: string;
  outerPercent!: number;
  innerMessage!: string;
  innerPercent!: number;
  error!: boolean;

  constructor(
    public override mls: MultiLanguageService,
    private longTaskService: LongTaskService
    ) {
      super(mls);
      this.longTaskService.message$.next('');
      this.longTaskService.data$.next(null);
    }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.subscriptions.push(
      this.longTaskService.message$.subscribe(x => this.message = x)
    )
    this.subscriptions.push(
      this.longTaskService.data$.subscribe(x => {
        this.outerMessage = x?.outerMessage || "";
        this.outerPercent = Number(x?.outerPercent.replace('%', '')) / 100 * 500 - 10;
        this.innerMessage = x?.innerMessage || ""
        this.innerPercent = Number(x?.innerPercent.replace('%', '')) / 100 * 500 - 10;
      })
    )
    this.subscriptions.push(
      this.longTaskService.error$.subscribe(x => {
        this.error = !!x
      })
    )
  }

  onClickClose(): void {
    this.onClose.emit(true);
  }

}
