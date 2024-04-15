import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor() { }

  stringify(obj: any): string {

    const replacer = (_: string, value: any) => {
      if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    }


    let cache: any = [];
    let str = JSON.stringify(obj, replacer);
    cache = null; // reset the cache
    
    return str;
  }

}
