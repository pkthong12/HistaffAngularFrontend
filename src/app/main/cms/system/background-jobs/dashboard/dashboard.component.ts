import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppConfigService } from 'src/app/services/app-config.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  hangFireEndPoint!: SafeResourceUrl;

  constructor(private appConfigService: AppConfigService, private domSanitizer: DomSanitizer, private authService: AuthService) {
    this.hangFireEndPoint = this.domSanitizer.bypassSecurityTrustResourceUrl(this.appConfigService.BASE_URL + this.appConfigService.HANGFIRE_PATH);
    document.cookie = `HangFireCookie=${this.authService.data$.value?.token}; domain=${this.appConfigService.BASE_URL}; path=/; SameSite=None; secure`
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    document.cookie = `HangFireCookie=; Path=/`
  }

}
