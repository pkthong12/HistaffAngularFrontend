import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AnimatedTextService } from '../animated-text.service';
import { Subscription } from 'rxjs';

declare let d3: any;
const d3_select = d3.select;
const d3_shuffle = d3.shuffle;

interface ILetterItem {
  letter: string;
  pos: number;
  index: number;
}

@Component({
  selector: 'app-animated-text',
  templateUrl: './animated-text.component.html',
  styleUrls: ['./animated-text.component.scss']
})
export class AnimatedTextComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('letters') letters!: ElementRef;

  subscriptions: Subscription[] = [];

  data!: ILetterItem[];
  allowLoop: boolean = true;

  LETTER_WIDTH: number = 22;
  WIDTH!: number;
  HEIGHT: number = 80;

  svg!: any;

  constructor(private animatedTextService: AnimatedTextService) { }

  ngOnInit(): void {

    this.subscriptions.push(
      this.animatedTextService.text$.subscribe(newText => {
        const newData: ILetterItem[] = [];
        newText.split('').map((x, i) => newData.push({ letter: x, pos: i, index: i }))
        this.data = newData;
        this.WIDTH = this.LETTER_WIDTH * this.data.length;
      })
    );

  }

  ngAfterViewInit(): void {
    this.svg = d3_select(this.letters.nativeElement).append('svg')
      .attr('width', this.WIDTH)
      .attr('height', this.HEIGHT)
      .append('g')
      .attr('transform', 'translate(0,' + (this.HEIGHT / 2) + ')');

    this.loop();
  }

  update(data: ILetterItem[]): void {
    const text = this.svg.selectAll('text').data(data, (d: ILetterItem) => d.index);
    text.enter().append('text')
      .attr('fill', (d: ILetterItem) => ['!', '?', '.'].includes(d.letter)  ? 'tomato' : '#FFFFFF')
      .attr('x', (d: ILetterItem, _: number) => this.LETTER_WIDTH * d.pos)
      .style('font-size', '40px')
      .style('font-family', 'monospace')
      .text((d: ILetterItem) => d.letter)
      .merge(text)
      .transition().duration(1000)
      .attr('x', (d: ILetterItem, _: number) => this.LETTER_WIDTH * d.pos);
  }

  loop(): void {
    if (!!!this.allowLoop) return;
    this.update(this.data);
    setTimeout(() => {
      this.data = d3_shuffle(this.data).map((d: ILetterItem, i: number) => {
        d.pos = i;
        return d;
      });
      this.update(this.data);
      setTimeout(() => {
        this.data = this.data.map((d: ILetterItem, _: number) => {
          d.pos = d.index;
          return d;
        });
        this.loop();
      }, 2000);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.allowLoop = false;
    this.subscriptions.map(x => x?.unsubscribe());
  }

}
