import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'core-orgchartflex',
  templateUrl: './core-orgchartflex.component.html',
  styleUrls: ['./core-orgchartflex.component.scss']
})
export class CoreOrgchartflexComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() data!: any[];
  @Input() itemTemplate!: TemplateRef<any>;
  @Input() compactMode!: boolean;
  @Input() showDissolved!: boolean;
  @Input() width!: number;
  @Input() height!: number;
  @Output() onPrintAreaRendered = new EventEmitter(); 

  @ViewChild('container') container!: ElementRef;
  @ViewChild('parent') parent!: ElementRef;
  @ViewChild('printArea') printArea!: ElementRef;

  mouseDown = false;
  startX: any;
  scrollLeft: any;
  startY: any;
  scrollTop: any;

  scale: number = 1;

  startDragging(e: any, flag: any) {
    this.mouseDown = true;
    this.startX = e.pageX - this.parent?.nativeElement.offsetLeft;
    this.scrollLeft = this.parent?.nativeElement.scrollLeft;
    this.startY = e.pageY - this.parent?.nativeElement.offsetTop;
    this.scrollTop = this.parent?.nativeElement.scrollTop;
  }

  stopDragging(e: any, flag: any) {
    this.mouseDown = false;
  }

  moveEvent(e: any) {
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    const x = e.pageX - this.parent?.nativeElement.offsetLeft;
    const scrollX = x - this.startX;
    this.parent!.nativeElement.scrollLeft = this.scrollLeft - scrollX;
    const y = e.pageY - this.parent?.nativeElement.offsetTop;
    const scrollY = y - this.startY;
    this.parent!.nativeElement.scrollTop = this.scrollTop - scrollY;

  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['width'] || changes['height']) {
      this.setGeometricRect();
    }
  }

  ngOnInit(): void {
  }

  setGeometricRect(): void {
    const style = this.container?.nativeElement.style;
    if (!!!style) return;
    if (!!this.width) style.setProperty('--width', this.width + 'px')
    if (!!this.height) style.setProperty('--height', this.height + 'px')
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setGeometricRect();
      this.onPrintAreaRendered.emit(this.printArea)
    })
  }

  toggleExpand(e: any): void {
    e.tree$Expanded = !!!e.tree$Expanded
  }

  zoonIn(): void {
    this.scale = this.scale * 1.1;
    this.container.nativeElement.style.setProperty('--print-area-scale', this.scale)
  }

  zoonOut(): void {
    this.scale = this.scale / 1.1;
    this.container.nativeElement.style.setProperty('--print-area-scale', this.scale)
  }

  zoonFeat(): void {
    this.scale = 1;
    this.container.nativeElement.style.setProperty('--print-area-scale', this.scale)
  }

}
