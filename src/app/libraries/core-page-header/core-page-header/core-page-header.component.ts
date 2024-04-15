import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { BaseComponent } from '../../base-component/base/base.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { ICoreButtonVNS } from '../../core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { EnumCoreButtonVNSCode } from '../../core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';

@Component({
  selector: 'core-page-header',
  templateUrl: './core-page-header.component.html',
  styleUrls: ['./core-page-header.component.scss']
})
export class CorePageHeaderComponent extends BaseComponent implements OnChanges, AfterViewInit {

  @Input() instanceNumber! : number;
  @Input() shownItems! : EnumCoreButtonVNSCode[];
  @Input() title!: EnumTranslateKey | string;
  @Input() hideButtonGroup!: boolean;
  @Output() buttonClick = new EventEmitter<ICoreButtonVNS>();
  

  @ViewChild('container') container!: ElementRef;

  constructor(
    public override mls: MultiLanguageService,
    ) { 
    super(mls);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hideButtonGroup']) {
      console.log("changes['hideButtonGroup']", changes['hideButtonGroup'].currentValue)
    }
  }

  onButtonClick(e: ICoreButtonVNS) {
    this.buttonClick.emit(e);
  }

  ngAfterViewInit(): void {
  }

}
