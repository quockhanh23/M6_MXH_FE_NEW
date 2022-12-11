import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../services/group.service";
import {TheGroup} from "../../../models/the-group";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-my-group',
  templateUrl: './my-group.component.html',
  styleUrls: ['./my-group.component.css']
})
export class MyGroupComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  myGroup?: TheGroup[]

  constructor(private groupService: GroupService,
              private router: Router,
              private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.findGroupByIdUserCreate()
  }

  findGroupByIdUserCreate() {
    this.groupService.findGroupByIdUserCreate(this.idUserLogIn).subscribe(rs => {
      console.log("findGroupByIdUserCreate")
      this.myGroup = rs
    })
  }

}
