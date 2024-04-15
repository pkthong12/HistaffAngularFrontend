import { Injectable, isDevMode } from '@angular/core';
import { AuthService } from './auth.service';
import { HubConnectionService } from './hub-connection.service';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { IUserActivityData, UserActivityService } from './user-activity.service';
import { AppConfigService } from './app-config.service';
import { IHubConnectionActivity } from '../interfaces/IHubConnectionActivity';
import { AlertService } from '../libraries/alert/alert.service';
import { LongTaskService } from '../libraries/services/long-task.service';
import { alertOptions } from '../constants/alertOptions';
import { EnumSignalRType } from '../enum/EnumSignalRType';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private authService: AuthService,
    private userActivityService: UserActivityService,
    private hubConnectionService: HubConnectionService,
    private appConfigService: AppConfigService,
    private alertService: AlertService,
    private router: Router,
    private longTaskService: LongTaskService
  ) { }

  createHubConnection() {
    const token = this.authService.data$.value?.token;
    if (!!!token) {
      console.warn("No user logged in");
      return;
    }

    const connection: HubConnection = new HubConnectionBuilder()
      .withUrl(this.appConfigService.BASE_URL + '/hubs/signal', {
        // .withUrl('https://tanleica.com/hubs/signal', {
        headers: {
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": true,
        } as any,
        withCredentials: false,
        accessTokenFactory: () => token,
      })
      .configureLogging(LogLevel.None)
      .build()

    connection.on("ReceiveSystemMessage", message => {
      console.log("System message: ", message)
    })

    connection.on("ReceiveMessage", (activity: IHubConnectionActivity) => {

      console.log("MONITORING: ", activity);

      switch (activity.signalType) {
        case EnumSignalRType.TASK_PROGRESS:
          this.longTaskService.message$.next(activity.message)
          this.longTaskService.data$.next((activity as any).data)
          this.longTaskService.error$.next((activity as any).error)
          break;
        case EnumSignalRType.LOG_IN:
          if (isDevMode()) this.alertService.info(activity.message, alertOptions)
          break;
        case EnumSignalRType.ENTITY_CHANGED:
          if (isDevMode()) this.alertService.info(activity.message, alertOptions)
          break;
        case EnumSignalRType.ACTIVITY:
          const { loginTime } = activity;
          const { sid, username, pathname, avatar, hubConnectionId, accessTime, userActivity } = activity.data;

          const currentSid = this.authService.data$.value?.fullName;

          console.group("ACTIVITY")
          console.log("isDevMode()", isDevMode());
          console.log("Incoming loginTime", loginTime);
          console.log("Your loginTime", this.authService.data$.value?.loginTime!);
          console.log("Incoming sid", sid);
          console.log("Your sid", currentSid);

          console.groupEnd();

          if (loginTime < this.authService.data$.value?.loginTime! && sid === currentSid /*&& isDevMode()*/) {

            if (isDevMode()) {

              this.alertService.error(
                `Trong môi trường Dev, tài khoản (${sid}) đã được dùng trước rồi nhé. Xin đăng nhập bằng tài khoản khác`,
                { ...alertOptions, autoClose: false }
              )

              setTimeout(() => {
                this.authService.userLogout().subscribe(x => {
                  if (x.ok && x.status === 200) {
                    this.authService.postLogout();
                  }
                });
              }, 3000)

            }
          }

          const merged = this.userActivityService.mergeActivities(userActivity)
          const found = merged.filter(item => item.sid === sid)
          if (found.length) {
            const newState: IUserActivityData = { sid, username, pathname, avatar, hubConnectionId, accessTime }
            merged.filter(item => item.sid !== sid).push(newState)
          } else {
            merged.push({ sid, username, pathname, avatar, hubConnectionId, accessTime })
          }

          this.userActivityService.userActivity$.next(merged);

          break;
        case EnumSignalRType.ACTIVITY_HISTORY_RESET:
          this.userActivityService.userActivity$.next([]);
          break;

        default:
          break;
      }


    })

    const start = async () => {
      let id
      try {
        this.hubConnectionService.message = "HubConnection creating requested."
        await connection.start();
        console.log("🟢🟢🟢 SignalR Connected.");
        this.hubConnectionService.message = "HubConnection created.";
        this.hubConnectionService.hubConnection$.next(connection);

        if (id) clearTimeout(id)

      } catch (err: any) {
        console.group(`🔴🔴🔴 HUB CONNECTION PROBLEM ====================`)
        this.hubConnectionService.message = err;
        console.warn("hubConnection start() error: ", err)

        if (typeof err === 'string') {
          if (err.indexOf(`Status code '401'`) >= 0) {
            console.warn("The token expired")
          } else {
            id = setTimeout(start, 5000)
          }
        } else {
          id = setTimeout(start, 5000)
        }
        console.groupEnd()
      }
    }

    connection.onclose(async () => {
      await start();
    })

    // Start the connection.
    start();
  }

}
