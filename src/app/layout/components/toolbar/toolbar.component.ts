import {
  Component,
  ViewEncapsulation,
  TemplateRef,
  Input,
  OnInit,
} from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { CoreService } from "src/app/services/core.service";
import { NavigationService } from "src/app/services/navigation.service";
import { ModalService } from "src/app/services/modal.service";
import { Globals } from "src/app/common/globals";
const $ = require("jquery");
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Notification } from "src/app/common/notification";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent implements OnInit {

  @Input() logoTemplate!: TemplateRef<any>;

  theme: string | null = "theme-orange";
  body = document.body;

  userInfo = {
    username: "",
  };

  model: ChangePassword = new ChangePassword();
  passwordForm: FormGroup;
  confirmFlag = false;
  flagOldPassword = false;

  //eye
  tooglePassWord1 = false;
  tooglePassWord2 = false;
  tooglePassWord3 = false;
  
  navigation: any;
  permission: any;
  isAdmin: boolean;

  /**
   * Constructor
   */
  constructor(
    private authService: AuthService,
    private navigationService: NavigationService,
    private router: Router,
    private globals: Globals,
    private modalService: ModalService,
    private _formBuilder: FormBuilder,
    private notification: Notification,
    private _coreService: CoreService
  ) {
    // form doi mat logout
    this.passwordForm = _formBuilder.group({
      currentPass: ["", Validators.required],
      password: ["", Validators.required],
      confirm_password: ["", Validators.required],
    });
    this.navigation;
    let navigationFull = this.navigationService.getCurrentNavigation();

    this.userInfo.username = this.authService.data$.value?.userName!;
    this.model.userName = this.authService.data$.value?.userName!;
    this.model.avatar = this.authService.data$.value?.avatar;
    
    let per: any = this.authService.data$.value?.permissionParams;
    this.isAdmin = this.authService.data$.value?.isAdmin!;

    let urlpermission: any[] = [];
    if (this.isAdmin == false) {
      this.permission = JSON.parse(per).map((item: any) => item.functionCode);
      findChild(navigationFull, this.permission);
      function findChild(array: any, permission: any) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].type == "item") {
            let index = permission.indexOf(array[i].id);
            if (index == -1) {
              array[i].hasChild = false;
            } else {
              array[i].hasChild = true;
              urlpermission.push(array[i].url);
            }
          } else {
            findChild(array[i].children, permission);
            var hasChild = array[i].children.findIndex((c: any) => {
              return c.hasChild == true;
            });
            if (hasChild > -1) {
              array[i].hasChild = true;
            } else {
              array[i].hasChild = false;
            }
          }
        }
      }
      this.globals.urlPermission = urlpermission;
    }
    this.navigation = navigationFull;
  }

  ngOnInit(): void {
    if (localStorage) {
      this.theme = localStorage.getItem("theme");
    }
  
    if (!!this.theme) {
      this.body.classList.add(this.theme)
    } else {
      this.body.classList.add("theme-orange")
      this.theme = "theme-orange";
    }
  }

  clickOutside(e: any) {
    e.hidden = true;
  }
  togglePassword() {}
  // Show profile
  showProfile = (): void => {
    this.router.navigate(["/sys/profile"]);
  };

  // Change Password
  ChangePassword = () => {
    this.modalService.open("open-change-pass");
    // Reset form khi chọn nút X ở Modal
    $(".btn-remove").click(() => {
      this.passwordForm.reset();
    });
  };
  confirmChange = (status: any) =>{
    if(status == 'cancel')
    {
      this.modalService.close("open-change-pass");
      this.passwordForm.reset();
    }
    else{

    }
  }
  // Xác nhận đổi mật khẩu or không đổi mật khẩu
  confirmChoose(status: any) {
    if (status == "cancel") {
      // Reset trạng thái của mắt
      this.tooglePassWord3 = false;
      this.tooglePassWord2 = false;
      this.tooglePassWord1 = false;
      this.flagOldPassword = false;
      // Bỏ check không trùng mật khẩu
      this.confirmFlag = false;
      // Reset Form
      this.passwordForm.reset();
      this.modalService.close("open-change-pass");
    } else {
      if (!this.passwordForm.valid) {
        this.passwordForm.markAsUntouched();
        this.passwordForm.markAsPristine();
        this.passwordForm.markAllAsTouched();
      } else {
        if (this.model.newPassword !== this.model.confirm_password) {
          this.confirmFlag = true;
        } else {
          this._coreService.Post("tenant/ChangePassword", this.model).subscribe((res: any)=>{
            if(res.statusCode == "200")
            {
              this.notification.success("Đổi mật khẩu thanh công");
              this.passwordForm.reset();
              this.modalService.close("open-change-pass");
            }
            else{
              this.confirmFlag = false;
              if(res.statusCode == "400") 
                 this.notification.warning("Mật khẩu hiện tại không đúng !");
              if(res.statusCode == "404")
                 this.notification.warning("Không tìm thấy tài khoản !");
            }
          })
        }
      }
    }
  }
  // Sign Out App
  signOut = (): void => {
    this.authService.userLogout().subscribe(x => {
      if (x.ok && x.status === 200) {
        this.authService.postLogout();
      }
    })

  };
  clickLogo() {
    this.router.navigate(["/cms/dashboard"]);
  }

  switchTheme(): void {
    if (this.theme === "theme-orange") {
      this.body.classList.replace("theme-orange", "theme-blue");
      localStorage.setItem("theme", "theme-blue");
      this.theme = "theme-blue";
    } else {
      this.body.classList.replace("theme-blue", "theme-orange");
      localStorage.setItem("theme", "theme-orange");
      this.theme = "theme-orange";

    }
  }

  // =============== END ===============
}

export class ChangePassword {
  userName!: string;
  currentPassword!: string;
  newPassword!: string;
  confirm_password!: string;
  avatar?:string;
}
