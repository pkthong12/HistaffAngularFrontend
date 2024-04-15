import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Injector, SimpleChanges, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, /*NgControl*/ } from '@angular/forms';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'core-checkbox',
  templateUrl: './core-checkbox.component.html',
  styleUrls: ['./core-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreCheckboxComponent
    }
  ]
})
export class CoreCheckboxComponent extends CoreFormControlBaseComponent implements OnInit, ControlValueAccessor, OnDestroy, OnChanges {
  @Input() text!: string;
  @Input() tooltipPosition!: string;
  @Input() tooltip!: string;
  @Input() inputValue!: boolean;
  @Input() override disabled!: boolean;
  @Output() onClick = new EventEmitter<boolean>()
  lang!: string;
  subscriptions: Subscription[] = [];
  // ngControl!: NgControl;

  constructor(
    private mls: MultiLanguageService,
    // private injector: Injector
  ) {
    super();
  }

  ngOnInit(): void {
    //this.ngControl = this.injector.get(NgControl);
    //console.log("CoreCheckboxComponent", this.ngControl.name + ": " + this.inputValue)
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
   
  }

  ngOnChanges(e: SimpleChanges): void {
    if (!!e['inputValue'])
      this.writeValue(e['inputValue'].currentValue)
  }

  override writeValue(obj: boolean): void {
    this.value = obj;
  }

  onLabelClick(_: any) {
    if(this.disabled == true){
      return
    }
    this.value = !this.value;
    this.onClick.emit(this.value);
    // property touch to use when action this control then run logic ...
    this.markAsTouched();
    this.onChange(this.value);
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

}
