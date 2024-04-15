import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Observable, filter } from "rxjs";
import { BaseComponent } from "src/app/libraries/base-component/base/base.component";
import { EnumPermissionObjectType } from "src/app/libraries/core-permission/core-permission/core-permission.component";
import { CorePermissionComponent } from "src/app/libraries/core-permission/core-permission/core-permission.component";
import { LayoutService } from "src/app/services/layout.service";
import { MultiLanguageService } from "src/app/services/multi-language.service";
import { CorePermissionService } from "src/app/libraries/core-permission/core-permission.service";
import { DialogService } from "src/app/services/dialog.service";
import { AppService } from "src/app/services/app.service";
import { api } from "src/app/constants/api/apiDefinitions";
import { ActivatedRoute, Route, Router } from "@angular/router";
@Component({
  selector: "cms-app-userpermission",
  templateUrl: "./userpermission.component.html",
  styleUrls: ["./userpermission.component.scss"],
  providers: [CorePermissionComponent]
})
export class UserPermissionComponent extends BaseComponent implements OnInit, AfterViewInit {

  type: EnumPermissionObjectType = EnumPermissionObjectType.USER;
  height!: number;

  constructor(
    public override mls: MultiLanguageService,
    private corePermissionComponent: CorePermissionComponent,
    private layoutService: LayoutService,
    private corePermissionService: CorePermissionService,
    private dialogService: DialogService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      super(mls);
    }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.layoutService.contentContainerHeight$.subscribe(x => {
          this.height = x - this.layoutService.basicSpacing * 2
        })
      )
    })
  }

  override ngOnInit(): void {
    this.corePermissionService.isPermission.next(true);
    if(!!this.corePermissionService.isPermission.value){
      this.subscriptions.push(
        this.dialogService.dialogConfirmed$.pipe(filter(x => !!x))
        .subscribe(x =>{
          if(!!x?.confirmed){
            if(!!this.corePermissionService.objectId){
              const objectId = {userId : this.corePermissionService.objectId}
              this.appService.post(api.SYS_USER_PERMISSION_DELETE_BY_USER_ID,objectId)
              .subscribe(x => {
                if(x.ok && x.status === 200){
                  if(x.body.statusCode === 200){
                    this.corePermissionService.selectedObjectActionPermissions$.next([])
                    this.corePermissionService.selectedObjectOrgPermissions$.next([])
                  }
                }
              })
              
            }
          }
        })
      )
    }
  }
  canDeactivate(): Observable<boolean> | boolean {
    return this.corePermissionComponent.canDeactivate();
  }

}
