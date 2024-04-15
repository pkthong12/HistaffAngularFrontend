import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation, isDevMode } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, fromEvent, zip } from 'rxjs';
import { buffer, debounceTime, filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { IAuthData } from 'src/app/interfaces/IAuthData';
import { SocketService } from 'src/app/services/socket.service';
import { HubConnectionService } from 'src/app/services/hub-connection.service';
import { RecursiveService } from 'src/app/libraries/services/recursive.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { AppService } from 'src/app/services/app.service';

import { ConfigService } from '../../services/config.service';
import { AuthService } from 'src/app/services/auth.service';
import { LayoutService } from 'src/app/services/layout.service';
import { navigation } from 'src/app/navigation/navigation';
import { MenuService } from 'src/app/services/menu.service';
import { NavigatorService } from 'src/app/libraries/navigator/navigator/navigator.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { RoutingService } from 'src/app/services/routing.service';
import { AppInitializationService } from 'src/app/services/app-initialization.service';
import { DESKTOP_SCREEN_HEDER_HEIGHT, MOBILE_SCREEN_HEDER_HEIGHT } from 'src/app/constants/layout';
import { HubConnection, HubConnectionState } from '@microsoft/signalr';
import { IHubConnectionActivity } from 'src/app/interfaces/IHubConnectionActivity';
import { INavigatorItem } from 'src/app/libraries/navigator/navigator/INavigatorItem';
import { EnumSignalRType } from 'src/app/enum/EnumSignalRType';
import { liner_to_nested_array_script } from 'src/assets/js/rescusive_wk';
import { IOrgTreeItem } from 'src/app/libraries/core-org-tree/core-org-tree/IOrgTreeItem';
import { DialogService } from 'src/app/services/dialog.service';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { api } from 'src/app/constants/api/apiDefinitions';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';

@Component({
    selector: 'app-layout',
    templateUrl: './applayout.component.html',
    styleUrls: ['./applayout.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class AppLayoutCompnent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('appNavigating') appNavigating!: ElementRef;
    @ViewChild('container') container!: ElementRef;

    secretLeftClickStream$ = new BehaviorSubject<any>(null)
    secretRightClickStream$ = new BehaviorSubject<any>(null)
    avatarClickStream$ = new BehaviorSubject<any>(null)

    resizeStream$ = fromEvent(window, 'resize');
    hubConnection!: HubConnection;
    hubConnectionState!: HubConnectionState;
    showDialogState: boolean | undefined = true;

    navigating!: boolean;
    url!: string;

    lang!: string;

    appConfig: any = {
        showLayout: 'false'
    };
    navigation: any = navigation;

    unsubscribe = new Subject<void>();

    logo!: string;

    /*
    MKF
    */
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
    /*=============================*/

    mouseclickListenerFn!: () => void;
    mouseclick$: Subject<number> = new Subject<number>();
    newlayoutVersion: boolean = true;

    authenticated!: boolean;

    subscriptions: Subscription[] = [];


    scale: number = 1;

    constructor(
        private _configService: ConfigService,
        private renderer: Renderer2,
        private authService: AuthService,
        private menuService: MenuService,
        private navigatorService: NavigatorService,
        public routingService: RoutingService,
        private mls: MultiLanguageService,
        private router: Router,
        private appInitializationService: AppInitializationService,
        public layoutService: LayoutService,
        private hubConnectionService: HubConnectionService,
        private socketService: SocketService,
        private recursiveService: RecursiveService,
        private organizationService: OrganizationService,
        private dialogService: DialogService,
        private alertService: AlertService,
        private appConfigService: AppConfigService,
        private appService: AppService
    ) {
        let currentItem = localStorage.getItem("currentItem");
        if(currentItem!= null){
            this.navigatorService.clickedItem$.next(JSON.parse(currentItem))
        }

        //this.alertService.success("The application navigation started")
        
        this.router.initialNavigation();
    }

    private resetCssVariables(leftbarReduced: boolean, isMenuOpen: boolean): void {

        const full = getComputedStyle(document.documentElement).getPropertyValue('--size-left-bar-full-width');
        const compact = getComputedStyle(document.documentElement).getPropertyValue('--size-left-bar-compact-width');

        let left = "0px";
        if (window.innerWidth <= 992) {
            if (!!isMenuOpen) {
                if (!!leftbarReduced) {
                    left = compact;
                } else {
                    left = full;
                }
            } else {
                left = '0px';
            }
        } else {
            if (!!leftbarReduced) {
                left = compact;
            } else {
                left = full;
            }
        }
        document.documentElement.style.setProperty('--size-left-bar-current-width',
            !!leftbarReduced ? compact : full
        )
        //document.documentElement.style.setProperty('--position-core-composition-left-left', left)
    }


    ngOnInit(): void {

        this.logo = this.appConfigService.LOGO_HEADER;

        this.subscriptions.push(
            this.mls.lang$.subscribe(x => this.lang = x)
        )

        this.subscriptions.push(
            this.routingService.navigationUrl$.subscribe(x => this.url = x)
        )

        this.subscriptions.push(
            this.navigatorService.clickedItem$.pipe(filter(x => !!x))
                .subscribe((item: INavigatorItem | null) => {
                    if (!!item?.sysMenuServiceMethod) {
                        console.log(item?.sysMenuServiceMethod)
                        switch (item?.sysMenuServiceMethod) {
                            case 'CHANGE_LANGUAGE:vi':
                                this.mls.lang$.next("vi")
                                break;
                            case 'CHANGE_LANGUAGE:en':
                                this.mls.lang$.next("en")
                                break;
                            case 'LOG_OUT':
                                this.authService.userLogout().subscribe(x => {
                                    if (x.ok && x.status === 200 && x.body?.statusCode === 200) {
                                        this.authService.postLogout();
                                    }
                                });
                                break;
                            case 'ONLINE-USERS':
                                this.router.navigate([{ outlets: { popupAux2: ['online-users'] } }]);
                                break;
                            default:
                                break;
                        }
                    }
                })
        )

        this.subscriptions.push(
            this._configService._configSubject.subscribe(data => {
                this.appConfig.showLayout = data;
            })
        )

        this.subscriptions.push(
            this.authService.data$.subscribe(x => this.authenticated = !!x)
        )

        this.subscriptions.push(
            this.appInitializationService.initializing$.subscribe(x => this.appInitializing = x)
        )

        this.subscriptions.push(
            this.mouseclick$.pipe(
                buffer(this.mouseclick$.pipe(debounceTime(250))),
                map(clicks => clicks.length),
                filter(clicksLength => clicksLength >= 10))
                .subscribe(_ => {
                    this.newlayoutVersion = !this.newlayoutVersion;
                })
        )
        this.subscriptions.push(
            this.menuService.isOpen$.subscribe(x => this.menuOpen = x)
        )

        /* START: Subscription for resize event */
        this.subscriptions.push(
            this.resizeStream$.pipe(
                debounceTime(200)
            ).subscribe((e: any) => {

                const innerWidth = e.target.innerWidth;
                if (innerWidth > 992) {
                    this.layoutService.headerHeight$.next(DESKTOP_SCREEN_HEDER_HEIGHT);
                } else {
                    this.layoutService.headerHeight$.next(MOBILE_SCREEN_HEDER_HEIGHT);
                }

                this.resetAppLayoutServiceProps();

                this.resetCssVariables(this.leftbarReduced, this.menuOpen);

            })
        )
        /* END: Subscription for resize event */

        this.subscriptions.push(
            this.hubConnectionService.hubConnection$.subscribe(connection => {
                this.hubConnection = connection!;
                this.hubConnectionState = connection?.state!;
                if (!!connection) {
                    const message: IHubConnectionActivity = {
                        sid: this.sid,
                        username: this.username,
                        avatar: this.avatar,
                        signalType: EnumSignalRType.LOG_IN,
                        message: `${this.username} has logged in`,
                        loginTime: this.authService.data$.value?.loginTime!,
                        data: null,

                    }
                    connection.invoke("SendMessage", message);
                }
            })
        )

        
        this.subscriptions.push(
            this.dialogService.dialogStateOpen$.subscribe(x => this.showDialogState = x)
        )

        this.subscriptions.push(
            this.secretLeftClickStream$.pipe(
                buffer(this.secretLeftClickStream$.pipe(debounceTime(250))),
                map(m => m.length),
                filter(s => s >= 5)
            ).subscribe(_ => this.dialogService.dialogStateOpen$.next(true))
        )

        this.subscriptions.push(
            this.secretRightClickStream$.pipe(
                buffer(this.secretRightClickStream$.pipe(debounceTime(250))),
                map(m => m.length),
                filter(s => s >= 5)
            ).subscribe(_ => this.router.navigateByUrl('/root/in-memory'))
        )

        this.subscriptions.push(
            this.avatarClickStream$.pipe(
                buffer(this.avatarClickStream$.pipe(debounceTime(250))),
                map(m => m.length),
                filter(s => s >= 5)
            ).subscribe(_ => this.router.navigateByUrl("/cms/system/mutation-log"))
        )

        this.subscriptions.push(
            this.authService.data$.pipe(
                filter(data => !!data && !!!this.authService.stopSubscription),
            ).subscribe((authData: IAuthData | null) => {
                this.sid = authData!.refreshToken.user;
                this.avatar = authData!.avatar;
                this.username = authData!.userName;
                const { exp } = this.authService.parseJwt(this.authService.data$.value?.token!);
                this.expiresAt = new Date(exp).toLocaleTimeString();
                this.socketService.createHubConnection();

                const orgLinerData = authData?.orgIds;
                this.organizationService.linerData$.next(orgLinerData! as IOrgTreeItem[])
                const cloneCopy = JSON.parse(JSON.stringify(orgLinerData))

                console.group("orgLinerData...", orgLinerData);

                if (!!orgLinerData) {

                    if (typeof Worker !== 'undefined') {

                        console.log('🟢 Worker works')
                        // Create a new
                        const worker = new Worker(liner_to_nested_array_script)
                        worker.addEventListener("message", ({ data }) => {

                            console.log("OrgTreeData calculation finished!", new Date().getTime())

                            this.organizationService.loading = false;
                            this.organizationService.orgTreeData$.next(data.list);
                            this.organizationService.linerData$.next(data.rawList);

                        })


                        console.log("OrgTreeData is being calculated by Worker...");
                        console.log("this.organizationService.status$.value", this.organizationService.status$.value);

                        worker.postMessage({
                            list: cloneCopy,
                            keyField: 'id',
                            titleField: 'name',
                            parentField: 'parentId',
                            activeField: 'active',
                            checkedField: 'checked',
                            expandedField: 'expanded',
                            status: this.organizationService.status$.value, // <=== this had been already retrieved on app-initialization
                            orderBy: 'orderNum'
                        });

                    } else {
                        // Web workers are not supported in this environment.
                        // You should add a fallback so that your program still executes correctly.

                        console.log("this.organizationService.status$.value", this.organizationService.status$.value)

                        this.subscriptions.push(
                            this.recursiveService.linerArrayToNestedArray(
                                cloneCopy,
                                'id',
                                'name',
                                'parentId',
                                'active',
                                'checked',
                                'expand',
                                this.organizationService.status$.value // <=== this had been already retrieved on app-initialization
                            )
                                .subscribe(data => {
                                    console.log("data", data)
                                    this.organizationService.orgTreeData$.next(data.list);
                                    this.organizationService.linerData$.next(data.rawList);
                                })
                        )
                    }
                }

            })
        )
    }

    resetAppLayoutServiceProps(): void {
        const leftBarCurrentWidth = this.layoutService.leftBarCurrentWidth$.value;
        const layoutHeaderHeight = this.layoutService.layoutHeaderHeight$.value;
        this.layoutService.contentContainerWidth$.next(window.innerWidth - leftBarCurrentWidth);
        this.layoutService.contentContainerHeight$.next(window.innerHeight - layoutHeaderHeight);

        document.documentElement.style.setProperty('--content-container-width', this.layoutService.contentContainerWidth$.value + 'px')
        document.documentElement.style.setProperty('--content-container-height', this.layoutService.contentContainerHeight$.value + 'px')
    }

    ngAfterViewInit(): void {

        setTimeout(() => {

            this.subscriptions.push(
                this.routingService.navigating$.subscribe(x => {
                    this.navigating = x
                })
            )

            this.resetCssVariables(this.layoutService.leftbarReduced$.value, this.menuOpen);
            //this.layoutService.leftbarReduced$.next(true)
            this.subscriptions.push(
                this.layoutService.leftbarReduced$.subscribe(x => {
                    if (localStorage) {
                        localStorage.setItem('leftbarReduced', JSON.stringify(x))
                    }
                    this.leftbarReduced = x;
                    //console.warn("this.layoutService.leftbarReduced$.subscribe => this.resetCssVariables")
                    this.resetCssVariables(x, this.menuOpen);

                })
            )
        })



        this.mouseclickListenerFn = this.renderer.listen('window', 'click', (e: MouseEvent) => {
            if (e.which === 1) {
                this.mouseclick$.next(0);
            }
        })

        setTimeout(() => {
            this.subscriptions.push(
                zip([
                    this.appInitializationService.initializing$.pipe(
                        filter(x => !!!x)
                    ),
                    this.authService.data$.pipe(
                        filter(x => !!x)
                    )
                ]).subscribe(_ => {

                    setTimeout(() => {
                        this.resetAppLayoutServiceProps();
                    })

                })
            )
        })

        //Loading 
        this.subscriptions.push(
            this.appService.get(api.SYS_USER_QUERY_ORG_LIST_WITH_POSITIONS).subscribe(x => {
                this.loading = false;
                if (x.ok && x.status === 200) {
                    const body: IFormatedResponse = x.body
                    if (body.statusCode === 200) {
                        const linearItems = body.innerBody;
                        const copy = JSON.parse(JSON.stringify(linearItems))
                        this.recursiveService.buildTreeData(copy).then(x => {
                            this.organizationService.orgTreeDataWithPositions$.next(x)
                        }).catch(error => {
                            console.log(error)
                        })
                    }
                }
            })
        )
    }

    onClickSecretLeft(): void {
        this.secretLeftClickStream$.next(new Date().getTime())
    }

    onClickSecretRight(): void {
        this.secretRightClickStream$.next(new Date().getTime())
    }

    onClickAvatar(): void {
        this.avatarClickStream$.next(new Date().getTime())
    }

    onKeywordChange(args: any) {

    }

    switchLanguage(): void {
        if (this.mls.lang$.value === 'vi') {
            this.mls.lang$.next('en')
        } else {
            this.mls.lang$.next('vi')
        }
    }

    onLeftbarRecucerClick() {
        this.layoutService.leftbarReduced$.next(!this.layoutService.leftbarReduced$.value);
        const leftBar = getComputedStyle(document.documentElement).getPropertyValue('--size-left-bar-current-width');
        this.layoutService.leftBarCurrentWidth$.next(Number(leftBar))
        this.layoutService.contentContainerWidth$.next(window.innerWidth - Number(leftBar))
        document.documentElement.style.setProperty('--content-container-width', window.innerWidth - Number(leftBar) + 'px')
    }

    onIsOpenChange(e: boolean) {
        this.menuService.isOpen$.next(e);
    }

    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
        if (this.mouseclickListenerFn) this.mouseclickListenerFn();
        this.subscriptions.map(x => {
            if (x) x.unsubscribe();
        })
    }
}
