import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { PositionComponent } from 'src/app/main/cms/profile/applist/position/position.component';

@Component({
  selector: 'core-position-seeker',
  templateUrl: './core-position-seeker.component.html',
  styleUrls: ['./core-position-seeker.component.scss'],
})
export class CorePositionSeekerComponent extends PositionComponent implements OnInit {

  override title = EnumTranslateKey.UI_COMPONENT_TITLE_POSITION_SEEKER;

  @Input() multiMode!: boolean;
  @Input() preDefinedOuterParam$!: BehaviorSubject<any>;

  @Output() rowDoubleClick = new EventEmitter();
  @Output() selectedIdsChange = new EventEmitter();
  @Output() selectedDataChange = new EventEmitter();
  @Output() columnsInit = new EventEmitter();


  dialogInstanceNumber!: number;
  isCreating!: boolean;

  pendingData: any;

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.subscriptions.push(
      this.preDefinedOuterParam$?.subscribe(x => {
        if (this.outerParam$.value === null) {
          this.outerParam$.next(x);
        } else {
          this.outerParam$.next({
            ...this.outerParam$.value,
            ...x
          });
        }
      })
    )

    // this.subscriptions.push(
    //   this.dialogService.dialogConfirmed$.pipe(
    //     filter(x => !!!this.dialogService.busy && !!x?.confirmed && x.instanceNumber === this.dialogInstanceNumber)
    //   ).subscribe(() => {
    //     debugger
    //     this.dialogService.resetService()
    //     this.rowDoubleClick.emit(this.pendingData)
    //   })
    // )

    this.columnsInit.emit(this.columns);

    this.subscriptions.push(
      this.positionEditService.isCreating$.subscribe(x => this.isCreating = x)
      
    )
  }


   onRowDoubleClick(e: any) {
    this.pendingData = e

    if(!!e && this.router.url.includes('profile/list/position')) {
      this.positionEditService.isCreating$.next(true)
    } else {
      this.positionEditService.isCreating$.next(false)
    }
    if (e.master != null && !!!this.isCreating) {
      if(!!!e.interim){
        this.subscriptions.push(
          this.appService.get(api.HU_EMPLOYEE_CHECK_POSITION_MASTER_INTERIM + e.id).subscribe((x : any) => {
            if(x.status == 200){
              const body: IFormatedResponse = x.body;
              if(!!body.innerBody){
                this.dialogService.busy = true;
                this.dialogService.title$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_TITLE);
                this.dialogService.body$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_POSITON_HAVE_MASTER);
                this.dialogService.okButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CONFIRM);
                this.dialogService.cancelButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_GO_BACK_TO_EDIT_FORM);
                this.dialogService.showConfirmDialog$.next(true);
                this.dialogService.dialogConfirmed$.pipe(
                  filter(x => !!!this.dialogService.busy && !!x?.confirmed && x.instanceNumber === this.dialogInstanceNumber)
                ).subscribe(() => {
                  this.dialogService.resetService()
                  this.rowDoubleClick.emit(this.pendingData)
                })
              }else{
                this.dialogService.busy = true;
                this.dialogService.title$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_TITLE);
                this.dialogService.body$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_POSITON_CAN_NOT_STAFF);
                this.dialogService.cancelButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_GO_BACK_TO_EDIT_FORM);
                this.dialogService.showCancelOnly$.next(true);
                this.dialogService.showConfirmDialog$.next(true);
              }
            }
          })
        )
        
      }else{
        this.dialogService.busy = true;
        this.dialogService.showConfirmDialog$.next(true);
        this.dialogService.title$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_TITLE);
        this.dialogService.body$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_POSITON_CAN_NOT_STAFF);
        this.dialogService.cancelButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_GO_BACK_TO_EDIT_FORM);
        this.dialogService.showCancelOnly$.next(true);
      }
      
    } else {
      this.rowDoubleClick.emit(e)
    }
  }

  onSelectedIdsChange(e: any) {
    this.selectedIdsChange.emit(e)
  }

  onSelectedDataChange(e: any[]) {
    this.selectedDataChange.emit({
      columns: this.columns,
      data: e
    })
  }

}
