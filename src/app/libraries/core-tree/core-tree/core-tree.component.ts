import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, TemplateRef, Output, EventEmitter } from '@angular/core';
import { DomService } from '../../services/dom.service';

@Component({
  selector: 'core-tree',
  templateUrl: './core-tree.component.html',
  styleUrls: ['./core-tree.component.scss']
})
export class CoreTreeComponent implements OnInit, AfterViewInit {

  @Input() data!: any[];

  /* To fit inside container, cardTemplate needs to have width not wider than
    shortener container minus cardBorderSize * 2 (those for longlychildren group with indent)
  */
  @Input() cardTemplate!: TemplateRef<any>;

  @Input() wrapLastLevel: boolean = true;
  @Input() showNodes: boolean = true;
  @Input() showCells: boolean = false; // for debugging

  @Input() minHeight!: string;
  @Input() background!: string;
  @Input() cardWidth: string = '200px';
  @Input() cardHeight: string = '100px';
  @Input() cardBorderSize: string = '5px';
  @Input() cardBorderColor!: string;
  @Input() cardBorderRadius!: string;
  @Input() cardBackground!: string;
  @Input() cardPadding!: string;
  @Input() connectingLineVPadding: string = '20px';
  @Input() lonelyChildrenVSpacing: string = '12px';
  @Input() tierBlockIndent: string =  '40px';
  @Input() blockHorizontalSpacing!: string;
  @Input() lineColor!: string;
  @Input() lineSize: string = '5px';
  @Input() lineConnerBorderRadius: string = '10px';

  @Input() nodeSize!: string;
  @Input() nodeBorderSize!: string;
  @Input() nodeBorderColor!: string;

  @Output() onItemClick = new EventEmitter<any>();

  @ViewChild('container') container!: ElementRef;


  lonelyChildrenItemBeforeHeight!: number;
  mobileMode!: boolean;


  constructor(
    private domService: DomService,
  ) { }

  ngOnInit(): void {
    /*
      Find input possible errors
    */

    /*
      Please provide lineSize, lineConnerBorderRadius and connectingLineVPadding in 'px' if any
    */
    const lineSizeUnit = this.domService.getCssStringSizeUnit(this.lineSize);
    const lineConnerBorderRadiusUnit = this.domService.getCssStringSizeUnit(this.lineConnerBorderRadius);
    const connectingLineVPaddingUnit = this.domService.getCssStringSizeUnit(this.connectingLineVPadding);
    if (
      lineSizeUnit !== 'px' ||
      lineConnerBorderRadiusUnit !== 'px' ||
      connectingLineVPaddingUnit !== 'px'
    ) {
      console.group("<tanleica-org-chart-multi> input error:")
      console.error(`
        For the chart to render correctly, if you provide lineSize, lineConnerBorderRadius or connectingLineVPadding, please use 'px' as their unit.
        The current incorrected value(s) is/are:
        ${lineSizeUnit !== 'px' ? 'lineSize = "' + this.lineSize + '"' : ''}
        ${lineConnerBorderRadiusUnit !== 'px' ? 'lineConnerBorderRadius = "' + this.lineConnerBorderRadius + '"' : ''}
        ${connectingLineVPaddingUnit !== 'px' ? 'connectingLineVPadding = "' + this.connectingLineVPadding + '"' : ''}
      `)
      console.groupEnd();
    }

    /* cardWidth and cardWidth are required */
    if (!!!this.cardWidth || !!!this.cardHeight) {
      console.group("<tanleica-org-chart-multi> input error:")
      console.error(`
      For the chart to render correctly, you must provide cardWidth and cardHeight exact property values.
      
      For example: cardWidth='200px' cardHeight='100px'
      `)
      console.groupEnd();
    }

    /*
      lineSize must be not greater than connectingLineVPadding
    */
    const lineSize = this.domService.cssStringSizeToNumber(this.lineSize)!;
    const connectingLineVPadding = this.domService.cssStringSizeToNumber(this.connectingLineVPadding)!;
    if (lineSize > connectingLineVPadding) {
      console.group("<tanleica-org-chart-multi> input error:")
      console.error(`
      lineSize must be not greater than connectingLineVPadding.
      The current incorrected value(s) is/are:
      lineSize = "${this.lineSize}"
      connectingLineVPadding = "${this.connectingLineVPadding}"
      `)
      console.groupEnd();
    }

    /*
      Calculate --lonely-children-item-before-height
    */
    const lineConnerBorderRadius = this.domService.cssStringSizeToNumber(this.lineConnerBorderRadius)!;
    
    if (lineConnerBorderRadius < lineSize) {
      this.lonelyChildrenItemBeforeHeight = lineSize;
    } else {
      this.lonelyChildrenItemBeforeHeight = lineConnerBorderRadius;
    }

    /* 
      Cut off lineConnerBorderRadius if the value is greater than
      sum (cardHeight + lonelyChildrenVSpacing + lineSize)
    */
    let lineConnerBorderRadiusNumberValue = this.domService.cssStringSizeToNumber(this.lineConnerBorderRadius)!;
    const cardHeightNumberValue = this.domService.cssStringSizeToNumber(this.cardHeight)!;
    const lonelyChildrenVSpacingNumberValue = this.domService.cssStringSizeToNumber(this.lonelyChildrenVSpacing)!;
    const lineSizeNumberValue = this.domService.cssStringSizeToNumber(this.lineSize)!;

    if (lineConnerBorderRadiusNumberValue > (cardHeightNumberValue + lonelyChildrenVSpacingNumberValue + lineSizeNumberValue)) {
      this.lineConnerBorderRadius = cardHeightNumberValue + lonelyChildrenVSpacingNumberValue + lineSizeNumberValue + 'px';
      console.group("<tanleica-org-chart-multi> input warning:")
      console.warn(`
      The value of lineConnerBorderRadius you provided is too big and does not fit geometric logic and has been cut off.
      `);

      console.groupEnd();
    }

  }

  ngAfterViewInit(): void {
    const style = this.container.nativeElement.style;
    style.setProperty('--min-height', this.minHeight || '500px');
    style.setProperty('--background', this.background || 'white');
    style.setProperty('--card-width', this.cardWidth || '200px');
    style.setProperty('--card-height', this.cardHeight || '100px');
    style.setProperty('--card-border-size', this.cardBorderSize || '5px');
    style.setProperty('--card-border-color', this.cardBorderColor || '#DADADA');
    style.setProperty('--card-border-radius', this.cardBorderRadius || '10px');
    style.setProperty('--card-background', this.cardBackground || 'white');
    style.setProperty('--card-padding', this.cardTemplate ? '0px' : (this.cardPadding || '5px'));
    style.setProperty('--connecting-line-v-padding', this.connectingLineVPadding || '20px');
    style.setProperty('--lonely-children-v-spacing', this.lonelyChildrenVSpacing || '12px');
    style.setProperty('--block-horizontal-spacing', this.blockHorizontalSpacing || '24px');
    style.setProperty('--line-color', this.lineColor || '#C5C5C5');
    style.setProperty('--line-size', this.lineSize || '5px');
    style.setProperty('--line-conner-border-radius', this.lineConnerBorderRadius || '10px');
    style.setProperty('--lonely-children-item-before-height', this.lonelyChildrenItemBeforeHeight + 'px');
    style.setProperty('--tier-block-indent', this.tierBlockIndent);
    style.setProperty('--node-size', this.nodeSize || '20px');
    style.setProperty('--node-border-size', this.nodeBorderSize || '5px');
    style.setProperty('--node-border-color', this.nodeBorderColor || 'white');

    /*
      Try to check cardTemplate size
    */
    if (!!this.cardTemplate) {
      console.log(`cardTemplate:`, this.cardTemplate)
      //const rect = this.cardTemplate.elementRef.nativeElement.getBoundingClientRect();
      //console.log(`cardTemplate dimensions: ${rect.width} * ${rect.height}`)
    }
  }

  onItemClickLocal(arg: any): void {
    console.log(arg)
    this.onItemClick.emit(arg);
  }

}
