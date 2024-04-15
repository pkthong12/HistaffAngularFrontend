import {
  Component,
  ViewEncapsulation,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { CoreService } from "src/app/services/core.service";
import { NavigationService } from "src/app/services/navigation.service";
import { ModalService } from "src/app/services/modal.service";
import { Globals } from "src/app/common/globals";
const $ = require("jquery");
import { FormBuilder, FormGroup } from "@angular/forms";
import { Notification } from "src/app/common/notification";
import { AccordionComponent } from "@syncfusion/ej2-angular-navigations";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from "@angular/animations";
@Component({
  selector: "app-toolbell",
  templateUrl: "./toolbell.component.html",
  styleUrls: ["./toolbell.component.scss"],
  encapsulation: ViewEncapsulation.None,
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
export class ToolbellComponent implements OnInit {
  hidden: boolean = true;
  data: any;
  total: number = 0;
  state: string = "small";
  public itemsData: any = [];
  public mapping = { header: "name", content: "code" };
  /**
   * Constructor
   */
  constructor(
    private notification: Notification,
    private _coreService: CoreService,
    private modalService: ModalService,
    public router: Router
  ) { }
  ngOnInit() {
    this.getData();
  }
  showAccodion() {
    this.hidden = !this.hidden;
  }
  toggle(index: number) {
    let state = this.data[index].state;
    this.data[index].state = state === "small" ? "large" : "small";
  }
  getData() {
  }

  Directional(code: any, epm: any) {
    let url = "hr/employee/GetInforContract?Id=";
    let objParamAdd = { id: epm.id, type: "new" };
    let paramAdd = window.btoa(JSON.stringify(objParamAdd));

    switch (code) {
      case "EMP_EXPIRE_CONTRACT":
        this.router.navigate(["/cms/profile/business/contractinfor/", paramAdd]);
        break;
      case "EMP_REGISTER_CONTRACT":
        this.router.navigate(["/cms/profile/business/contractinfor/", paramAdd]);
        break;
      case "EMP_REGISTER_WORKING":
        this.router.navigate(["/cms/profile/business/decision/", paramAdd]);
        break;
        case "EMP_REGISTER_INSURANCE":
          this._coreService.Get(url + epm.id).subscribe((res: any) => {
            localStorage.setItem("modelTemp1", JSON.stringify(res.data));
            setTimeout(() => {
              this.router.navigate(["/cms/profile/business/insinformation/new"]);
            }, 200)
          });
          break;
      case "EMP_BIRTH_DAY":
        let objParamAdd1 = { id: epm.id, type: "view" };
        let paramAdd1 = window.btoa(JSON.stringify(objParamAdd1));
        this.router.navigate(["/cms/profile/business/staffprofile/", paramAdd1]);
        break;
      default:
        break;

    }
  }
}
