import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogLogoutComponent} from "../module/notifications/dialog-logout/dialog-logout.component";

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
  checkRole = localStorage.getItem('ROLE');
  username: string | null = ''
  role?: any
  check = false

  constructor(private authService: AuthenticationService,
              private router: Router,
              public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.role = localStorage.getItem("ROLE")
    console.log(this.role)
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
}
