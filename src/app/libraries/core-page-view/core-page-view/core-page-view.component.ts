import { Component, Input, OnInit } from '@angular/core';
import { ICoreViewSection } from '../enum-interfaces';
import { api } from 'src/app/constants/api/apiDefinitions';
import { BaseComponent } from '../../base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';

@Component({
  selector: 'core-page-view',
  templateUrl: './core-page-view.component.html',
  styleUrls: ['./core-page-view.component.scss']
})
export class CorePageViewComponent extends BaseComponent implements OnInit {

  @Input() caption!: EnumTranslateKey;
  @Input() sections!: ICoreViewSection[];
  @Input() loading!: boolean;
  @Input() showLeftLine!: boolean;

  constructor(
    public override mls: MultiLanguageService
  ) {
    super(mls);
  }

}
