import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../services/group.service";
import {TheGroup} from "../../../models/the-group";

@Component({
  selector: 'app-group-shared',
  templateUrl: './group-shared.component.html',
  styleUrls: ['./group-shared.component.css']
})
export class GroupSharedComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  myGroup?: TheGroup[]
  allGroup?: TheGroup[]
  groupJoin?: TheGroup[]

  constructor(private groupService: GroupService,
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
      console.log(JSON.stringify(rs))
    })
  }

  changeColorInput() {
    // @ts-ignore
    document.getElementById('search').style.background = "#e0e6ef";
  }

  changeColorInput2() {
    // @ts-ignore
    document.getElementById('search').style.background = 'white';
  }
}
