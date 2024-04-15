import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { DomService } from '../services/dom.service';

@Component({
  selector: 'app-fullscreen-modal-loader',
  templateUrl: './fullscreen-modal-loader.component.html',
  styleUrls: ['./fullscreen-modal-loader.component.scss']
})
export class FullscreenModalLoaderComponent implements OnInit, AfterViewInit {

  @Input() content!: TemplateRef<any>;

  @ViewChild('container') container!: ElementRef;

  constructor(private domService: DomService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const newZIndex = this.domService.getMaxZIndex() + 1;
      this.container.nativeElement.style.setProperty('--z-index', newZIndex);
    });
  }

}
