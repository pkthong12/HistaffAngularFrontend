import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserActivityService } from 'src/app/services/user-activity.service';
import { BaseComponent } from '../base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';

@Component({
  selector: 'user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent extends BaseComponent implements OnInit, OnDestroy {

  isOpen: boolean = false;
  width: number = 800;
  height: number = 182;
  chatMembers: any[] = [];
  reloadFlag: boolean = false;
  userActivity: any[] = [];
  timerId?: any;
  menuClass: string = this.isOpen? " d-block" : "";
  activeSidebarClass?: string;
  randomAvatarSrc?: string;
  activeChatName?: string;

  constructor(
    public override mls: MultiLanguageService,
    private userActivityService: UserActivityService,
    private randomAvatarService: RandomAvatarService
  ) {
    super(mls);
  }

  override ngOnInit() {
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions)

    this.userActivityService.userActivity$.subscribe((value: any[]) => {
      this.userActivity = value;
    });

    // Regularly reload page each 30s
    this.timerId = setInterval(() => {
      this.reloadFlag = !this.reloadFlag;
    }, 30000)
  }

  updateDimensions = () => {
    if (window.innerWidth < 500) {
      this.width = 450;
      this.height = 102;
    } else {
      let update_width = window.innerWidth - 100
      let update_height = Math.round(update_width / 4.4)
      this.width = update_width;
      this.height = update_height;
    }

    this.activeSidebarClass = this.width > 1500 ? "active-sidebar" : "";
  }

  statusClass(time1: number, time2: number): string {
    const milisecondDiff = time2 - time1
    const minuteDiff = milisecondDiff / 60000
    if (minuteDiff < 0.5) {
      return 'bg-success'
    } else if (minuteDiff < 1) {
      return 'bg-warning'
    } else if (minuteDiff < 1.5) {
      return 'bg-warning'
    } else if (minuteDiff < 2) {
      return 'bg-danger'
    } else return 'bg-light'
  }

  toggleOpen(e: any = "Someone"): void {
    this.isOpen = !this.isOpen;
    this.menuClass = this.isOpen? " d-block" : "";
    this.randomAvatarSrc = this.randomAvatarService.get();
    this.activeChatName = e.target.innerText;
  }

  override ngOnDestroy(): void {
    window.removeEventListener("resize", this.updateDimensions)
    if (this.timerId) clearInterval(this.timerId);
  }

}
