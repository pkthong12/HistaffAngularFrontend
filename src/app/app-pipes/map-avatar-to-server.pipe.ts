import { Pipe, PipeTransform } from '@angular/core';
import { AppConfigService } from '../services/app-config.service';

@Pipe({
  name: 'mapAvatarToServer'
})
export class MapAvatarToServerPipe implements PipeTransform {

  constructor(private appConfigService: AppConfigService){}

  transform(value: string | null | undefined): string {
    if (!!!value) return value!;
    if (value!.toString().indexOf('https://')>=0 || value!.toString().indexOf('http://')>=0) return value!;
    let result: string = '';
      result = `${this.appConfigService.BASE_URL}/${this.appConfigService.STATIC_FOLDER}/${this.appConfigService.AVATAR_FOLDER}/${value}`;
    return result;
  }

}
