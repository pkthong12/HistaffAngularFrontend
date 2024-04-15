import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomAvatarService {

  constructor() { }

  get(): string {
    return `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
  }
}
