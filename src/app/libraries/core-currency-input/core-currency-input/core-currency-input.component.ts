import { Component, Input, OnInit } from '@angular/core';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'core-currency-input',
  templateUrl: './core-currency-input.component.html',
  styleUrls: ['./core-currency-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreCurrencyInputComponent
    }
  ]
})
export class CoreCurrencyInputComponent extends CoreFormControlBaseComponent implements OnInit {

  @Input() currencySign!: string;

  IGNORED_CODES: string[] = [
    "ArrowRight",
    "ArrowLeft",
    "ArrowUp",
    "ArrowDown",
    "End",
    "Home",
    "Shift",
    "NumLock"
  ]

  override value: number | null | undefined;

  textValue!: string;

  constructor() { 
    super();
    if (!!!this.currencySign) this.currencySign = "";
  }

  override writeValue(obj: number | null | undefined): void {
    this.value = obj;
    if (!!!obj) {
      this.textValue = '';
    } else {
      this.textValue = this.formatNumber(obj!.toString());
    }
  }

  ngOnInit(): void {
  }

  onKeyUp(e: any): void {
    if (this.readonly || this.disabled) return;
    console.log("onKeyUp", e)
    if (this.IGNORED_CODES.indexOf(e.key)>=0) return; 
    this.formatCurrency(e);
  }

  onBlur(e: any): void {
    if (this.readonly || this.disabled) return;
    console.log("onBlur", e)
  }

  formatNumber(n: any): string {
    // format number 1000000 to 1,234,567

    if (!!!n || n === '') {
      return '';
    } else {
      if(n.includes('.')){ //Some numbers are decimals and need to have the "." character removed.
        if(Number(Array.from(n.split('.')[1])[0]) >= 5){ //if first element after "." character > 5
          n = (Number(n.split('.')[0]) + 1).toString()//add 1 into current number then parse toString
        }else{
          n = n.split('.')[0]
        }
      }
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  
  
  formatCurrency(e: any, blur: boolean = false) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.
    
    // get input value
    var input_val = e.target.value;
    
    // don't validate empty input
    if (input_val === "") { 
      this.writeValue(null);
      this.markAsTouched();
      this.onChange(null);
      return; 
    }
    
    // original length
    var original_len = input_val.length;
  
    // initial caret position 
    var caret_pos = e.target.selectionStart;
      
    // check for decimal
    if (input_val.indexOf(".") >= 0) {
  
      // get position of first decimal
      // this prevents multiple decimals from
      // being entered
      var decimal_pos = input_val.indexOf(".");
  
      // split number by decimal point
      var left_side = input_val.substring(0, decimal_pos);
      var right_side = input_val.substring(decimal_pos);
  
      // add commas to left side of number
      left_side = this.formatNumber(left_side);
  
      // validate right side
      right_side = this.formatNumber(right_side);
      
      // On blur make sure 2 numbers after decimal
      if (!!blur) {
        right_side += "00";
      }
      
      // Limit decimal to only 2 digits
      right_side = right_side.substring(0, 2);
  
      // join number by .
      input_val = this.currencySign + left_side + "." + right_side;
  
    } else {
      // no decimal entered
      // add commas to number
      // remove all non-digits
      input_val = this.formatNumber(input_val);
      input_val = this.currencySign + input_val;
      
      // final formatting
      if (!!blur) {
        input_val += ".00";
      }
    }
    
    // send updated string to input
    this.textValue = input_val;
    if (!!!this.textValue || this.textValue === '') {
      this.writeValue(null);
    } else {
      this.writeValue(Number(this.textValue.split(',').join('')));
    }
    
    this.markAsTouched();
    this.onChange(this.value);
  
    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    e.target.setSelectionRange(caret_pos, caret_pos);
  }

}
