import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IAuthData } from 'src/app/interfaces/IAuthData';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import { AuthService } from 'src/app/services/auth.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { IUserActivityData, UserActivityService } from 'src/app/services/user-activity.service';
import { DomService } from 'src/app/libraries/services/dom.service';
import { Router } from '@angular/router';

interface IChatMember {
  sid: string;
  avatar: string;
  name: string;
  status: string;
  notRed?: boolean;
  menuClass?: string;
  hubConnectionId: string;
}

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.scss']
})
export class OnlineUsersComponent extends BaseComponent implements OnInit, AfterViewInit {

  isOpen!: boolean;
  chatMembers!: IChatMember[];
  chat!: any[];
  reloadFlag!: boolean;
  /*
  const notRed = chat.filter(item => item.userId === value.userId && !item.data.red).length
  */

  @ViewChild('container') container!: ElementRef;

  menuClass!: string;

  intervalId: any;

  constructor(
    public override mls: MultiLanguageService,
    private userActivityService: UserActivityService,
    private authService: AuthService,
    private domService: DomService,
    private router: Router
  ) {
    super(mls);
  }

  private refreshList(userActivity: IUserActivityData[]): void {
    const authData: IAuthData = this.authService.data$.value!;
    const newChatMembers: IChatMember[] = [];
    userActivity?.map(item => {
      if (item.sid !== authData.id)
        newChatMembers.push({
          sid: item.sid,
          hubConnectionId: item.hubConnectionId,
          avatar: item.avatar,
          name: item.username,
          status: this.statusClass(item.accessTime, new Date().getTime()),
        })
    })
    this.chatMembers = newChatMembers;    
  }

  override ngOnInit(): void {

    this.intervalId = setInterval(() => {
      this.refreshList(this.userActivityService.userActivity$.value)
    }, 15000)

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.subscriptions.push(
      this.userActivityService.userActivity$.subscribe(userActivity => {
        this.refreshList(userActivity)
      })
    )
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.container.nativeElement.style.setProperty('--z-index', this.domService.getMaxZIndex() + 1))
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

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
    this.menuClass = this.isOpen ? " d-block" : "";
  }

  close(): void {
    this.router.navigate([{ outlets: {popupAux2: null} }]);
  }

}
