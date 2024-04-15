import { Component, OnInit } from '@angular/core';
import { ICoreAccordionItem } from 'src/app/libraries/core-accordion/core-accordion/core-accordion.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CorePageEditService } from 'src/app/libraries/core-page-edit/core-page-edit.service';
import { PersonnelCenterService } from '../../personnel-center.service';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { map, Subscription } from 'rxjs';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { AppService } from 'src/app/services/app.service';
import { api } from 'src/app/constants/api/apiDefinitions';
@Component({
  selector: 'app-contract-appendix',
  templateUrl: './contractappendix.component.html',
  styleUrls: ['./contractappendix.component.scss']
})
export class ContractappendixComponent extends BaseComponent implements OnInit {
  title: EnumTranslateKey = EnumTranslateKey.UI_PERSONNEL_CENTER_TITLE_CONTRACTAPPENDIX;
  contractAppendixNo: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACTAPPENDIX_CONTRACTAPPENDIXNO;
  contractName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACTAPPENDIX_CONTRACTNAME;
  startDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STARTDATE;
  expireDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EXPIREDATE;
  signerName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_SIGNERNAME; 
  signPos: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_SIGNER_POSITION;
  signDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_SIGNDATE;
  statusName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_STATUS;
  note: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_NOTE;

  members!: any[];

  employee!: any;
  
  constructor(
    private appService: AppService,
    public override mls: MultiLanguageService,
    private personnelCenterService: PersonnelCenterService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(mls);
  }
  onToolItemClickLocal(code: string) {
    this.router.navigate([btoa('0')], { relativeTo: this.route })
  }
  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => this.lang = x);
    this.subscriptions.push(
      this.personnelCenterService.employee$.subscribe(x => {
        this.employee = x
        this.subscriptions.push(
          this.appService.get(api.HU_CONTRACT_GETCONTRACTAPPENDIXBYEMPPROFILE + x.id)
            .pipe(
              map((members: any) => {
                return members.body.innerBody;
              })
            )
            .subscribe(response => {
              this.members = response;
            })
        )
      })
    )

  }

}
