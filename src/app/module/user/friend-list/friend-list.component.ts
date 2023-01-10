import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FriendRelationService} from "../../../services/friend-relation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDTO} from "../../../models/user-dto";
import {FollowWatchingService} from "../../../services/follow-watching.service";
import {ToartsService} from "../../../services/toarts.service";
import {BlackListService} from "../../../services/black-list.service";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  list? = 'Danh sách'
  idUserLogIn = localStorage.getItem("USERID")
  listFriend?: UserDTO[];
  count?: any
  idUser?: any
  nameUser?: any
  obj?: Object
  px?: number
  height: any
  routerLink = 'user/people-detail'
  routerLink2 = 'user/user-detail'
  heightIfBlank1: any
  heightIfBlank2: any
  checkLength = false
  col = 4
  col2 = 8
  alignLeft = 'left'
  userFollow?: UserDTO[]
  userWatching?: UserDTO[]
  checkFriendList = true
  checkFollowList = false
  checkWatchingList = false
  countFollowList = 0
  countWatchingList = 0
  colorCheckFriend = 'color: #ffc107'
  colorCheckFollow = 'color: #27aae1'
  colorCheckWatching = 'color: #27aae1'
  checkEmptySearch = false

  constructor(private router: Router,
              private toarts: ToartsService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private friendRelationService: FriendRelationService,
              private followWatchingService: FollowWatchingService,
              private blackListService: BlackListService,
              private commonService: CommonService
  ) {
    localStorage.removeItem('UrlBlackList')
    localStorage.setItem('Url', window.location.href);
  }

  ngOnInit(): void {
    this.idUser = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.findById(this.idUser).subscribe(rs => {
      this.nameUser = rs.fullName
    })
    this.friendRelationService.listFriend(this.idUser).subscribe(rs => {
      if (rs.length == 0 || rs.length == undefined) {
        this.alignLeft = 'center'
        this.col = 12
        this.col2 = 0
        this.checkLength = true
        this.heightIfBlank1 = 'height: 100px'
        this.heightIfBlank2 = 'height: 250px'
      }
      console.log("idUser: " + this.idUser)
      this.count = rs.length
      if (rs.length > 0 && rs.length < 4) {
        this.px = rs.length * 60 + 400
        this.height = 'height: ' + this.px + 'px'
        console.log("px: " + this.px)
      }
      if (rs.length >= 4 && rs.length < 8) {
        this.px = rs.length * 60 + 100
        this.height = 'height: ' + this.px + 'px'
      }
      if (rs.length >= 8) {
        this.px = rs.length * 60
        this.height = 'height: ' + this.px + 'px'
      }
      this.listFriend = rs
    }, error => {
      console.log(error)
    })
    this.getListWatchingByIdUser()
    this.getListFollowByIdUser()
  }

  back() {
    this.router.navigate([this.routerLink2]).then()
  }

  back2() {
    this.router.navigate([this.routerLink, this.idUser]).then()
  }

  getListWatchingByIdUser() {
    this.followWatchingService.getListWatchingByIdUser(this.idUserLogIn).subscribe(rs => {
      this.userWatching = rs
      this.countWatchingList = rs.length
    })
  }

  getListFollowByIdUser() {
    this.followWatchingService.getListFollowByIdUser(this.idUserLogIn).subscribe(rs => {
      this.userFollow = rs
      this.countFollowList = rs.length
    })
  }

  changeListFriend() {
    this.checkFriendList = true
    this.checkFollowList = false
    this.checkWatchingList = false
    this.colorCheckFriend = 'color: #ffc107'
    this.colorCheckFollow = 'color: #27aae1'
    this.colorCheckWatching = 'color: #27aae1'
    // @ts-ignore
    document.getElementById('search').value = ''
    this.userService.searchFriend("", this.idUserLogIn).subscribe(rs => {
      this.listFriend = rs
      this.checkEmptySearch = rs.length == 0;
    })
  }

  changeListFollow() {
    this.checkFriendList = false
    this.checkFollowList = true
    this.checkWatchingList = false
    this.checkEmptySearch = false
    this.colorCheckFriend = 'color: #27aae1'
    this.colorCheckFollow = 'color: #ffc107'
    this.colorCheckWatching = 'color: #27aae1'
  }

  changeListWatching() {
    this.checkFriendList = false
    this.checkFollowList = false
    this.checkWatchingList = true
    this.checkEmptySearch = false
    this.colorCheckFriend = 'color: #27aae1'
    this.colorCheckFollow = 'color: #27aae1'
    this.colorCheckWatching = 'color: #ffc107'
  }

  sendRequestFriend(idFriend: any) {
    this.friendRelationService.sendRequestFriend(this.idUserLogIn, idFriend).subscribe(rs => {
      this.ngOnInit()
      this.toarts.openToartsSendRequestFriendSuccess()
    })
  }

  unfriend(idFriend: any) {
    this.friendRelationService.deleteFriendRelation(this.idUserLogIn, idFriend).subscribe(rs => {
      this.ngOnInit()
      this.toarts.openToartsUnFriend()
    })
  }

  acceptFriend(idFriend: any) {
    this.friendRelationService.acceptFriend(this.idUserLogIn, idFriend).subscribe(rs => {
      this.ngOnInit()
    })
  }

  deleteRequest(idFriend: any) {
    this.friendRelationService.deleteFriendRelation(this.idUserLogIn, idFriend).subscribe(rs => {
      this.ngOnInit()
      this.toarts.openToartsCancelRequestFriend()
    })
  }

  searchFriend() {
    // @ts-ignore
    let value = document.getElementById('search').value
    console.log(value)
    this.userService.searchFriend(value, this.idUserLogIn).subscribe(rs => {
      console.log("vào đây")
      this.listFriend = rs
      this.checkEmptySearch = rs.length == 0;
    })
  }

  unFollow(idUserFollow: any) {
    this.followWatchingService.unFollow(this.idUserLogIn, idUserFollow).subscribe(rs => {
      this.getListFollowByIdUser()
    })
  }

  block(idBlock: any) {
    this.blackListService.block(this.idUserLogIn, idBlock).subscribe(rs => {
    })
  }

  changeColorInput() {
    this.commonService.changeColorInput()
  }

  changeColorInput2() {
    this.commonService.changeColorInput2()
  }
}
