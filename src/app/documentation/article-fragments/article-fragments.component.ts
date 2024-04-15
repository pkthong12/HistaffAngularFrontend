import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomService } from 'src/app/libraries/services/dom.service';
import { ArticleService } from '../article.service';
import { IFragment } from '../IFragment';

@Component({
  selector: 'app-article-fragments',
  templateUrl: './article-fragments.component.html',
  styleUrls: ['./article-fragments.component.scss']
})
export class ArticleFragmentsComponent implements OnInit, AfterViewInit {

  @Input() postId!: number;
  @Input() fragments!: IFragment[];

  @ViewChild('container') container!: ElementRef;

  shown!: boolean;

  constructor(
    private domService: DomService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.articleService.showFragments$.subscribe(x => this.shown = x);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.container.nativeElement.style.setProperty('--z-index', this.domService.getMaxZIndex() + 1));
  }

  hideMe(): void {
    this.articleService.showFragments$.next(false);
  }


}
