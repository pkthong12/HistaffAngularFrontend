import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { RoutingService } from 'src/app/services/routing.service';
import { EvaluateDialogService } from './valuate-dialog.service';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';
import { ICoreRadioOption } from 'src/app/libraries/core-radio-group/core-radio-group/core-radio-group.component';
import { EnumCoreButtonVNSCode } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';
import { ICoreButtonVNS } from 'src/app/libraries/core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { alertOptions, noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { CorePageListService, IGenerateTemplateRequest } from 'src/app/libraries/core-page-list/core-page-list.service';

@Component({
  selector: 'app-evaluate-dialog',
  templateUrl: './evaluate-dialog.component.html',
  styleUrls: ['./evaluate-dialog.component.scss']
})
export class EvaluateDialogComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() showingUp!: boolean;
  @Input() buttonItems: EnumCoreButtonVNSCode[] = [];
  @ViewChild('container') container!: ElementRef;

  show!: boolean | undefined;

  okButtonText: EnumTranslateKey = EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_SURE; // DEFAULT
  cancelButtonText: EnumTranslateKey = EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CANCEL; // DEFAULT
  title!: EnumTranslateKey;
  body!: EnumTranslateKey;
  showCancelOnly!: boolean;
  informationLines!: string[];
  reason: string = '';
  options$: BehaviorSubject<ICoreRadioOption[]> = new BehaviorSubject<ICoreRadioOption[]>([
    {
      value: 1,
      text: EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATE_EMPLOYEE
    },
    {
      value: 2,
      text: EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATE_CONCURRENT_EMPLOYEE
    }
  ])

  btnConfirm: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATE_BTN_CONFIRM
  btnCancel: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATE_BTN_CANCEL
  formType!: number;
  formImportType!: number;
  hiddenBtn!: boolean;
  hiddenImportBtn!: boolean;
  hiddenImportRadioBtn!: boolean;
  hiddenExportRadioBtn!: boolean;
  fileImport!: ElementRef;
  shownBtn!: boolean;
  shownInput!: boolean;
  dateInput: Date = new Date();
  dateWage: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EFFECTDATE_FILTER;
  reasonLable:EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_INPUT_REASON;
  constructor(
    public override mls: MultiLanguageService,
    public evaluateDialogService: EvaluateDialogService,
    private routingService: RoutingService,
    private alertService: AlertService,
    private corePageListService: CorePageListService
  ) {
    super(mls);

    this.subscriptions.push(
      this.evaluateDialogService.showConfirmDialog$.subscribe(x => {
        this.show = x
        // Stop navigating property to show opacity 1 while showConfirmDialog$ changes 
        this.routingService.navigating$.next(false)
      })
    )

    this.subscriptions.push(
      this.evaluateDialogService.title$.subscribe(x => this.title = x)
    )

    this.subscriptions.push(
      this.evaluateDialogService.body$.subscribe(x => this.body = x)
    )

    this.subscriptions.push(
      this.evaluateDialogService.okButtonText$.subscribe(x => this.okButtonText = x)
    )

    this.subscriptions.push(
      this.evaluateDialogService.cancelButtonText$.subscribe(x => this.cancelButtonText = x)
    )

    this.subscriptions.push(
      this.evaluateDialogService.showCancelOnly$.subscribe(x => this.showCancelOnly = x)
    )

    this.subscriptions.push(
      this.evaluateDialogService.informationLines$.subscribe(x => this.informationLines = x)
    )

    this.subscriptions.push(
      evaluateDialogService.reason$.subscribe(x => this.reason = x)
    )

    this.subscriptions.push(
      evaluateDialogService.showingUp$.subscribe(x => this.showingUp = x)
    )

    this.subscriptions.push(
      evaluateDialogService.shownBtn$.subscribe(x => this.shownBtn = x)
    )

    this.subscriptions.push(
      evaluateDialogService.shownInput$.subscribe(x => this.shownInput = x)
    )
  }

  ngAfterViewInit(): void {
    var textareaInput = document.querySelectorAll("textarea.showingUp");
    textareaInput.forEach((textarea) => {
      textarea.textContent = ""
    })
  }

  close(): void {
    this.evaluateDialogService.showConfirmDialog$.next(false);

    // Clear the other states
    this.evaluateDialogService.resetService()
  }
  onProgressWindowClose(e: any): void {

  }

  onConfirm(): void {
    this.evaluateDialogService.dialogConfirmed$.next({
      ...this.evaluateDialogService.dialogConfirmed$.value!,
      confirmed: true
    });
    this.evaluateDialogService.showConfirmDialog$.next(false)
    this.evaluateDialogService.resetService();
  }
  onButtonClick(e: ICoreButtonVNS): void {
    switch (e.code) {
      case EnumCoreButtonVNSCode.NONE_HEADER_CANCEL:
        this.close()
        break;
      case EnumCoreButtonVNSCode.NONE_HEADER_CONFIRM:
        this.onConfirm();
        break;
      case EnumCoreButtonVNSCode.NONE_HEADER_UPDATE:
        this.onConfirm();
        break;
      default:
        this.alertService.warn(EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATE_USE_MUST_CHOOSE_ONE_OPTION)
        break;

    }
  }
  onReasonEvent(e: any) {
    if (!!e) {
      this.evaluateDialogService.reason$.next(this.reason)
      console.log(this.evaluateDialogService.reason$.value);

    }
  }

  onDateInputChange(e: any) {
    this.evaluateDialogService.dateInput$.next(this.dateInput)
    console.log(this.evaluateDialogService.dateInput$.value);

  }

  override ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
    this.evaluateDialogService.resetService();
    this.evaluateDialogService.reason$.next('')
  }

}
