import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { HuconcurrentlyComponent } from 'src/app/main/cms/profile/applist/huconcurrently/huconcurrently.component';
import { PositionComponent } from 'src/app/main/cms/profile/applist/position/position.component';

@Component({
  selector: 'core-position-concurrent-seeker',
  templateUrl: './core-position-concurrent-seeker.component.html',
  styleUrls: ['./core-position-concurrent-seeker.component.scss']
})
export class CorePositionConcurrentSeekerComponent extends HuconcurrentlyComponent implements OnInit {

  override title = EnumTranslateKey.UI_COMPONENT_TITLE_POSITION_CONCURRENT_SEEKER;

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

  onSelectedDataChange(e: any[]) {
    this.selectedDataChange.emit(e)
  }

}
