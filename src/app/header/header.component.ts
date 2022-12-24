import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogLogoutComponent} from "../module/notifications/dialog-logout/dialog-logout.component";
import {NotificationService} from "../services/notification.service";
import {Notification} from "../models/notification";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  idUser?: any
  currentUser: string = "";
  avatar?: any
  fullName?: any
  idUserLogIn = localStorage.getItem("USERID")
  username: string | null = ''
  role?: any
  check = false
  check2 = false
  checkNotifications = false
  notifications?: Notification[]
  count = 0

  constructor(private authService: AuthenticationService,
              private router: Router,
              private notificationService: NotificationService,
              public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    console.log("vào header")
    this.role = localStorage.getItem("ROLE")
    this.getAllNotificationByIdSenTo()
    this.findAllByIdSendToNotSeen()
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('USERNAME') != null) {
      // @ts-ignore
      this.currentUser = localStorage.getItem("currentUser")
      this.avatar = JSON.parse(this.currentUser).avatar;
      return true;
    }
    return false
  }

  logOut() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/']).then()
    this.dialog.open(DialogLogoutComponent)
    setTimeout(() => {
      this.dialog.closeAll()
    }, 1000)
  }

  checkHRF2(): boolean {
    if (window.location.href == 'http://localhost:4200/') {
      return true;
    }
    return false;
  }

  getAllNotificationByIdSenTo() {
    // @ts-ignore
    this.notificationService.getAllNotificationByIdSenTo(this.idUserLogIn).subscribe(rs => {
      this.notifications = rs
      if (rs.length == 0) {
        this.check2 = true
      }
    })
  }

  findAllByIdSendToNotSeen() {
    // @ts-ignore
    this.notificationService.findAllByIdSendToNotSeen(this.idUserLogIn).subscribe(rs => {
      this.count = rs
      this.checkNotifications = this.count != 0;
    })
  }

  seenAll() {
    // @ts-ignore
    this.notificationService.seenAll(this.idUserLogIn).subscribe(rs => {
      this.ngOnInit()
    })
  }

  deleteAll() {
    // @ts-ignore
    this.notificationService.deleteAll(this.idUserLogIn).subscribe(rs => {
      this.ngOnInit()
    })
  }
}
