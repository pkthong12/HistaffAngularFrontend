import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';

import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-base-edit',
  templateUrl: './base-edit.component.html',
  styleUrls: ['./base-edit.component.scss']
})
export class BaseEditComponent {

  formInitStringValue!: string;
  form!: FormGroup;
  entityTable!: string;

  constructor(
    public dialogService: DialogService
  ) { }

  canDeactivate(): Observable<boolean> | boolean {
    console.log("this.formInitStringValue", this.formInitStringValue)
    console.log("JSON.stringify(this.form.getRawValue())", JSON.stringify(this.form.getRawValue()))
    const condition = JSON.stringify(this.form.getRawValue()) === this.formInitStringValue;
    if (condition) {
      return true;
    } else {
      this.dialogService.busy = true;
      this.dialogService.showConfirmDialog$.next(true);
      this.dialogService.title$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_TITLE);
      this.dialogService.body$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BODY_CHANGES_WILL_BE_LOST);
      this.dialogService.okButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CONFIRM);
      this.dialogService.cancelButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_GO_BACK_TO_EDIT_FORM);
      const observable = this.dialogService.canDeactivate$.asObservable();
      return observable;
    }   
  }

}
