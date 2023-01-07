import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {FriendRelationService} from "../../../services/friend-relation.service";
import {Router} from "@angular/router";
import {ToartsService} from "../../../services/toarts.service";
import {UserService} from "../../../services/user.service";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  idUser: string | undefined;
  listFriendRequest?: User[];
  listFriendRequestSend?: User[];
  count1?: any
  count2?: any
  count3?: any
  checkHeight1 = 'height: 640px'
  checkHeight2 = 'height: 640px'
  marginTop = 'margin-top: 20px'
  px = 'px'
  myRequest = 'Những người bạn đã gửi lời mời'
  peopleRequest = 'Lời mời kết bạn'
  listFriend?: User[];
  listPeople?: User[];
  heightFriendList: any
  heightFriendRequest: any
  heightFriendRequestSend: any
  heightListPeople: any
  checkEmptySearch = false

  constructor(private friendRelationService: FriendRelationService,
              private router: Router,
              private toarts: ToartsService,
              private userService: UserService,
              private commonService: CommonService
  ) {
    localStorage.setItem('Url', window.location.href);
  }

  ngOnInit(): void {
    this.listRequestSend()
    this.listRequest()
    this.friendList()
    this.allPeople()
  }

  listRequestSend() {
    this.friendRelationService.listRequestSend(this.idUserLogIn).subscribe(rs => {
      this.listFriendRequestSend = rs;
      try {
        if (rs.length > 7) {
          this.heightFriendRequestSend = 'height: 580px;'
        } else {
          this.heightFriendRequestSend = 'height: 100%;'
        }
        this.count1 = rs.length
      } catch (err) {
        console.log("lỗi length")
      }
      if (this.count1 > 0) {
        this.checkHeight2 = 'height: 100%';
        this.marginTop = 'margin-top:' + ' ' + this.count1 * rs.length + this.px
      }
      console.log(this.count1)
    })
    this.count1 = 0
  }

  listRequest() {
    this.friendRelationService.listRequest(this.idUserLogIn).subscribe(rs => {
      this.listFriendRequest = rs;
      try {
        if (rs.length > 7) {
          this.heightFriendRequest = 'height: 580px;'
        } else {
          this.heightFriendRequest = 'height: 100%;'
        }
        this.count2 = rs.length
      } catch (err) {
        console.log("lỗi length")
      }
      if (this.count2 > 0) {
        this.checkHeight1 = 'height: 100%';
        this.marginTop = 'margin-top:' + ' ' + this.count1 * rs.length + this.px
      }
      console.log(this.count2)
    })
    this.count2 = 0
  }

  acceptFriend(idFriend: any) {
    this.friendRelationService.acceptFriend(this.idUserLogIn, idFriend).subscribe(() => {
      this.ngOnInit()
      this.searchAll()
    })
  }

  sendRequestFriend(idFriend: any) {
    this.friendRelationService.sendRequestFriend(this.idUserLogIn, idFriend).subscribe(() => {
      this.ngOnInit()
      this.searchAll()
      this.toarts.openToartsSendRequestFriendSuccess()
    })
  }

  deleteRequest(idFriend: any) {
    this.friendRelationService.deleteFriendRelation(this.idUserLogIn, idFriend).subscribe(() => {
      this.ngOnInit()
      this.searchAll()
      this.toarts.openToartsCancelRequestFriend()
    })
  }

  back() {
    this.router.navigate(['user/newsfeed']).then()
  }

  friendList() {
    this.friendRelationService.listFriend(this.idUserLogIn).subscribe(rs => {
      this.listFriend = rs
      try {
        if (rs.length > 7) {
          this.heightFriendList = 'height: 580px;'
        } else {
          this.heightFriendList = 'height: 100%;'
        }
        this.count3 = rs.length
      } catch (err) {
        console.log("lỗi length")
      }
    })
  }

  allPeople() {
    this.friendRelationService.allPeople(this.idUserLogIn).subscribe(rs => {
      try {
        if (rs.length > 7) {
          this.heightListPeople = 'height: 580px;'
        } else {
          this.heightListPeople = 'height: 100%;'
        }
      } catch (err) {
        console.log("")
      }
      this.listPeople = rs
    })
  }

  searchAll() {
    // @ts-ignore
    let value = document.getElementById('search').value
    console.log(value)
    this.userService.searchAll(value, this.idUserLogIn).subscribe(rs => {
      console.log("vào đây")
      this.listPeople = rs
      this.checkEmptySearch = rs.length == 0;
    }, error => {
      console.log(error)
    })
  }

  changeColorInput() {
    this.commonService.changeColorInput()
  }

  changeColorInput2() {
    this.commonService.changeColorInput2()
  }
}
