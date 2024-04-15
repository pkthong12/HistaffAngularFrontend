import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { ContractInforComponent } from 'src/app/main/cms/profile/appbusiness/contractinfor/contractinfor.component';


@Component({
  selector: 'core-contract-seeker',
  templateUrl: './core-contract-seeker.component.html',
  styleUrls: ['./core-contract-seeker.component.scss']
})
export class CoreContractSeekerComponent extends ContractInforComponent implements AfterViewInit {

  override title = EnumTranslateKey.UI_COMPONENT_TITLE_CONTRACT_SEEKER;

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
