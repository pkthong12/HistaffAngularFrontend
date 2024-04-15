import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomService } from '../services/dom.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit, AfterViewInit {

  tooltip: string = '';
  left: number = 0;
  top: number = 200;

  @ViewChild('container') container!: ElementRef;

  constructor(private domService: DomService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.container?.nativeElement.style.setProperty('--z-index', this.domService.getMaxZIndex() + 1)
    })
    
  }

}
