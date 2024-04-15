import { AfterViewInit, Component, OnDestroy, OnInit, isDevMode } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subject, Subscription, filter, takeUntil } from 'rxjs';
import { EnumSignalRType } from 'src/app/enum/EnumSignalRType';
import { IHubConnectionActivity } from 'src/app/interfaces/IHubConnectionActivity';
import { navigation } from 'src/app/navigation/navigation';
import { RoutingService } from 'src/app/services/routing.service';
import { LayoutService } from 'src/app/services/layout.service';
import { HubConnectionService } from 'src/app/services/hub-connection.service';
import { UserActivityService } from 'src/app/services/user-activity.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from '../../alert/alert.service';
import { IRoutingHistoryItem } from '../../core-routing-history/core-routing-history/core-routing-history.component';
import { DialogService } from 'src/app/services/dialog.service';
import { UrlService } from 'src/app/services/url.service';
import { NavigatorService } from '../../navigator/navigator/navigator.service';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { INavigatorItem } from '../../navigator/navigator/INavigatorItem';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { IAuthData } from 'src/app/interfaces/IAuthData';
import { AppService } from 'src/app/services/app.service';
import { AppConfigService } from 'src/app/services/app-config.service';

export interface ILogUserActivity {
  clientCode: string;
  appType: string;
  username?: string;
  sid?: string;
  loginTime?: Date;
  accessTime: Date;
  path: string;
  pathname?: string;
}

@Component({
  selector: 'core-navigation-tracker',
  templateUrl: './core-navigation-tracker.component.html',
  styleUrls: ['./core-navigation-tracker.component.scss']
})
export class CoreNavigationTrackerComponent implements AfterViewInit, OnDestroy {

  navigating!: boolean;
  url!: string;

  lang!: string;

  appConfig: any = {
    showLayout: 'false'
  };
  navigation: any = navigation;

  appInitializing!: boolean;
  loading!: boolean;
  submitting!: boolean;
  menuOpen!: boolean;
  leftbarReduced!: boolean;
  keyword!: string;
  sid!: string;
  username!: string;
  expiresAt!: string;
  avatar!: string;


  unsubscribe = new Subject<void>();

  subscriptions: Subscription[] = [];

  routingHistory: IRoutingHistoryItem[] = [];

  pendingUrl!: string;
  lastClickedMenuItem!: INavigatorItem | null;
  lastClickedMenuItemString!: string;

  dialogInstanceNumber!: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private routingService: RoutingService,
    public layoutService: LayoutService,
    private hubConnectionService: HubConnectionService,
    private userActivityService: UserActivityService,
    private urlService: UrlService,
    private navigatorService: NavigatorService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private mls: MultiLanguageService,
    private appService: AppService,
    private appConfigService: AppConfigService
  ) {
    this.subscriptions.push(
      this.dialogService.dialogConfirmed$.pipe(
        filter(x => {
          return (
            // !!this.dialogService.busy
            true
            && x?.instanceNumber === this.dialogInstanceNumber && !!x?.confirmed
            && !!this.navigatorService.clickedItem$.value
            && (this.authService.data$.value?.id === '8c24683d-7d52-4f5a-8090-31c777e8869d' || this.authService.data$.value?.id === 'bd3e4ad4-11fc-4766-9224-4f9902f3a623')
          )
        })
      ).subscribe(_ => {
        this.router.navigate(
          [
            '/root',
            'url-mapper',
          ],
          { state: { url: this.pendingUrl, lastClickedMenuItem: this.lastClickedMenuItem, lastClickedMenuItemString: this.lastClickedMenuItemString } }
        );

        this.dialogService.resetService();

      })
    )

    this.subscriptions.push(
      this.navigatorService.clickedItem$.pipe(filter(s => !!s)).subscribe(x => {
        this.lastClickedMenuItem = x
        this.lastClickedMenuItemString = `[${x?.id}]=>${this.mls.trans(x!.code)}=>(${x?.url})`
      })
    )
  }

  ngAfterViewInit(): void {
    setTimeout(() => {

      this.urlService.currentRouteUrl$.next(this.router.url);

      this.subscriptions.push(
        this.routingService.routingHistory$.subscribe(x => this.routingHistory = x)
      )

      this.subscriptions.push(
        this.router.events.pipe(takeUntil(this.unsubscribe))
          .subscribe((routerEvent) => {
            this.checkRouterEvent(routerEvent as RouterEvent);
          })
      )

      this.subscriptions.push(
        this.urlService.currentRouteUrl$.pipe(
          filter(x => {
            if (!!this.dialogService.showConfirmDialog$.value) return false;
            return !!!['/'].includes(x)
          })
        ).subscribe(x => {
          const ignoredPaths = this.routingService.ignoredPaths$.value;
          const fullFunctions = this.routingService.fullFunctions$.value.filter(f => {
            return !!!ignoredPaths.includes(f.path)
          });
          const functionFilter = fullFunctions.filter(f => {
            if (f.pathFullMatch) {
              return f.path === x;
            } else {
              return x.indexOf(f.path) === 0
            }
          });

          console.log("functionFilter", ignoredPaths)
          console.log("functionFilter", functionFilter)
          console.log("functionFilter", ignoredPaths.includes("/cms/system/upermission/0"))

          if (x.indexOf('/root') !== 0 && !!!functionFilter.length && !!!ignoredPaths.includes(x) && !!this.navigatorService.clickedItem$.value) {
            if (this.authService.data$.value?.isRoot) {
              this.dialogInstanceNumber = new Date().getTime();
              this.dialogService.dialogConfirmed$.next({
                instanceNumber: this.dialogInstanceNumber,
                confirmed: false
              });
              this.dialogService.createNew(
                EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_TITLE,
                EnumTranslateKey.YES,
                EnumTranslateKey.IGNORE,
                false,
                EnumTranslateKey.ROOT_CURRENT_URL_DOES_NOT_EXIST_IN_APP_FUNCTION_PATH_DO_YOU_WANT_TO_MAP,
                [x]
              )
            }
          } else if (functionFilter.length === 1) {
            this.routingService.currentFunction$.next(functionFilter[0]);
          }
        })
      )

      // try to set current function immediately when user has pressed F5
      const url = this.router.url;
      const ignoredPaths = this.routingService.ignoredPaths$.value;
      const fullFunctions = this.routingService.fullFunctions$.value.filter(f => {
        return !!!ignoredPaths.includes(f.path)
      });
      const functionFilter = fullFunctions.filter(f => {
        if (f.pathFullMatch) {
          return f.path === url;
        } else {
          return url.indexOf(f.path) === 0
        }
      });


      if (!!functionFilter.length) {
        if (functionFilter.length > 1) {
          if (isDevMode()) {
            var functionFilterLinks: string[] = [];
            functionFilter.map(x => {
              functionFilterLinks.push(x.path + " (" + (x.pathFullMatch ? "tương ứng toàn phần" : "tương ứng phần bên trái") + ")")
            })
            this.alertService.error(
              `Nhiều hơn 01 chức năng cùng đang tương ứng với điều hướng ${url}:\n${JSON.stringify(functionFilterLinks, null, 2)}`,
              noneAutoClosedAlertOptions
            )
          }
          // Nếu không phải IS_ROOT cũng không phải IS_ADMIN thì điều hướng về trang chủ
          if (!this.authService.data$.value?.isRoot && !this.authService.data$.value?.isAdmin) this.router.navigateByUrl('/home')

        } else {

          // Kiểm tra xem có quyền với Function hiện tại hay không
          const tryFind = this.authService.data$.value?.permissionActions.filter(x => x.functionId === functionFilter[0].id)
          // Nếu không tìm thấy và không phải IS_ROOT cũng không phải IS_ADMIN thì đưa ra thông báo và điều hướng về trang chủ
          if (!tryFind?.length && !this.authService.data$.value?.isRoot && !this.authService.data$.value?.isAdmin) {
            this.alertService.error(
              functionFilter[0].path + " " +
              this.mls.trans('CORE.PERMISSION.THE_PATH_IS_NOT_PERMITTED'),
              noneAutoClosedAlertOptions)
            this.router.navigateByUrl('/home')
          }

          this.routingService.currentFunction$.next(functionFilter[0]);
        }
      }


    })
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.routingService.navigationUrl$.next(routerEvent.url);

      // Skip navigating effect when the navigation starts with /cms/profile/business/staffprofile
      if (routerEvent.url.indexOf("/cms/profile/business/staffprofile") !== 0) {
        this.routingService.navigating$.next(true);
      }
    }

    if (routerEvent instanceof NavigationEnd) {
      this.url = this.router.url;

      if (!!this.authService.data$.value?.isFirstLogin && this.url !== '/cms/change-password') {
        this.router.navigate(['cms', 'change-password', btoa((this.authService.data$.value as IAuthData).refreshToken.user)]);
      }

      const newRoutingHistory: IRoutingHistoryItem[] = this.routingService.routingHistory$.value;
      newRoutingHistory.push({ fullUrl: this.url });
      this.routingService.routingHistory$.next(newRoutingHistory);

      const userActivity = this.userActivityService.userActivity$.value;
      const auth = this.authService.data$.value;

      const newUserActivity = userActivity.filter(item => item.sid !== auth?.id)
      const connection = this.hubConnectionService.hubConnection$.value;
      newUserActivity.push({
        sid: auth?.fullName!,
        username: auth?.userName!,
        pathname: this.url,
        avatar: auth?.avatar!,
        hubConnectionId: connection?.connectionId!,
        accessTime: new Date().getTime(),
      })

      const accessMoment = new Date();
      const accessTime = accessMoment.getTime();

      const activity: IHubConnectionActivity = {
        sid: auth?.fullName!,
        signalType: EnumSignalRType.ACTIVITY,
        username: auth?.userName!,
        avatar: auth?.avatar!,
        message: `${auth?.userName} navigated to ${location.pathname}`,
        loginTime: this.authService.data$.value?.loginTime!,
        data: {
          sid: auth?.fullName,
          userName: auth?.userName,
          pathname: this.url,
          avatar: auth?.avatar,
          hubConnectionId: connection?.connectionId!,
          accessTime,
          userActivity: newUserActivity,
        },
      }

      const logPayload: ILogUserActivity = {
        clientCode: 'VNS',
        appType: 'WEBAPP',
        username: auth?.userName,
        sid: auth?.fullName,
        loginTime: this.authService.data$.value?.loginTime ? new Date(this.authService.data$.value?.loginTime) : undefined,
        accessTime: accessMoment,
        path: window.location.href,
        pathname: ''
      }

      if (window.location.href.indexOf('localhost') < 0 && window.location.href.indexOf('.web.app') < 0)
        this.appService.postFullUrl("https://blog.tanleica.com/api/LogUserActivity/Create", logPayload).subscribe();

      console.log("NavigationEnd activity", activity)
      if (!!connection) {
        try {
          connection?.invoke("SendMessage", activity);
        } catch (e) {
          console.error(e)
        }
      }
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {


      console.group("routerEvent.url")
      console.log(routerEvent.url)
      console.groupEnd()

      this.routingService.navigating$.next(false);
      this.urlService.previousRouteUrl$.next(this.urlService.currentRouteUrl$.value);
      this.urlService.currentRouteUrl$.next(routerEvent.url);

      // this.layoutService.leftbarReduced$.next(true); // if we want auto-reduce the menu, uncomment this line
      setTimeout(() => {
        const leftBar = getComputedStyle(document.documentElement).getPropertyValue('--size-left-bar-current-width').replace('px', '');
        this.layoutService.leftBarCurrentWidth$.next(Number(leftBar))
        this.layoutService.contentContainerWidth$.next(window.innerWidth - Number(leftBar))
        document.documentElement.style.setProperty('--content-container-width', window.innerWidth - Number(leftBar) + 'px')
      })

      console.log('done.');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

}
