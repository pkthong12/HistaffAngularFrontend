import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EnumCoreOrgTreeaAccessorMode } from '../../core-org-tree/core-org-tree/core-org-tree.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseComponent } from '../../base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { IOrgTreeItem } from '../../core-org-tree/core-org-tree/IOrgTreeItem';

@Component({
  selector: 'core-org-unit-seeker',
  templateUrl: './core-org-unit-seeker.component.html',
  styleUrls: ['./core-org-unit-seeker.component.scss']
})
export class CoreOrgUnitSeekerComponent extends BaseComponent implements OnInit {

  @Output() itemDoubleClick = new EventEmitter()

  title = EnumTranslateKey.UI_CORE_ORG_UNIT_SEEKER_TITLE
  accessorMode = EnumCoreOrgTreeaAccessorMode.ACTIVATED_SINGLE;

  constructor(
    public override mls: MultiLanguageService
  ) {
    super(mls);
  }

  onItemDoubleClick(e: IOrgTreeItem) {
    this.itemDoubleClick.emit(e);
  }

}
