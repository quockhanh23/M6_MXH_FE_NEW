import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupService} from "../../../services/group.service";
import {TheGroup} from "../../../models/the-group";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-group-shared',
  templateUrl: './group-shared.component.html',
  styleUrls: ['./group-shared.component.css']
})
export class GroupSharedComponent implements OnInit, OnDestroy {

  idUserLogIn = localStorage.getItem("USERID")
  myGroup?: TheGroup[]
  allGroup?: TheGroup[]
  groupJoin?: TheGroup[]
  checkEmptySearch = false

  constructor(private groupService: GroupService,
              private commonService: CommonService
  ) {
  }

  ngOnInit(): void {
    this.allGroupPublic()
    this.findGroupByIdUserCreate()
    this.groupJoined()
  }

  allGroupPublic() {
    this.groupService.findAllGroup(this.idUserLogIn).subscribe(rs => {
      console.log("allGroup")
      this.allGroup = rs
    })
  }

  findGroupByIdUserCreate() {
    this.groupService.findGroupByIdUserCreate(this.idUserLogIn).subscribe(rs => {
      console.log("findGroupByIdUserCreate")
      this.myGroup = rs
    })
  }

  groupJoined() {
    this.groupService.groupJoined(this.idUserLogIn).subscribe(rs => {
      console.log("groupJoined")
      this.groupJoin = rs
    })
  }

  searchAllByGroupNameAndType() {
    // @ts-ignore
    let value = document.getElementById('search').value
    console.log(value)
    this.groupService.searchAllByGroupNameAndType(value, this.idUserLogIn).subscribe(rs => {
      console.log("vào đây")
      this.allGroup = rs
      this.checkEmptySearch = rs.length == 0;
    })
  }

  changeColorInput() {
    this.commonService.changeColorInput()
  }

  changeColorInput2() {
    this.commonService.changeColorInput2()
  }

  ngOnDestroy() {
    localStorage.removeItem('UrlGroupByUser')
  }
}
