import { OAuthLogger } from "angular-oauth2-oidc";

export class SsoLogger implements OAuthLogger {
    debug(message?: any, ...optionalParams: any[]): void {
        console.error(message, ...optionalParams);
    }
    info(message?: any, ...optionalParams: any[]): void {
        console.error(message, ...optionalParams);
    }
    log(message?: any, ...optionalParams: any[]): void {
        console.error(message, ...optionalParams);
    }
    warn(message?: any, ...optionalParams: any[]): void {
        console.error(message, ...optionalParams);
    }
    error(message?: any, ...optionalParams: any[]): void {
        console.error(JSON.stringify(message), ...optionalParams);
    }
}