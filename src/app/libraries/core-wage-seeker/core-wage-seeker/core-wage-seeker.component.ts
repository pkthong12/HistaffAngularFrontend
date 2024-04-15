import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { WageComponent } from 'src/app/main/cms/profile/appbusiness/wage/wage.component';

@Component({
  selector: 'core-wage-seeker',
  templateUrl: './core-wage-seeker.component.html',
  styleUrls: ['./core-wage-seeker.component.scss']
})
export class CoreWageSeekerComponent extends WageComponent implements OnChanges, AfterViewInit {

  override title = EnumTranslateKey.UI_COMPONENT_TITLE_WAGE_SEEKER;

  @Input() multiMode!: boolean;
  @Input() preDefinedOuterParam$!: BehaviorSubject<any>;

  @Output() rowDoubleClick = new EventEmitter();
  @Output() selectedIdsChange = new EventEmitter();
  @Output() selectedDataChange = new EventEmitter();
  @Output() columnsInit = new EventEmitter();

  /* PreFilter */
  @Input() employeeId!: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeId']) {
      if (this.outerParam$.value === null) {
        this.outerParam$.next({
          employeeId: changes['employeeId'].currentValue
        })
      } else {
        this.outerParam$.next({
          ...this.outerParam$.value,
          employeeId: changes['employeeId'].currentValue
        })
      }
    }
  }

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

  onSelectedDataChange(e: any[]) {
    this.selectedDataChange.emit(e)
  }

}
