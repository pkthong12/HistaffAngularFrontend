import { AfterViewInit, Component, OnInit, Renderer2,ViewChild,isDevMode,
  TemplateRef } from '@angular/core';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { AuthService } from 'src/app/services/auth.service';
import { IAuthData } from 'src/app/interfaces/IAuthData';
import { filter,Subscription } from 'rxjs';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { EnumIconClass } from 'src/app/enum/EnumIconClass';
import { Router,ActivatedRoute } from '@angular/router';
import { BaseDropdownComponent } from 'src/app/libraries/base-dropdown/base-dropdown/base-dropdown.component';
import { DomService } from 'src/app/libraries/services/dom.service';
import { api } from 'src/app/constants/api/apiDefinitions';
import { AppService } from 'src/app/services/app.service';
import { noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { AlertService } from 'src/app/libraries/alert/alert.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from "@angular/animations";
import { RandomAvatarService } from 'src/app/services/random-avatar.service';
import { ProfileInfoComponent } from 'src/app/main/cms/profile/appbusiness/staffprofile/personnel-center/personnel-profile/profile-info/profile-info.component';
import { PersonnelProfileComponent } from 'src/app/main/cms/profile/appbusiness/staffprofile/personnel-center/personnel-profile/personnel-profile.component';
import { CoreTableComponent } from '../../core-table/core-table.component';
import { CoreTabsComponent } from '../../core-tabs/core-tabs/core-tabs.component';
import { CorePageListService } from '../../core-page-list/core-page-list.service';
interface IAuthProfileMenuItem {
  name: string;
  count: number;
}



@Component({
  selector: 'app-notification-header',
  templateUrl: './notification-header.component.html',
  styleUrls: ['./notification-header.component.scss'],
  animations: [
    // Define animation here
    trigger("myfirstanimation", [
      state(
        "small",
        style({
          height: "0px",
          opacity: '0',
        })
      ),
      state(
        "large",
        style({
          height: "*",
          opacity: '1',
        })
      ),
      transition("large => small", animate("400ms ease-out")),
      transition("small => large", animate("400ms ease-in")),
    ]),
    trigger("rotatedState", [
      state("small", style({ transform: "rotate(0)" })),
      state("large", style({ transform: "rotate(-180deg)" })),
      transition("large => small", animate("400ms ease-out")),
      transition("small => large", animate("400ms ease-in")),
    ]),
  ],
})
export class NotificationHeaderComponent  extends BaseDropdownComponent implements OnInit, AfterViewInit {
  id!: string;
  fullname!: string;
  //avatar!: string;
  total: number = 0;
  defaultAvatar!: string;
  data: any;
  subsctiptions: Subscription[] = [];
  @ViewChild('avatar') avatar!: TemplateRef<any>;
  avatarTemplate!: TemplateRef<any>;
  corePageListInstanceNumber!: number;
  //@ViewChild('container') override container!: ElementRef;

  /* menu: IAuthProfileMenuItem[] = [
    {
      name: "Nhân viên hết hạn hợp đồng thử việc",
      count: 15,
    },
    {
      name: "NV hết hạn hợp đồng",
      count: 16
    },
    {
      name: "Sinh nhật trong tháng",
      count: 25,
    },
  ] */

  constructor(
    private appService: AppService,
    public override mls: MultiLanguageService,
    public override renderer: Renderer2,
    private ras: RandomAvatarService,
    public override domService: DomService,
    //private authService: AuthService,
    private alertService: AlertService,
    private corePageListService: CorePageListService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(mls, renderer, domService);
    this.defaultAvatar = ras.get();
    this.corePageListInstanceNumber = new Date().getTime();
  }

  override ngOnInit(): void {
    
  }
  toggle(index: number) {
    let state = this.data[index].state;
    this.data[index].state = state === "small" ? "large" : "small";
  }
  getData() {

    this.subsctiptions.push(
      this.appService.get(api.SE_REMINDER_GETREMIND).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            let _count = 0;
            body.innerBody.forEach((element: any) => {
              element.state = "small";
              _count += Number(element.count);
            });
            this.total = _count;
            
            this.data = body.innerBody.filter((item: any) => item?.count > 0);
            this.appService.get(api.SE_REMINDER_SEEN_READ_ALL).subscribe(y => {
              if(!!y && y.ok == true && y.status == 200) {
                 this.data.map((el : any) => {
                  y.body.innerBody.map((k : any) => {
                    if(el.name == k.name){
                      el.value.map((e : any) => {
                        if(e.id == k.refId){
                          e.isSeen = true;
                        }
                      })
                    }
                  })
                 })
              }
            })
          } else {
            //this.alertService.error(JSON.stringify(x, null, 2), noneAutoClosedAlertOptions);
          }
        } 
      })
    )
  }
  ngAfterViewInit(): void {
    /**
    * This events get called by all clicks on the page
    */
    this.getData();
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

  AccodionClick(): void {
    this.expandState = !this.expandState;
  }
  Directional(code: any, epm: any, item : any) {
    const paramAdd = window.btoa(epm.id.toString());
    console.log(167,paramAdd)
    debugger
    
    switch (code) {
      case "WARN01"://het han hop dong thu viec
       
        this.router.navigate(["/cms/profile/business/contractinfor/", paramAdd]);
        break;
      case "WARN02":// het han hop dong chinh thuc
        this.router.navigate(["/cms/profile/business/contractinfor/", paramAdd]);
        break;
      case "WARN03":// nhan vien sap den sinh nhat
        this.router.navigate([`cms/profile/business/staffprofile/${paramAdd}/personnel-profile`]);
        break;
      case "WARN04": // nhan vien chua nop du giay to khi tiep nhan
        this.router.navigate([`/cms/profile/business/staffprofile/${paramAdd}/personnel-profile`]);
        break;
      case "WARN05": // nhan vien nghi viec trong thang
        this.router.navigate(["/cms/profile/business/leavejob/", paramAdd]);
        break;
      case "WARN06": //co bao hiem tao moi
        this.router.navigate(["/cms/insurance/business/inschange"]);
        break;
      case "WARN07": // nhan vien nghi thai san sap di lam lai
        this.router.navigate([`cms/profile/business/staffprofile/${paramAdd}/personnel-profile`]);
        break;
      case "WARN08": // nhan vien den tuoi nghi huu
        this.router.navigate([`cms/profile/business/staffprofile/${paramAdd}/personnel-profile`]);
        break;
      case "WARN09": // nhan vien het han chung chi
        this.router.navigate([`cms/profile/business/qualification/`, {
          outlets: {
            corePageListAux: [
              btoa(epm.id),
              { listInstance: this.corePageListInstanceNumber },
            ],
          },
        },]);
        break;
      case "WARN10": // nhan vien het kiem nhiem
        this.router.navigate([`cms/profile/business/staffprofile/${paramAdd}/personnel-profile`]);
        var docHeader = document.getElementsByClassName("core-tabs-headers") as HTMLCollection
        var docContent = document.getElementsByClassName("core-tabs-contents") as HTMLCollection
        setTimeout(() => {
          if(!!docHeader && !!docContent){
            docHeader[0].children[0].classList.remove("active")
            docHeader[0].children[1].classList.add("active")
            docContent[0].children[0].classList.remove("active")
            docContent[0].children[1].classList.add("active")
          }
        },100)
        break;
      case "WARN11": // nhan vien co nguoi than het giam tru gia canh
        this.router.navigate(["/cms/profile/business/family/", paramAdd]);
        break;
      case "WARN12": //lanh dao quan ly nghi huu
        this.router.navigate([`cms/profile/business/staffprofile/${paramAdd}/personnel-profile`]);
        break;
      case "WARN13": //lanh dao bo nhiem
        this.router.navigate([`cms/profile/business/staffprofile/${paramAdd}/personnel-profile`]);
        break;
      case "WARN14": //nhan vien bo nhiem
        this.router.navigate([`cms/profile/business/staffprofile/${paramAdd}/personnel-profile`]);
        break;
      case "WARN15": //nang luong
        this.router.navigate(["/cms/profile/business/wage/", paramAdd]);
        break;
      case "WARN17": // Sửa sơ yếu lý lịch
        this.router.navigateByUrl("/cms/profile/list/approve/approve-staff-profile-edit");
        break;
      case "WARN18": // Sửa thông tin người thân
        this.router.navigateByUrl("/cms/profile/list/approve/family-info");
        break;
      case "WARN19": // Trình độ học vấn
        this.router.navigateByUrl("/cms/profile/list/approve/approve-staff-profile-edit");
        break;
      case "WARN20": // Bằng cấp - Chứng chỉ
        this.router.navigateByUrl("/cms/profile/list/approve/approve-certificate-edit");
        break;
      case "WARN21": //	NV sắp hết hạn Quyết định Điều động/biệt phái
        this.router.navigate([`cms/profile/business/staffprofile/${paramAdd}/personnel-profile`]);
        break;
      case "WARN22": //	Điều chỉnh Hồ sơ nhân viên
        this.router.navigateByUrl("/cms/profile/list/approve/approve-staff-profile-edit");
        //this.router.navigate([`cms/profile/business/staffprofile/${paramAdd}/personnel-profile`]);
        break;
      case "WARN23": //	Điều chỉnh Thông tin người thân
        this.router.navigateByUrl("/cms/profile/list/approve/family-info");
        break;
      case "WARN24": //	Điều chỉnh Bằng cấp - chứng chỉ
        this.router.navigateByUrl("/cms/profile/list/approve/approve-certificate-edit");
        break;
      case "WARN25": //	Yêu cầu điều chỉnh quá trình công tác
        this.router.navigateByUrl("/cms/profile/list/approve/approve-working-before");
        break;
      case "WARN26": //	Yêu cầu điều chỉnh quá trình công tác  trước đây
        this.router.navigateByUrl("/cms/profile/list/approve/approve-working-company");
        break;
      case "WARN27": //	Nhân viên hết hạn phụ cấp 
        this.router.navigate([`/cms/profile/list/allowanseemployee`, {
          outlets: {
            corePageListAux: [
              btoa(epm.id),
              { listInstance: this.corePageListInstanceNumber },
            ],
          },
        },]);
        break;
      case "WARN16": //Canh bao khong hoan thanh nhiem vu
        if (!!epm.id) {
          this.corePageListService.tmpFilter$.next({
            employeeId: epm.id
          });
        } else {
          if (isDevMode()) {
            this.alertService.warn(this.mls.trans('UI_NOTIFIVATION_HEADER_COMPONENT_EMPLOYEE_ID_IS_UNDEFINED'), noneAutoClosedAlertOptions);
          }
          break;
        }
        // Cần lấy orgIds mà nv đã từng ctac
        
        //debugger;
        //if (!!epm.orgId) {
          
          this.subsctiptions.push(
            this.appService.get(api.SE_REMINDER_GETHISTORYORGID + "?employeeId=" + epm.id).subscribe(x => {
              if (x.ok && x.status === 200) {
                const body: IFormatedResponse = x.body;
                //debugger;
                if (body.statusCode === 200) {
                  const newOrgIds: number[] = [];
                  body.innerBody.forEach((element: any) => {
                    newOrgIds.push(Number(element.orgId))
                  });
                  this.corePageListService.tmpInOperators$.next([{
                    field: 'orgId',
                    values: newOrgIds //<== xong gán vào đây
                  }]);
                } else {
                  if (isDevMode()) {
                    this.alertService.warn(this.mls.trans('UI_NOTIFIVATION_HEADER_COMPONENT_ORG_ID_IS_UNDEFINED'), noneAutoClosedAlertOptions);
                  }
                }
              } else{
                if (isDevMode()) {
                  this.alertService.warn(this.mls.trans('UI_NOTIFIVATION_HEADER_COMPONENT_ORG_ID_IS_UNDEFINED'), noneAutoClosedAlertOptions);
                }
              }
            })
          )


          //debugger;
          
       /*  } else {
          if (isDevMode()) {
            this.alertService.warn(this.mls.trans('UI_NOTIFIVATION_HEADER_COMPONENT_ORG_ID_IS_UNDEFINED'), noneAutoClosedAlertOptions);
          }
          break;
        } */
      

        this.router.navigateByUrl("/cms/profile/list/evaluate");

        break;
      default:
        break;

    }
    const request = {
      code : code,
      refId : epm.id,
      name : item.name,
      avatar : epm.avatar,
      orgId : epm.orgId
    }
    this.subsctiptions.push(
      this.appService.post(api.SE_REMINDER_SEEN_CREATE, request).subscribe(x => {
        if(!!x && x.ok == true && x.status == 200) {
          const v = x.body.innerBody
          if(v != null) {
            this.data.forEach((y : any) => {
              if(y.name == v.name){
                y.value.forEach((z : any) => {
                  if(z.id == v.refId) {
                    z.isSeen = true;
                  }
                });
                
              }
            });
          }
        }
      })
    )
  }
  /* onMenuItemClick(item: IAuthProfileMenuItem): void {
    switch (item.name) {
      case EnumTranslateKey.UI_AUTH_PROFILE_MENU_SEE_PROFILE:
        this.router.navigateByUrl('auth/see-profile');
        break;
      case EnumTranslateKey.UI_AUTH_PROFILE_MENU_CHANGE_PASSWORD:
        this.router.navigate(['cms', 'change-password', btoa((this.authService.data$.value as IAuthData).refreshToken.user)]);
        break;
      case EnumTranslateKey.UI_AUTH_PROFILE_MENU_LOG_OUT:
        this.subscriptions.push(
          this.authService.userLogout().subscribe(x => {
            if (x.ok && x.status === 200) {
              this.authService.data$.next(null);
              this.router.navigateByUrl('auth/login');
            }
          })
        )
        break;
      default:
    }
    this.expandState = !this.expandState;
  } */

}