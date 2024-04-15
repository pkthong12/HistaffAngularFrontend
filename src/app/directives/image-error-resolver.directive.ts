import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appImageErrorResolver]'
})
export class ImageErrorResolverDirective {

  constructor(private el: ElementRef) {
    //console.log("ImageErrorResolverDirective el", el)
  }

  @HostListener("error")
  private _() {
    this.el.nativeElement.style.display = "none";
  }

}
