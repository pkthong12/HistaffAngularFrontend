import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DomService } from '../../services/dom.service';

@Component({
  selector: 'core-loading-surface',
  templateUrl: './core-loading-surface.component.html',
  styleUrls: ['./core-loading-surface.component.scss']
})
export class CoreLoadingSurfaceComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() loading!: boolean;
  @Input() height!: number;

  @ViewChild('container') container!: ElementRef;

  constructor(
    private domService: DomService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['height']) {

      this.container?.nativeElement.style.setProperty('--height', changes['height'].currentValue ? changes['height'].currentValue + 'px' : '500px');
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.container.nativeElement.style.setProperty('--z-index', this.domService.getMaxZIndex() + 1);
      this.container.nativeElement.style.setProperty('--height', !!this.height ? this.height + 'px' : '500px');
    })
  }

}
