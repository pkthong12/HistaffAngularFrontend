import { Pipe, PipeTransform } from '@angular/core';
import { EnumCoreTablePipeType } from '../core-table/EnumCoreTablePipeType';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';

import { normalizeHumanName } from './normalize-human-name.pipe';
import { utc } from 'moment';

@Pipe({
  name: 'tableCell'
})
export class TableCellPipe implements PipeTransform {

  constructor(private mls: MultiLanguageService) {
  }

  transform(value: any, pipe: string | undefined, lang: string): any {

    if (value === null || value === undefined || value === '') return value;
    if (pipe === undefined) return value;

    const availableTypes: string[] = [
      EnumCoreTablePipeType.DATE,
      EnumCoreTablePipeType.NUMBER,
      EnumCoreTablePipeType.DATE_TIME,
      EnumCoreTablePipeType.TIME_HHMM,
      EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      EnumCoreTablePipeType.BOOLEAN_TO_YES_NO,
      EnumCoreTablePipeType.BOOLEAN_TO_DONE_NOTYET,
      EnumCoreTablePipeType.BOOLEAN_TO_ACTIVE_INACTIVE,
      EnumCoreTablePipeType.LOWERCASE,
      EnumCoreTablePipeType.UPPERCASE,
      EnumCoreTablePipeType.NORMALIZE_HUMAN_NAME,
      EnumCoreTablePipeType.DECIMAL_TO_FIX_2,
      EnumCoreTablePipeType.DECIMAL_TO_FIX_3,
      EnumCoreTablePipeType.DECIMAL_TO_FIX_5,
    ];

    if (!!!availableTypes.includes(pipe)) return value;

    let y, m, d, hh, mm, ss;
    // Get minutes different between local date and UTC time zone
    const offset = (new Date()).getTimezoneOffset();
    try {

      switch (pipe!) {
        case EnumCoreTablePipeType.LOWERCASE:
          return value.toString().toLowerCase();
        case EnumCoreTablePipeType.UPPERCASE:
          return value.toString().toUpperCase();
        case EnumCoreTablePipeType.NORMALIZE_HUMAN_NAME:
          return normalizeHumanName(value);
        case EnumCoreTablePipeType.NUMBER:
          value = new Intl.NumberFormat('en-US', { maximumSignificantDigits: (value).length }).format(value);
          return value;
        case EnumCoreTablePipeType.DECIMAL_TO_FIX_2:
          return value.toFixed(2);
        case EnumCoreTablePipeType.DECIMAL_TO_FIX_3:
          return value.toFixed(3);
        case EnumCoreTablePipeType.DECIMAL_TO_FIX_5:
          return value.toFixed(5);
        case EnumCoreTablePipeType.DATE:

          /* Convert from UTC to local date */
          const originalValue = new Date(value);
          const local = new Date(originalValue.getTime() - offset * 60000);
          /*----------------------------------------*/

          y = local?.getFullYear();
          m = local?.getMonth() + 1;
          d = local?.getDate();

          switch (lang) {
            case 'vi':
              m = Number(m) < 10 ? '0' + m : m;
              d = Number(d) < 10 ? '0' + d : d;
              if (typeof local?.getFullYear === 'function') {
                return `${d}/${m}/${y}`;
              } else {
                return value;
              }
            case 'en':
              if (typeof local?.getFullYear === 'function') {
                return `${m}/${d}/${y}`;
              } else {
                return value;
              }
            default:
              return value;
          }
        case EnumCoreTablePipeType.DATE_TIME:

          // Convert from UTC to local datetme
          const originalDate: Date = new Date(value);
          const dateValue = new Date(originalDate.getTime() - offset * 60000);
          /*----------------------------------------*/

          y = dateValue?.getFullYear();
          m = dateValue?.getMonth() + 1;
          d = dateValue?.getDate();
          hh = dateValue?.getHours();
          mm = dateValue?.getMinutes();
          ss = dateValue?.getSeconds();
          hh = Number(hh) < 10 ? '0' + hh : hh;
          mm = Number(mm) < 10 ? '0' + mm : mm;
          ss = Number(ss) < 10 ? '0' + ss : ss;

          switch (lang) {
            case 'vi':
              m = Number(m) < 10 ? '0' + m : m;
              d = Number(d) < 10 ? '0' + d : d;
              if (typeof dateValue?.getFullYear === 'function') {
                return `${d}/${m}/${y} ${hh}:${mm}:${ss}`;
              } else {
                return value;
              }
            case 'en':
              if (typeof dateValue?.getFullYear === 'function') {
                return `${m}/${d}/${y} ${hh}:${mm}:${ss}`;
              } else {
                return value;
              }
            default:
              return value;
          }
        case EnumCoreTablePipeType.TIME_HHMM:
          value = new Date(value);
          hh = value?.getHours();
          mm = value?.getMinutes();
          hh = Number(hh) < 10 ? '0' + hh : hh;
          mm = Number(mm) < 10 ? '0' + mm : mm;
          if (typeof value?.getFullYear === 'function') {
            return `${hh}:${mm}`;
          } else {
            return value;
          }
        case EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE:
          return !!value ?
            this.mls.trans(EnumTranslateKey.UI_COMMON_BOOLEAN_TO_TRUE, lang) :
            this.mls.trans(EnumTranslateKey.UI_COMMON_BOOLEAN_TO_FALSE, lang);

        case EnumCoreTablePipeType.BOOLEAN_TO_YES_NO:
          return !!value ?
            this.mls.trans(EnumTranslateKey.UI_COMMON_BOOLEAN_TO_YES, lang) :
            this.mls.trans(EnumTranslateKey.UI_COMMON_BOOLEAN_TO_NO, lang);

        case EnumCoreTablePipeType.BOOLEAN_TO_DONE_NOTYET:
          return !!value ?
            this.mls.trans(EnumTranslateKey.UI_COMMON_BOOLEAN_TO_DONE, lang) :
            this.mls.trans(EnumTranslateKey.UI_COMMON_BOOLEAN_TO_NOT_YET, lang);
        case EnumCoreTablePipeType.BOOLEAN_TO_ACTIVE_INACTIVE:
          return !!value ?
            this.mls.trans(EnumTranslateKey.UI_COMMON_BOOLEAN_TO_ACTIVE, lang) :
            this.mls.trans(EnumTranslateKey.UI_COMMON_BOOLEAN_TO_INACTIVE, lang);
        default:
          return value;
      }
    } catch (e) {
      console.error("Error processing tablePipe for ", value, typeof value, e)
      return value;
    }
  }

}
