import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { BaseComponent } from '../../base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { EnumProfileInfoSector } from 'src/app/enum/EnumProfileInfoSector';
import { CoreAccordionService } from './core-accordion.service';
export interface ICoreAccordionItem {
  id: EnumProfileInfoSector;
  header: EnumTranslateKey;
  open: boolean;
  editPath?: string;
  required?: boolean;
}

@Component({
  selector: 'core-accordion',
  templateUrl: './core-accordion.component.html',
  styleUrls: ['./core-accordion.component.scss'],
})
export class CoreAccordionComponent
  extends BaseComponent
  implements OnInit, AfterViewInit {
  @Input() sectors!: ICoreAccordionItem[];
  @Input() enableSwap!: boolean;
  @Input() refs!: TemplateRef<any>[];
  @Input() editDisabled!: boolean;
  @Input() manualHeightList!: boolean;
  @Output() onItemClick = new EventEmitter<ICoreAccordionItem>();
  @Output() onItemClickEdit = new EventEmitter<ICoreAccordionItem>();
  @Input() heightList: number[] = [];

  viewInitDone!: boolean;

  @ViewChild('container') container!: ElementRef;

  /* Before viewInitDone=true, the Accordion will calculate
    each sector content part height
  */

  constructor(public override mls: MultiLanguageService,
              public coreAccordionService : CoreAccordionService) {
    super(mls);
  }

  ngAfterViewInit(): void {

    if (!!this.manualHeightList) return;

    const sectors = this.container.nativeElement.children;
    setTimeout(() => {
      /*
      This code block calculates each sector content part height to fix them in heightList array 
      */
      let i = 0;
      for (let item of sectors) {
        const contentPart = (item as HTMLElement).lastChild as any;
        const rect = contentPart.getBoundingClientRect();
        this.heightList[i] = rect.height;
        i++;
      }
      this.viewInitDone = true;
      this.container.nativeElement.style.setProperty('--opacity', 1);
      this.coreAccordionService.heightList$.next(this.heightList)
    });


  }

  toggleOpen(item: ICoreAccordionItem, index: number, event: any) {

    // Khi transition bắt đầu, ngay lập tức set --opened-item-overflow: 'hidden'
    this.container.nativeElement.style.setProperty('--opened-item-overflow', 'hidden');

    // Đảo trạng thái trong setTimeout để chắc chắn rằng --opened-item-overflow
    // đã được cập nhật = 'hidden' tại css

    setTimeout(() => {
      if (!!item.open) {
        item.open = false;
      } else {
        item.open = true;
        if (!!this.enableSwap){
          this.sectors.filter((_, i) => i !== index).map((x) => (x.open = false));
        }
      }
      this.onItemClick.emit(item);
    })

    // Khi transition kết thúc, thong thả set --opened-item-overflow: 'visible'
    setTimeout(() => {
      this.container.nativeElement.style.setProperty('--opened-item-overflow', 'visible');
    }, 1000)
  }

  clickEdit(item: ICoreAccordionItem, e: any): void {
    e.stopPropagation();
    this.onItemClickEdit.emit(item);
    console.log("clickEdit", e)
  }
}
