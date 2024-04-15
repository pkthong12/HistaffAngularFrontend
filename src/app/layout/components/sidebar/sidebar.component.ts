import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { NavigationService } from "src/app/services/navigation.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  navigation: any;
  _router: any;
  /**
   * Constructor
   */
  constructor(
    private navigationService: NavigationService,
    private router: Router
  ) {
    this._router = router;
    this.navigation = this.navigationService.getCurrentNavigation();
  }
}
