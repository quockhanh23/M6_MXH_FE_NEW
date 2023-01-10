import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../services/group.service";
import {TheGroup} from "../../../models/the-group";

@Component({
  selector: 'app-my-group',
  templateUrl: './my-group.component.html',
  styleUrls: ['./my-group.component.css']
})
export class MyGroupComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  myGroup?: TheGroup[]
  count = 0

  constructor(private groupService: GroupService) {
    localStorage.setItem('UrlGroupByUser', window.location.pathname);
  }

  ngOnInit(): void {
    this.findGroupByIdUserCreate()
  }

  findGroupByIdUserCreate() {
    this.groupService.findGroupByIdUserCreate(this.idUserLogIn).subscribe(rs => {
      console.log("findGroupByIdUserCreate")
      this.myGroup = rs
      this.count = rs.length
    })
  }
}
