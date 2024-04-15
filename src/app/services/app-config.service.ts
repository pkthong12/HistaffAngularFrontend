import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {

  APP_TYPE!: string;

  /* This BASE_URL will be red from assets/app-config/app.config.json */
  BASE_URL!: string;
  BASE_URL_FOR_CONTENT!: string; // for miukafoto.com only
  /********************************************************************/

  GOLIVE_URL!: string;
  DEBUG_ENABLED: boolean = false; // Hiển thị một số alert kể cả trong môi trường Production

  LOGO_LOGIN: string = "";
  LOGO_HEADER: string = "";
  HOME_BACKGROUND_IMAGE: string = "";

  OAUTH2_OIDC_ENABLED: boolean = false;
  OAUTH2_OIDC_CLIENT_ID: string = "";
  OAUTH2_OIDC_LOGIN_URI: string = "";
  OAUTH2_OIDC_REDIRECT_URI: string = "";
  OAUTH2_OIDC_SCOPE: string = "openid profile email";

  SAML2ADFS_ENABLED: boolean = true;
  SAML2ADFS_IDP: string = "";
  SAML2ADFS_IDENTIFIER: string = "";
  SAML2ADFS_WA_SIGNIN: string = "";
  SAML2ADFS_WA_SIGNOUT: string = "";
  SAML2ADFS_WREPLY: string = "";

  HANGFIRE_PATH: string = '/jobs';
  STATIC_FOLDER: string = 'static';
  AVATAR_FOLDER: string = 'avatars';

}
