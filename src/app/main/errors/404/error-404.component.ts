import { Component, ViewEncapsulation } from '@angular/core';

import { AnimatedTextService } from 'src/app/libraries/animated-text/animated-text.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';

@Component({
    selector: 'app-error-404',
    templateUrl: './error-404.component.html',
    styleUrls: ['./error-404.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Error404Component extends BaseComponent {

    gobackLink: string = EnumTranslateKey.GO_BACK_HOME;

    constructor(
        private animatedTextService: AnimatedTextService,
        public override mls: MultiLanguageService,
    ) {
        super(mls);
        this.animatedTextService.text$.next(
            this.mls.trans(EnumTranslateKey.PAGE_NOT_FOUND_404)
        )
    }
}
