import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { DialogService } from 'src/app/services/dialog.service';
import { AppService } from 'src/app/services/app.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { IFunctionWithFullActions, RoutingService } from 'src/app/services/routing.service';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { Location } from '@angular/common';
import { ICoreButtonVNS } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { CORE_VNS_BUTTONS } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/core-button-group-vns.component';
import { EnumCoreButtonVNSCode } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';

@Component({
  selector: 'app-sys-function-action-mapper',
  templateUrl: './sys-function-action-mapper.component.html',
  styleUrls: ['./sys-function-action-mapper.component.scss']
})
export class SysFunctionActionMapperComponent extends BaseEditComponent implements AfterViewInit, OnDestroy {

  loading: boolean = false;
  buttons!: ICoreButtonVNS[];
  function!: IFunctionWithFullActions;
  override entityTable = "SYS_FUNCTION_ACTION";
  subscriptions: Subscription[] = [];
  captionCode!: EnumTranslateKey;
  truelyText = EnumTranslateKey.IS_ACTIVE;
  falsyText = EnumTranslateKey.IS_INACTIVE;

  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SAVE,
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL,
  ]

  lang!: string;

  constructor(
    public override dialogService: DialogService,
    private appService: AppService,
    private routingService: RoutingService,
    private mls: MultiLanguageService,
    private location: Location,
  ) {

    super(dialogService);
    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SYS_FUNCTION_ACTION_EDIT;
    this.buttons = CORE_VNS_BUTTONS.filter(x => !!x.isHeader);
  }

  ngOnInit(): void {
    this.mls.lang$.subscribe(x => this.lang = x);

    this.routingService.currentFunction$.subscribe(x => {
      this.function = x!;
      if (!!!this.function) this.location.back();

      this.buttons.map(button => {
        if (this.function.actionCodes.includes(button.code)) {
          button.isActive = true
        } else {
          button.isActive = false
        }
      })
    })
  }

  ngAfterViewInit(): void {

  }

  onSubmit(): void {
    const codes: string[] = []
    this.buttons.filter(x => !!x.isActive).map(item => {
      codes.push(item.code)
    })
    this.loading = true;
    this.subscriptions.push(
      this.appService.post(api.SYS_FUNCTION_ACTION_UPDATE_RANGE_RENEW, {
        functionId: this.function.id,
        codes
      }).subscribe(x => {
        this.loading = false;
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            this.reloadFunctions();
          }
        }
      })
    )
  }

  onCancel(): void {
    this.location.back()
  }

  onButtonClick(e: ICoreButtonVNS): void {
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_CANCEL) {
      this.onCancel()
    } else if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SAVE) {
      this.onSubmit();
    }
  }

  private reloadFunctions(): void {
    this.loading = true;
    this.subscriptions.push(
      this.routingService.readAllFunctionWithAllActions().subscribe(y => {
        this.loading = false;
        if (y.ok && y.status === 200) {
          const body1: IFormatedResponse = y.body
          if (body1.statusCode === 200) {
            const filter = body1.innerBody.filter((x: any) => x.id === this.function.id)
            this.routingService.currentFunction$.next(filter[0])
            this.routingService.fullFunctions$.next(body1.innerBody)
            this.location.back()
          }
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

}