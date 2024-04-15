import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { ICoreFormSection } from './core-form/enum-interfaces';
import { ICoreTreeGridColumnItem } from '../core-tree-grid/core-tree-grid-interfaces';

@Injectable({
  providedIn: 'root',
})
export class CoreControlService {
  constructor() {}

  toGroup(sections: ICoreFormSection[]): any {
    const group: any = {};

    sections.forEach((section) => {
      const fields = section.rows;
      fields.forEach((row) => {
        row.forEach((column) => {
          if (!!column.validators) {
            const validatorArr: ValidatorFn[] = [];
            column.validators.map((x) => {
              validatorArr.push(x.validator);
            });

            group[column.field] = new FormControl(
              { value: column.value, disabled: !!column.disabled },
              validatorArr
            );
          } else {
            group[column.field] = new FormControl({
              value: column.value,
              disabled: !!column.disabled,
            });
          }
        });
      });
    });

    return group;
  }

  toFormGroup(sections: ICoreFormSection[]): FormGroup {
    const group: any = {};

    sections.forEach((section) => {
      const fields = section.rows;
      fields.forEach((row) => {
        row.forEach((column) => {
          if (!!column.validators) {
            const validatorArr: ValidatorFn[] = [];
            column.validators.map((x) => {
              validatorArr.push(x.validator);
            });

            group[column.field] = new FormControl(
              { value: column.value, disabled: !!column.disabled },
              validatorArr
            );
          } else {
            group[column.field] = new FormControl({
              value: column.value,
              disabled: !!column.disabled,
            });
          }
        });
      });
    });

    return new FormGroup(group);
  }

  toCoreTreeGridInRowFormGroup(columns: ICoreTreeGridColumnItem[]): FormGroup {
    const group: any = {};

    columns
      .filter((c) => !!c.control)
      .forEach((column) => {
        const control = column.control!;

        if (!!control.validators) {
          const validatorArr: ValidatorFn[] = [];
          control.validators.map((x) => {
            validatorArr.push(x.validator);
          });

          group[control.field] = new FormControl(
            { value: control.value, disabled: !!control.disabled },
            validatorArr
          );
        } else {
          group[control.field] = new FormControl({
            value: control.value,
            disabled: !!control.disabled,
          });
        }
      });

    return new FormGroup(group);
  }
}
