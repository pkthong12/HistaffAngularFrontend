import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { DecisionComponent } from 'src/app/main/cms/profile/appbusiness/decision/decision.component';

@Component({
  selector: 'core-working-seeker',
  templateUrl: './core-working-seeker.component.html',
  styleUrls: ['./core-working-seeker.component.scss']
})
export class CoreWorkingSeekerComponent extends DecisionComponent  implements AfterViewInit {

  override title = EnumTranslateKey.UI_COMPONENT_TITLE_WORKING_SEEKER;

  @Input() multiMode!: boolean;
  @Input() preDefinedOuterParam$!: BehaviorSubject<any>;

  @Output() rowDoubleClick = new EventEmitter();
  @Output() selectedIdsChange = new EventEmitter();
  @Output() selectedDataChange = new EventEmitter();
  @Output() columnsInit = new EventEmitter();

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.subscriptions.push(
      this.preDefinedOuterParam$.subscribe(x => {
        if (this.outerParam$.value === null) {
          this.outerParam$.next(x);
        } else {
          this.outerParam$.next({
            ...this.outerParam$.value,
            ...x
          });
        }
      })
    )
    this.columnsInit.emit(this.columns);
  }


  onRowDoubleClick(e: any) {
    this.rowDoubleClick.emit(e)
  }

  onSelectedIdsChange(e: any) {
    this.selectedIdsChange.emit(e)
  }

  override onSelectedDataChange(e: any[]) {
    this.selectedDataChange.emit(e)
  }

}
