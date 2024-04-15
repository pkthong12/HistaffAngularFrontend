import { Component, OnDestroy, OnInit, ViewChild, TemplateRef, AfterViewInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AppInitializationService } from "./services/app-initialization.service";
import { AuthService } from "./services/auth.service";
import { AppConfigService } from "./services/app-config.service";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('animatedText') animatedText!: TemplateRef<any>;

  authenticated!: boolean;

  navigation: any;
  isCorrectDomain!: boolean;
  initializing: boolean = true;
  ssoProcessing: boolean = false;
  ssoPendingAuthDataExist!: boolean;

  subscriptions: Subscription[] = []

  constructor(
    private appInitializationService: AppInitializationService,
    public appConfigService: AppConfigService,
    private authService: AuthService,
  ) {
    this.subscriptions.push(
      this.appInitializationService.initializing$.subscribe(x => {
        console.log("App initialized...");
        this.initializing = x;
      })
    )
    this.subscriptions.push(
      this.appInitializationService.ssoProcessing$.subscribe(x => {
        this.ssoProcessing = x;
      })
    )
    this.subscriptions.push(
      this.appInitializationService.pendingAuthData$.subscribe(x => {
        this.ssoPendingAuthDataExist = !!x;
      })
    )
    this.subscriptions.push(
      this.authService.data$.subscribe(x => this.authenticated = !!x )
    )
    
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => {
      if (x) x.unsubscribe()
    })
  }

  ngAfterViewInit(): void {
  }
 
}
