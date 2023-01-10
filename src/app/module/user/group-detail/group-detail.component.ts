import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../services/group.service";
import {TheGroup} from "../../../models/the-group";
import {ActivatedRoute, Router} from "@angular/router";
import {GroupParticipant} from "../../../models/group-participant";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  theGroup?: TheGroup
  groupParticipant?: GroupParticipant[]
  groupParticipant2?: GroupParticipant[]
  idGroup?: any
  idCreateGroup?: any
  checkUserOnGroup = false
  countMember = 0
  checkManager = false
  step = 0;

  groupPostCreateForm: FormGroup = new FormGroup({
    content: new FormControl("", [Validators.required]),
  })

  constructor(private groupService: GroupService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private commonService: CommonService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const id: any = paramMap.get('id');
      console.log("id idGroup: " + id)
      this.idGroup = id;
      this.groupService.findById(id).subscribe(rs => {
        console.log("vào đây")
        this.theGroup = rs;
        this.idCreateGroup = this.theGroup.idUserCreate
        this.groupService.findAllUserStatusPendingApproval(id).subscribe(rs => {
          console.log("vào đây 2")
          this.groupParticipant = rs
        })
        this.groupService.findAllUserStatusApproved(id).subscribe(rs => {
          console.log("vào đây 3")
          this.groupParticipant2 = rs
          try {
            this.countMember = rs.length
          } catch (err) {
            console.log("lỗi length")
          }
        })
      })
    })
  }

  checkManagerGroup() {
    if (this.idCreateGroup == this.idUserLogIn) {
      this.checkManager = true
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  joinGroupParticipant() {
    this.groupService.createGroupParticipant(this.idUserLogIn, this.idGroup).subscribe(() => {
      console.log("joinGroupParticipant")
      this.ngOnInit()
    }, error => {
      console.log(error);
      this.commonService.dialogCommon(error)
    })
  }

  acceptUserJoinGroup(idUser: any) {
    this.groupService.acceptUserJoinGroup(this.idUserLogIn, idUser, this.idGroup).subscribe(() => {
      console.log("acceptUserJoinGroup")
      this.ngOnInit()
    }, error => {
      console.log(error);
      this.commonService.dialogCommon(error)
    })
  }

  rejectUserJoinGroup(idUser: any) {
    this.groupService.rejectUserJoinGroup(this.idUserLogIn, idUser, this.idGroup).subscribe(() => {
      console.log("rejectUserJoinGroup")
      this.ngOnInit()
    }, error => {
      console.log(error);
      this.commonService.dialogCommon(error)
    })
  }

  lockGroup() {
    this.groupService.lockGroup(this.idGroup, this.idUserLogIn).subscribe(() => {
      console.log("lockGroup")
    }, error => {
      console.log(error);
      this.commonService.dialogCommon(error)
    })
  }

  acceptUserUpPost() {
    this.groupService.acceptUserUpPost(this.idGroup, this.idUserLogIn).subscribe(() => {
      console.log("acceptUserUpPost")
    }, error => {
      console.log(error);
      this.commonService.dialogCommon(error)
    })
  }

  rejectUserUpPost() {
    this.groupService.rejectUserUpPost(this.idGroup, this.idUserLogIn).subscribe(() => {
      console.log("rejectUserUpPost")
    }, error => {
      console.log(error);
      this.commonService.dialogCommon(error)
    })
  }
}
