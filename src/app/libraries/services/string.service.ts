import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringService {

  constructor() { }

  sort(input: any[], key: string): void {
    input.sort(
      (a: any, b: any) => {
        const a1 = this.viToEn(a[key])
        const b1 = this.viToEn(b[key])
        if (a1 < b1) return -1;
        if (a1 === b1) return 0;
        if (a1 > b1) return 1;
        return 0;
      }
    )
  }

  viToEn(input: string): string {
    const charConvert = (char: string) => {
      const isUpperCase = char.toUpperCase() === char;
      let ch = char?.toLowerCase();
      // TO BE IMPORVED LATTER
      switch (ch) {
        case 'đ':
          ch = 'd';
          break;
        case 'á':
        case 'à':
        case 'ả':
        case 'ã':
        case 'ạ':
        case 'â':
        case 'ấ':
        case 'ầ':
        case 'ẩ':
        case 'ẫ':
        case 'ậ':
          ch = 'a';
          break;
        case 'ú':
        case 'ù':
        case 'ủ':
        case 'ũ':
        case 'ụ':
        case 'ư':
        case 'ứ':
        case 'ừ':
        case 'ử':
        case 'ữ':
        case 'ự':
          ch = 'u';
          break;
        case 'ó':
        case 'ò':
        case 'ỏ':
        case 'õ':
        case 'ọ':
        case 'ô':
        case 'ố':
        case 'ồ':
        case 'ổ':
        case 'ỗ':
        case 'ộ':
        case 'ơ':
        case 'ớ':
        case 'ờ':
        case 'ở':
        case 'ỡ':
        case 'ợ':
          ch = 'o';
          break;
        case 'í':
        case 'ì':
        case 'ỉ':
        case 'ĩ':
        case 'ị':
          ch = 'i';
          break;
        case 'ý':
        case 'ỳ':
        case 'ỷ':
        case 'ỹ':
        case 'ỵ':
          ch = 'y';
          break;
        case 'é':
        case 'è':
        case 'ẻ':
        case 'ẽ':
        case 'ẹ':
        case 'ê':
        case 'ế':
        case 'ề':
        case 'ể':
        case 'ễ':
        case 'ệ':
          ch = 'e';
          break;
        default:
          break;
      }
      if (isUpperCase) ch = ch.toUpperCase();
      return ch;
    }

    const outputArr: string[] = [];
    for (let i = 0; i < input.length; i++) {
      let ch = input[i];
      outputArr.push(charConvert(ch));
    }
    const result = outputArr.join('');
    return result;
  }
}
