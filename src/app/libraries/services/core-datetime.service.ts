import { Injectable } from '@angular/core';

const WEEKDAYS_SHORT: any = {
  vi: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
  en: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  ua: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
};

const WEEKDAYS: any = {
  vi: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
  en: ['Monday', 'Tuesday', 'Wenesday', 'Thurday', 'Friday', 'Saturday', 'Sunday'],
  ua: ['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота', 'Неділя'],
};

const MONTHS: any = {
  vi: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  ua: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень ', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
};

export interface IDataItem {
  date: string;
  currentMonth?: boolean;
  dateValue: Date;
}

export interface IDataRow {
  items: IDataItem[];
  mixed: boolean;
}

export interface ICalendarBody {
  rows: IDataRow[];
}

export interface IDecadeYearsObject {
  title: string;
  items: number[][];
}

export interface IMonthIdentity {
  year: number;
  monthIndex: number;
}

@Injectable({
  providedIn: 'root'
})
export class CoreDatetimeService {

  constructor() { }
  getMonthText(lang: string, monthIndex: number): string {
    /*
    monthIndex does not need to be in range [0-11].
    Thus, get the index first
    I use 2023 as computing year, but it can be whatever
    */

    const realIndex: number = (new Date(2023, monthIndex)).getMonth();

    return MONTHS[lang][realIndex];
  }

  dateToVnString(date: Date): string {
    if (typeof date.getFullYear !== 'function') {
      return date.toString();
    }
    const y = date.getFullYear();
    let m: number | string = date.getMonth() + 1;
    let d: number | string = date.getDate();
    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    return `${d}/${m}/${y}`
  }

  getShortWeekdays(lang: string) {
    return WEEKDAYS_SHORT[lang];
  }

  getWeekdays(lang: string) {
    return WEEKDAYS[lang];
  }

  getMonthNames(lang: string) {
    return MONTHS[lang];
  }

  private getMonoCalendarBody(year: number, monthIndex: number): IDataRow[] {
    /* 
    the monthIndex in Date() constructor does not need to be in range 0-11
    the day in Date() constructor does not need to be in range of positive numbers
    */
    const lastDayPreviousMonth = new Date(year, monthIndex, 0);
    const lastDPreviousMonth = lastDayPreviousMonth.getDate();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const lastD = lastDay.getDate();
    let firstWeekdayIndex = firstDay.getDay();
    let lastWeekdayIndex = lastDay.getDay();
    // Vienamese rule: Monday is the 1st day of week
    firstWeekdayIndex = firstWeekdayIndex === 0 ? 6 : firstWeekdayIndex - 1;
    lastWeekdayIndex = lastWeekdayIndex === 0 ? 6 : lastWeekdayIndex - 1;

    const newBody: IDataRow[] = [];
    let d = 0;

    // The 1st row
    let newRow: IDataItem[] = [];
    for (let i = 0; i < firstWeekdayIndex; i++) {
      newRow.push({
        date: (lastDPreviousMonth - firstWeekdayIndex + i + 1).toString(),
        dateValue: new Date(year, monthIndex - 1, lastDPreviousMonth - firstWeekdayIndex + i + 1)
      })
    }
    for (let i = firstWeekdayIndex; i < 7; i++) {
      newRow.push({
        date: (i - firstWeekdayIndex + 1).toString(),
        dateValue: new Date(year, monthIndex, i - firstWeekdayIndex + 1)
      })
      d++;
    }
    newBody.push({
      items: newRow,
      mixed: !!firstWeekdayIndex
    });

    // The next rows
    d++;
    let weekDayIndex = 0;
    newRow = [];
    for (d; d <= lastD; d++) {
      newRow.push({
        date: d.toString(),
        dateValue: new Date(year, monthIndex, d)
      })
      weekDayIndex++;
      if (weekDayIndex === 7) {
        newBody.push({
          items: newRow,
          mixed: false,
        });
        newRow = [];
        weekDayIndex = 0;
      }
    }

    /*
     the last row exists only when weekDayIndex !== 0
     (means previous row has not been pushed to newBody)
    */

    if (weekDayIndex !== 0) {
      let i = 1;
      for (weekDayIndex; weekDayIndex < 7; weekDayIndex++) {
        newRow.push({
          date: i.toString(),
          dateValue: new Date(year, monthIndex + 1, i)
        })
        i++;
      }
      newBody.push({
        items: newRow,
        mixed: true
      });
    }

    return newBody;
  }

  /*
    direction: 0 | 1 | -1
    0: mono
    1: go foreward
    -1: go backward  
  */
  getCalendarBody(year: number, monthIndex: number, direction: number = 0): ICalendarBody {
    let month1: IDataRow[];
    let month2: IDataRow[];
    let reduced: IDataRow[] = [];
    let merged: IDataRow[];

    const debugCondition = year === 2023 && monthIndex === 6 && direction === 1

    if (direction === 0) {
      merged = this.getMonoCalendarBody(year, monthIndex);
      reduced = [];
    } else if (direction === 1) {
      month1 = this.getMonoCalendarBody(year, monthIndex - 1);
      month2 = this.getMonoCalendarBody(year, monthIndex);
      reduced = [...month1];
      if (month1[month1.length - 1].mixed) reduced = month1.filter((_, index) => index !== (month1.length - 1));
      merged = [...reduced, ...month2];
      if (debugCondition) console.log("reduced", reduced)
    } else if (direction === -1) {
      month1 = this.getMonoCalendarBody(year, monthIndex);
      month2 = this.getMonoCalendarBody(year, monthIndex + 1);
      reduced = [...month2];
      if (month2[0].mixed) reduced = month2.filter((_, index) => index !== 0);
      merged = [...month1, ...reduced];
    }
    merged!.map(row => {
      row.items.map(item => {
        if (item.dateValue.getMonth() === monthIndex) {
          item.currentMonth = true;
        }
      })
    })
    return {
      rows: merged!
    };
  }

  getLastDateOfMonth(year: number, monthIndex: number): Date {
    return new Date(year, monthIndex + 1, 0);
  }

  getDecadeYearsObject(currentYear: number): IDecadeYearsObject {
    const from = Math.floor(currentYear / 10) * 10;
    const title = `${from} - ${from + 9}`;
    const items: number[][] = [
      [from, from + 1, from + 2],
      [from + 3, from + 4, from + 5],
      [from + 6, from + 7, from + 8],
      [from + 9]
    ]
    return {
      title, items
    }
  }

  
  /* THIS FUNCTION WAS COPIED FROM THE INTERNET. PLEASE CHECK IT CAREFULLY LATER */
  isDateString(date: string): boolean {
    /* RegExp is a magic object */
    const _regExp = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$');
    return _regExp.test(date);
  }

  monthIdentityToMonthString(monthIdentity: IMonthIdentity): string {
    const year = monthIdentity.year;
    const month = monthIdentity.monthIndex + 1;
    if (month < 10) {
      return `${year}-0${month}`;
    } else {
      return `${year}-${month}`;
    }
  }

  dateToMonthString(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    if (month < 10) {
      return `${year}-0${month}`;
    } else {
      return `${year}-${month}`;
    }
  }

}
