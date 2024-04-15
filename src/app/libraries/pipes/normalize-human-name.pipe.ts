import { Pipe, PipeTransform } from '@angular/core';

export const normalizeHumanName = (value: string) => {

  if (!value) return value;

  let copy = value;
  copy = copy?.trim();
  while (copy?.indexOf('  ') >= 0) {
    copy = copy.replace('  ', ' ');
  }
  const parts = copy.split(' ');
  const newParts: string[] = [];
  parts.map(word => {
    const array = Array.from(word);
    let firstLetter = array.shift()?.toUpperCase();
    let remain = array.join('').toLowerCase();
    word = firstLetter + remain;
    newParts.push(word);
  })
  const newValue = newParts.join(' ');
  return newValue;
}

@Pipe({
  name: 'normalizeHumanName'
})
export class NormalizeHumanNamePipe implements PipeTransform {

  transform(value: string): string {
    return normalizeHumanName(value);
  }

}
