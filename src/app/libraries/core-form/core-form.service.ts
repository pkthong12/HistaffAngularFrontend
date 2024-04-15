import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ControlBase } from './core-control-classes/control-base';
import { EnumFormBaseContolType, ICoreFormSection, IFormBaseControl } from './core-form/enum-interfaces';
import { Textbox } from './core-control-classes/textbox';

@Injectable({
  providedIn: 'root'
})
export class CoreFormService {

  constructor() { }

  getForm(controls: IFormBaseControl[]): Observable<ControlBase<string>[]> {

    const fiels: ControlBase<string>[] = [];

    controls.map(control => {
      switch (control.controlType) {
        case EnumFormBaseContolType.TEXTBOX:
          fiels.push(new Textbox(control))
          break;

        default:
          fiels.push(new Textbox(control))
      }
    })

    return of(fiels.sort((a, b) => a.order - b.order));

  }

  getFormBaseControlByName(sections: ICoreFormSection[], name: string): IFormBaseControl | undefined {

    let result = undefined;
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      for (let j = 0; j < s.rows.length; j++) {
        const row = s.rows[j];
        for (let k = 0; k < row.length; k++) {
          const control = row[k];
          if (control.field === name) {
            return control;
          }
        }
      }
    }
    return result;
  }

  getAllFormBaseControlNames(sections: ICoreFormSection[]): string[] {

    if (!sections) return [];

    const result: string[] = [];
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      for (let j = 0; j < s.rows.length; j++) {
        const row = s.rows[j];
        for (let k = 0; k < row.length; k++) {
          const control = row[k];
          result.push(control.field)
        }
      }
    }
    return result.sort();
  }

}
