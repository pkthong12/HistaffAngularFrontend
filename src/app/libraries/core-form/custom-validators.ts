import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {

    static core(errorKey: string, valid: boolean, errorMessage: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (valid) return null;
            const result: any = {};
            result[errorKey] = [ control.value, errorMessage];
            return result;
        }
    }
}

