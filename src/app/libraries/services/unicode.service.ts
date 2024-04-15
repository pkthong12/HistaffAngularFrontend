import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnicodeService {

  constructor() { }

  viToEn(input: string): string {
    const outputArr: string[] = [];
    for (let i = 0; i < input.length; i++) {
      let ch = input[i];
      const isUpperCase = ch.toUpperCase() === ch;
      ch = ch.toLowerCase();
      // TO BE IMPORVED LATTER
      if (ch === 'đ') ch = 'd';
      if (ch === 'ô' || ch === 'ổ' ) ch = 'o';
      if (ch === 'ơ') ch = 'o';
      if (ch === 'â') ch = 'a';
      if (ch === 'ă') ch = 'a';
      if (isUpperCase) ch = ch.toUpperCase();
      outputArr.push(ch);
    }
    return outputArr.join();
  }

}
