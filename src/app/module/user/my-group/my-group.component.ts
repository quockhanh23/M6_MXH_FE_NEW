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
  theGroup?: TheGroup[]

  constructor(private groupService: GroupService,
              private router: Router,
              private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {

  }

}
