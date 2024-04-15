import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy, Input } from '@angular/core';

import { DialogService } from 'src/app/services/dialog.service';
import { BaseComponent } from '../../base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'core-confirm-dialog',
  templateUrl: './core-confirm-dialog.component.html',
  styleUrls: ['./core-confirm-dialog.component.scss']
})
export class CoreConfirmDialogComponent extends BaseComponent implements AfterViewInit, OnDestroy {
  @Input() showingUp!: boolean;
  @ViewChild('container') container!: ElementRef;

  show!: boolean | undefined;

  okButtonText: EnumTranslateKey = EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_SURE; // DEFAULT
  cancelButtonText: EnumTranslateKey = EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CANCEL; // DEFAULT
  title!: EnumTranslateKey;
  body!: EnumTranslateKey;
  showCancelOnly!: boolean;
  informationLines!: string[];
  reason: string = '';


  constructor(
    public override mls: MultiLanguageService,
    private dialogService: DialogService,
    private routingService: RoutingService
  ) {
    super(mls);

    this.subscriptions.push(
      this.dialogService.showConfirmDialog$.subscribe(x => {
        this.show = x
        // Stop navigating property to show opacity 1 while showConfirmDialog$ changes 
        this.routingService.navigating$.next(false)
      })
    )
    this.subscriptions.push(
      this.dialogService.title$.subscribe(x => this.title = x)
    )
    this.subscriptions.push(
      this.dialogService.body$.subscribe(x => this.body = x)
    )
    this.subscriptions.push(
      this.dialogService.okButtonText$.subscribe(x => this.okButtonText = x)
    )
    this.subscriptions.push(
      this.dialogService.cancelButtonText$.subscribe(x => this.cancelButtonText = x)
    )
    this.subscriptions.push(
      this.dialogService.showCancelOnly$.subscribe(x => this.showCancelOnly = x)
    )
    this.subscriptions.push(
      this.dialogService.informationLines$.subscribe(x => this.informationLines = x)
    )
    this.subscriptions.push(
      dialogService.reason$.subscribe(x => this.reason = x)
    )
    this.subscriptions.push(
      dialogService.showingUp$.subscribe(x => this.showingUp = x)
    )
  }

  ngAfterViewInit(): void {
    var textareaInput = document.querySelectorAll("textarea.showingUp");
    textareaInput.forEach((textarea) =>{
      textarea.textContent = ""
    })
  }

  close(): void {
    this.dialogService.showConfirmDialog$.next(false);

    // Clear the other states
    this.dialogService.resetService()
  }

  onConfirm(): void {
    this.dialogService.showConfirmDialog$.next(false);
    this.dialogService.canDeactivate$.next(true);
    this.dialogService.dialogConfirmed$.next({
      ...this.dialogService.dialogConfirmed$.value!,
      confirmed: true
    });
  }

  onReasonEvent(e: any){
    if(!!e){
      this.dialogService.reason$.next(this.reason)
    }
  }
  override ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
    this.dialogService.resetService();
    this.dialogService.reason$.next('')
  }

}
