import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { DomService } from '../../services/dom.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { BaseDropdownComponent } from '../../base-dropdown/base-dropdown/base-dropdown.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { EnumIconClass } from 'src/app/enum/EnumIconClass';

interface ILanguageChangerMenuItem {
  lang: EnumTranslateKey,
  translateCode: EnumTranslateKey;
  iconClass: EnumIconClass;
}

@Component({
  selector: 'app-language-changer',
  templateUrl: './language-changer.component.html',
  styleUrls: ['./language-changer.component.scss'],
})
export class LanguageChangerComponent extends BaseDropdownComponent implements OnInit, OnDestroy {

  languages: ILanguageChangerMenuItem[] = [
    {
      lang: EnumTranslateKey.UI_LANGUAGE_CHANGER_MENU_VI,
      translateCode: EnumTranslateKey.UI_LANGUAGE_CHANGER_MENU_VIETNAMESE,
      iconClass: EnumIconClass.FLAG_OF_VIETNAME
    },
    {
      lang: EnumTranslateKey.UI_LANGUAGE_CHANGER_MENU_EN,
      translateCode: EnumTranslateKey.UI_LANGUAGE_CHANGER_MENU_ENGLISH,
      iconClass: EnumIconClass.FLAG_OF_ENGLAND
    }
  ];

  currentLang!: EnumTranslateKey;

  constructor(
    public override mls: MultiLanguageService,
    public override renderer: Renderer2,
    public override domService: DomService,
  ) {
    super(mls, renderer, domService)

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => {
        if (x === 'vi') {
          this.currentLang = EnumTranslateKey.UI_LANGUAGE_CHANGER_MENU_VI
        } else {
          this.currentLang = EnumTranslateKey.UI_LANGUAGE_CHANGER_MENU_EN
        }
      })
    )
  }

  ngAfterViewInit(): void {
    /**
    * This events get called by all clicks on the page
    */
    this.listenerFn = this.renderer.listen('window', 'click', (e: Event) => {
      /*
       * handle click outside
       */
      if (this.container && !!!this.container.nativeElement.contains(e.target)) {
        this.expandState = false;
      }
    })

    const maxZIndex = this.domService.getMaxZIndex();
    this.container.nativeElement.style.setProperty('--max-z-index', maxZIndex + 1);
    if (!!this.height) this.container.nativeElement.style.setProperty('--height', this.height);
  }

  onBlockClick(): void {
    this.expandState = !this.expandState
  }
  
  onMenuItemClick(item: ILanguageChangerMenuItem): void {
    this.mls.lang$.next(item.lang === EnumTranslateKey.UI_LANGUAGE_CHANGER_MENU_VI ? 'vi' : 'en')
    this.expandState = !this.expandState
  }

}
