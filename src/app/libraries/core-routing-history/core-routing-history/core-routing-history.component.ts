import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { RoutingService } from 'src/app/services/routing.service';

export interface IRoutingHistoryItem {
  fullUrl: string;
  mainComponentCodeName?: string;
}

@Component({
  selector: 'core-routing-history',
  templateUrl: './core-routing-history.component.html',
  styleUrls: ['./core-routing-history.component.scss']
})
export class CoreRoutingHistoryComponent extends BaseComponent implements OnInit {

  items: IRoutingHistoryItem[] = [];

  constructor(
    public override mls: MultiLanguageService,
    private routingService: RoutingService

    ) {
    super(mls);

    this.subscriptions.push(
      this.routingService.routingHistory$.subscribe(x => this.items = x.reverse())
    )

  }


}
