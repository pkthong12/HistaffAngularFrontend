import { Pipe, PipeTransform } from '@angular/core';
import { MultiLanguageService } from '../services/multi-language.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(
    private MultiLanguageService: MultiLanguageService
  ) {}

  transform(key: string, lang: string): string {
    return this.MultiLanguageService.trans(key, lang);
  }

}
