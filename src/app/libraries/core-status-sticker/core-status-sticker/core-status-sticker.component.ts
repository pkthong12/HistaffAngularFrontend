import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { LayoutService } from 'src/app/services/layout.service';
import { UnicodeService } from '../../services/unicode.service';
import { StringService } from '../../services/string.service';

export interface IStickerColorSchema {
  code: string;
  bachgroundColor: string;
  color: string;
}

export const STICKER_COLOR_SCHEMA: IStickerColorSchema[] = [
  {
    code: 'Chờ phê duyệt',
    bachgroundColor: '#FFF7E4',
    color: '#FFC542'
  },
  {
    code: 'Đã phê duyệt',
    bachgroundColor: '#E8FFF6',
    color: '#3DD598'
  },
  {
    code: 'Áp dụng',
    bachgroundColor: '#E2F2FF',
    color: '#07B7EE'
  },
  {
    code: 'Ngừng áp dụng',
    bachgroundColor: '#FFEAEA',
    color: '#EF2B58'
  },
  {
    code: 'Không phê duyệt',
    bachgroundColor: '#FFEAEA',
    color: '#EF2B58'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: 'Áp dụng',
    bachgroundColor: '#E2F2FF',
    color: '#07B7EE'
  },
  {
    code: 'Ngừng áp dụng',
    bachgroundColor: '#FFEAEA',
    color: '#EF2B58'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
  {
    code: '#',
    bachgroundColor: '#',
    color: '#'
  },
]

@Component({
  selector: 'core-status-sticker',
  templateUrl: './core-status-sticker.component.html',
  styleUrls: ['./core-status-sticker.component.scss']
})
export class CoreStatusStickerComponent extends BaseComponent implements AfterViewInit {

  @Input() code!: string;

  backgroundColor!: string;
  color!: string;
  height!: string;

  constructor(
    public override mls: MultiLanguageService,
    private layoutService: LayoutService,
    private stringService: StringService
  ) {
    super(mls);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {

      const tryFind = STICKER_COLOR_SCHEMA.filter(x => {
        return this.stringService.viToEn(x.code) === this.stringService.viToEn(this.code)
      });
      if (!!tryFind.length) {
        this.backgroundColor = tryFind[0].bachgroundColor;
        this.color = tryFind[0].color;
      } else {
        this.backgroundColor = 'transparent';
        this.color = 'inherit';
      }
      
      this.height = this.layoutService.formControlHeight + 'px';

    })
  }

}
