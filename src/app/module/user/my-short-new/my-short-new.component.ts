import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ShortNewService} from "../../../services/short-new.service";
import {ShortNews} from "../../../models/short-news";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-short-new',
  templateUrl: './my-short-new.component.html',
  styleUrls: ['./my-short-new.component.css']
})
export class MyShortNewComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  shortNew?: ShortNews[]
  heightIfBlank1: any
  heightIfBlank2: any
  checkShortNew = false
  checkShortNew2 = false

  constructor(private userService: UserService,
              private shortNewService: ShortNewService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.myShortNews()
  }

  myShortNews() {
    this.shortNewService.myShortNews(this.idUserLogIn).subscribe(rs => {
      this.shortNew = rs
      console.log(typeof rs.length)
      console.log(rs.length)
      if (rs.length == 0 || rs.length == undefined) {
        this.checkShortNew = true
        this.heightIfBlank1 = 'height: 150px'
        this.heightIfBlank2 = 'height: 180px'
      }
      if (rs.length < 8) {
        this.checkShortNew2 = true
        this.heightIfBlank1 = 'height: 150px'
      }
      console.log(this.checkShortNew2)
    })
  }

  delete(idSortNew: any) {
    this.shortNewService.deleteShortNew(idSortNew, this.idUserLogIn).subscribe(() => {
      this.ngOnInit()
    })
  }

  delete2(idSortNew: any) {
    this.shortNewService.deleteShortNewInDataBase(idSortNew, this.idUserLogIn).subscribe(() => {
      this.ngOnInit()
    })
  }

  back() {
    if (localStorage.getItem('UrlShortNew') == 'http://localhost:4200/user/listShortNew') {
      this.router.navigate(['user/listShortNew']).then()
    }
    if (localStorage.getItem('UrlShortNew') == 'http://localhost:4200/user/user-detail') {
      this.router.navigate(['user/user-detail']).then()
    }
  }
}
