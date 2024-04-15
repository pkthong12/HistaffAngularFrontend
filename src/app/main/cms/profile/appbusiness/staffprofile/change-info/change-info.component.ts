import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { AppService } from 'src/app/services/app.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.scss']
})
export class ChangeInfoComponent implements OnInit {

  
  constructor(
    private appService: AppService,
    private alertService: AlertService,
    private mls: MultiLanguageService,
    private router: Router,
    private responseService: ResponseService,
  ) {

  }

  ngOnInit(): void {
    
  }

}
