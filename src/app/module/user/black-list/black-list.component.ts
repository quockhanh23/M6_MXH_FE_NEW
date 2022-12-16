import {Component, OnInit} from '@angular/core';
import {UserBlackListDTO} from "../../../models/user-black-list-dto";
import {BlackListService} from "../../../services/black-list.service";

@Component({
  selector: 'app-black-list',
  templateUrl: './black-list.component.html',
  styleUrls: ['./black-list.component.css']
})
export class BlackListComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  listUserInBlackList?: UserBlackListDTO[];
  count = 0

  constructor(private blackListService: BlackListService) {
  }

  ngOnInit(): void {
    this.listBlockedByUser()
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
    }, error => {
      this.ngOnInit()
      console.log(JSON.stringify(error))
    })
    this.ngOnInit()
  }

  unBlock(idBlock: any) {
    this.blackListService.unBlock(this.idUserLogIn, idBlock).subscribe(rs => {
      this.ngOnInit()
    }, error => {
      this.ngOnInit()
      console.log(JSON.stringify(error))
    })
  }
}
