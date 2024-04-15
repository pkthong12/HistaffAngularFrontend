import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnumTranslateKey } from '../enum/EnumTranslateKey';
import { AppInitializationService } from '../services/app-initialization.service';
import { AppConfigService } from '../services/app-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  title: EnumTranslateKey = EnumTranslateKey.UI_COMMON_EMPTY_STRING;

  logo!: string;
  homeBg!: string;

  constructor(
    private router: Router,
    private appInitializationService: AppInitializationService,
    private appConfigService: AppConfigService
  ) { }

  ngOnInit(): void {
    this.homeBg = this.appConfigService.HOME_BACKGROUND_IMAGE;
  }

  ngAfterViewInit(): void {
    //setTimeout(()=> this.router.navigateByUrl("/cms/organize/orgchart-tree"), 2000)
  }

}
