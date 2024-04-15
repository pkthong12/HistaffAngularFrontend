import { Component, OnInit } from '@angular/core';
import { CoreControlComponent } from '../../core-control/core-control/core-control.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'core-control-no-grid-buffer',
  templateUrl: './core-control-no-grid-buffer.component.html',
  styleUrls: ['./core-control-no-grid-buffer.component.scss']
})
export class CoreControlNoGridBufferComponent extends CoreControlComponent {

  constructor(public override mls: MultiLanguageService, public override alertService: AlertService) { 
    super(mls, alertService);
  }

}
