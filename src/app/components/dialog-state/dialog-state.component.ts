import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { DomService } from 'src/app/libraries/services/dom.service';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

@Component({
  selector: 'app-dialog-state',
  templateUrl: './dialog-state.component.html',
  styleUrls: ['./dialog-state.component.scss']
})
export class DialogStateComponent extends BaseComponent implements AfterViewInit {

  @ViewChild('container') container!: ElementRef<any>;

  constructor(
    public override mls: MultiLanguageService,
    public ds: DialogService, 
    private domService: DomService
    ) { super(mls) }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const z = this.domService.getMaxZIndex();
      this.container.nativeElement.style.setProperty('--z-index', z + 1);
    })
  }

  close(): void {
    this.ds.dialogStateOpen$.next(false);
  }

}
