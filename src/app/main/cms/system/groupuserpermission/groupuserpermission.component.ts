import { Component, OnInit } from "@angular/core";
import { Observable, filter } from "rxjs";
import { api } from "src/app/constants/api/apiDefinitions";
import { BaseComponent } from "src/app/libraries/base-component/base/base.component";
import { CorePermissionService } from "src/app/libraries/core-permission/core-permission.service";
import { EnumPermissionObjectType } from "src/app/libraries/core-permission/core-permission/core-permission.component";
import { CorePermissionComponent } from "src/app/libraries/core-permission/core-permission/core-permission.component";
import { AppService } from "src/app/services/app.service";
import { DialogService } from "src/app/services/dialog.service";
import { MultiLanguageService } from "src/app/services/multi-language.service";

@Component({
  selector: "cms-app-groupuserpermission",
  templateUrl: "./groupuserpermission.component.html",
  styleUrls: ["./groupuserpermission.component.scss"],
  providers: [CorePermissionComponent]
})
export class GroupUserPermissionComponent extends BaseComponent {

  type: EnumPermissionObjectType = EnumPermissionObjectType.USER_GROUP;

  constructor(
    public override mls: MultiLanguageService,
    private corePermissionComponent: CorePermissionComponent,
    private dialogService: DialogService,
    private corePermissionService: CorePermissionService,
    private appService: AppService

  ) {
    super(mls)
  }
  override ngOnInit(): void {
    this.corePermissionService.isPermission.next(false);
    
    if (!!!this.corePermissionService.isPermission.value) {
      this.dialogService.dialogConfirmed$.pipe(filter(x => !!x))
        .subscribe(x => {
          if (!!x?.confirmed) {
            const objectId = { groupId: this.corePermissionService.objectId }
            this.appService.post(api.SYS_GROUP_QUERY_ORG_PERMISSION_DELETE_BY_USER_ID, objectId)
              .subscribe(x => {
                if (x.ok && x.status === 200) {
                  if(x.body.statusCode === 200){
                    this.corePermissionService.selectedObjectActionPermissions$.next([]);
                    this.corePermissionService.selectedObjectOrgPermissions$.next([])
                  }
                }
              })
          }
        })
    }
  }
  canDeactivate(): Observable<boolean> | boolean {
    return this.corePermissionComponent.canDeactivate();
  }

}