import { Component, Input, OnInit, OnDestroy, isDevMode } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { IFormBaseControl } from '../../core-form/core-form/enum-interfaces';
import { BaseComponent } from '../../base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { AlertService } from '../../alert/alert.service';
import { noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { EnumCoreOrgTreeaAccessorMode } from '../../core-org-tree/core-org-tree/core-org-tree.component';
import { ICoreDatePickerRange } from '../../core-date-picker/core-date-picker/core-date-picker.component';

interface IError {
  key: string,
  errorMessage: string
}

@Component({
  selector: 'core-control',
  templateUrl: './core-control.component.html',
  styleUrls: ['./core-control.component.scss']
})
export class CoreControlComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() control!: IFormBaseControl;
  @Input() form!: FormGroup;
  @Input() checkError$!: BehaviorSubject<boolean>;
  @Input() rangeLimit!: ICoreDatePickerRange;

  /* START: THIS IS NATIVE FORM CONTROL */
  rawControl!: AbstractControl;
  /* END: THIS IS NATIVE FORM CONTROL */

  controlType!: string;
  required!: boolean;
  errors: IError[] = [];

  coreOrgTreeDefaultAccessorMode = EnumCoreOrgTreeaAccessorMode.CHECKED;

  constructor(public override mls: MultiLanguageService, public alertService: AlertService) {
    super(mls);
  }

  private displayValidatorNameMathchingError(): void {
    if (isDevMode()) {
      this.alertService.error(`
        '${this.control.field}' validator array definition error: validator name must equal Validators.&lt;key&gt;
      `, noneAutoClosedAlertOptions)
    }
  }

  private checkError(): void {

    if (this.rawControl.errors) {

      const newErrors: IError[] = [];
      Object.keys(this.form.controls[this.control.field].errors!).forEach(key => {
        /*  
          tanleica:
            By custom design, custom error is an array
            while built-in validator should produce an object error if any
        */
        if (this.form.controls[this.control.field].errors![key] instanceof Array) {
          newErrors.push({
            key: key,
            errorMessage: this.form.controls[this.control.field].errors![key][1]
          })
        } else {
          if (!!this.control.validators) {
            const filter = this.control.validators?.filter(x => x.name.toLowerCase() === key.toLowerCase())
            if (!!filter.length) {
              newErrors.push({
                key: key,
                errorMessage: filter![0].errorMessage!
              })
            } else {
              this.displayValidatorNameMathchingError();
            }
          } else {
            this.displayValidatorNameMathchingError();
          }
        }
      })
      this.errors = newErrors;
    } else {
      this.errors = [];
    }

  }

  private resetError(): void {
    this.errors = [];
  }

  override ngOnInit(): void {
    this.subscriptions.push(this.mls.lang$.subscribe(x => this.lang = x));
    this.controlType = this.control.controlType;
    this.required = !!this.control.validators?.filter(x => x.validator.name === 'required').length

    this.rawControl = this.form.get(this.control.field)!;

    this.subscriptions.push(
      this.rawControl?.statusChanges.subscribe(_ => {
        this.checkError();
      })
    )

    if (!!this.checkError$) {
      this.subscriptions.push(
        this.checkError$.subscribe(x => {
          if (x) {
            this.checkError();
          } else {
            this.resetError();
          }
        })
      )
    }

  }

  get isValid() { return this.form.controls[this.control.field].valid; }

  onFocus(e: any) {
    this.control.focus$?.next(e);
  }

  onBlur(e: any) {
    this.control.blur$?.next(e);
  }

}
