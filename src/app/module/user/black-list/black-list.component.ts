import {Component, OnInit} from '@angular/core';
import {UserBlackListDTO} from "../../../models/user-black-list-dto";
import {BlackListService} from "../../../services/black-list.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-black-list',
  templateUrl: './black-list.component.html',
  styleUrls: ['./black-list.component.css']
})
export class BlackListComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  listUserInBlackList?: UserBlackListDTO[];
  listUser?: UserBlackListDTO[];
  count = 0
  check = false
  checkEmptySearch = false

  constructor(private blackListService: BlackListService,
              private userService: UserService) {
    localStorage.setItem('UrlBlackList', window.location.href);
  }

  ngOnInit(): void {
    this.listBlockedByUser()
  }

  searchByFullNameOrEmail() {
    // @ts-ignore
    let value = document.getElementById('search').value
    console.log(value)
    this.userService.searchByFullNameOrEmail(value, this.idUserLogIn).subscribe(rs => {
      console.log("vào đây")
      this.listUser = rs
      this.checkEmptySearch = rs.length == 0;
    })
  }

  listBlockedByUser() {
    this.blackListService.listBlockedByUser(this.idUserLogIn).subscribe(rs => {
      this.listUserInBlackList = rs
      this.count = rs.length
    })
  }

  block(idBlock: any) {
    this.blackListService.block(this.idUserLogIn, idBlock).subscribe(rs => {
      this.ngOnInit()
      this.searchByFullNameOrEmail()
    }, error => {
      this.ngOnInit()
      console.log(JSON.stringify(error))
    })
  }

  unBlock(idBlock: any) {
    this.blackListService.unBlock(this.idUserLogIn, idBlock).subscribe(rs => {
      this.ngOnInit()
      this.searchByFullNameOrEmail()
    }, error => {
      this.ngOnInit()
      console.log(JSON.stringify(error))
    })
  }
}
