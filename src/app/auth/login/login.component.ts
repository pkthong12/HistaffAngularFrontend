import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  isDevMode,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInterface } from './login.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Globals } from '../../common/globals';
import { IClientLoginRequest } from 'src/app/interfaces/IClientLoginRequest';
import { Subscription } from 'rxjs';
import { AnimatedTextService } from 'src/app/libraries/animated-text/animated-text.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { IAuthData } from 'src/app/interfaces/IAuthData';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { AppInitializationService } from 'src/app/services/app-initialization.service';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { AppService } from 'src/app/services/app.service';
import {
  alertOptions,
} from 'src/app/constants/alertOptions';
import { ResponseService } from 'src/app/services/response.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConfigService } from 'src/app/services/app-config.service';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  showRePassword = false;
  showPassword: boolean = false;
  passwordInputType: string = 'password';
  loading!: boolean;

  initializationError!: string;

  subscriptions: Subscription[] = [];

  model: LoginInterface = new LoginInterface();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public appConfigService: AppConfigService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private globals: Globals,
    private animatedTextService: AnimatedTextService,
    private mls: MultiLanguageService,
    public appInitializationService: AppInitializationService,
    private alertService: AlertService,
    private responseService: ResponseService,
  ) {

    this.form = this.fb.group({
      username: this.fb.control('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      appType: this.fb.control('WEBAPP'),
      remember: this.fb.control(''),
    });

  }

  ngOnInit(): void {
  }
  
  onSubmit() {
    if (!!this.appInitializationService.primaryInitialized) {
      this.loading = true;
      this.subscriptions.push(
        this.authService
          .userLogin(this.form.getRawValue() as IClientLoginRequest)
          .subscribe((x) => {
            this.loading = false;
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              //this.responseService.resolve(body)
              if (body.statusCode === 200) {
                const newAuthData: IAuthData = {
                  ...body.innerBody,
                  loginTime: new Date().getTime(),
                };
                this.authService.data$.next(newAuthData);
                //this.responseService.resolve(body);
                this.router.navigate(['/cms/dashboard']);
              } else {
                this.alertService.info(
                  this.mls.trans(x.body.message),
                  alertOptions
                );
              }
            } else {
              if (isDevMode()) {
                //this.alertService.error(JSON.stringify(x, null, 2), noneAutoClosedAlertOptions);
              } else {
                this.alertService.info('Login failed', alertOptions);
              }
            }
          })
      );
    } else {
      window.location.reload();
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    this.passwordInputType = this.showPassword ? 'text' : 'password';
  }

  ngOnDestroy(): void {
    this.subscriptions.map((x) => {
      if (x) x.unsubscribe();
    });
  }

  ssoLogin(): void {
    if (!this.appConfigService.SAML2ADFS_ENABLED) {
      this.alertService.info(EnumTranslateKey.SSO_WAS_DISABLED)
    } else {
      const authorizationUrl = `${this.appConfigService.SAML2ADFS_IDP}?` +
      `wtrealm=${this.appConfigService.SAML2ADFS_IDENTIFIER}` +
      `&wa=${this.appConfigService.SAML2ADFS_WA_SIGNIN || 'wsignin1.0'}` + 
      `&wreply=${this.appConfigService.BASE_URL}${this.appConfigService.SAML2ADFS_WREPLY}`
    //debugger
    if (isDevMode()) {
      alert(authorizationUrl);
    }
    
    window.location.href = authorizationUrl;
    }
  }

}
