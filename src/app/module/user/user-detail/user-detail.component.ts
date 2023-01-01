import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {ShortNewService} from "../../../services/short-new.service";
import {LifeEventsService} from "../../../services/life-events.service";
import {LifeEvents} from "../../../models/life-events";
import {FriendRelationService} from "../../../services/friend-relation.service";
import {UserDTO} from "../../../models/user-dto";
import {FormControl, FormGroup} from "@angular/forms";
import {DescriptionService} from "../../../services/description.service";
import {UserDescription} from "../../../models/user-description";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  my? = 'của tôi'
  currentUser: any
  avatar: string = "";
  cover: string = "";
  url: string = "null";
  idUserLogIn = localStorage.getItem("USERID")
  lifeEvents?: LifeEvents[]
  showLifeEvents = false
  listFriend?: UserDTO[];
  count = 0
  createAt?: any
  date?: string
  lifeEvent?: LifeEvents
  checkFromCreateLifeEvent = false
  checkUpdateLifeEvent = false
  checkShowDescription = false
  idLifeEvent?: any
  descriptions?: UserDescription
  switchChangePassword = false

  lifeEventsCreateForm: FormGroup = new FormGroup({
    work: new FormControl("",),
    timeline: new FormControl("",)
  })

  updateForm = new FormGroup({
    work: new FormControl(''),
    timeline: new FormControl("",)
  });

  constructor(private router: Router,
              private userService: UserService,
              private shortNewService: ShortNewService,
              private lifeEventsService: LifeEventsService,
              private activatedRoute: ActivatedRoute,
              private friendRelationService: FriendRelationService,
              private descriptionService: DescriptionService,
  ) {
    localStorage.setItem('UrlShortNew', window.location.href);
    localStorage.setItem('UrlUserDetail', window.location.href);
    if (localStorage.getItem('currentUser') == null) {
      this.router.navigate(['']).then()
    }
    // @ts-ignore
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.avatar = this.currentUser.avatar;
    this.cover = this.currentUser.cover;
    this.createAt = this.currentUser.createAt
    this.userService.getUserProfile(this.currentUser.id).subscribe(result => {
      this.currentUser = result;
      localStorage.setItem('currentUser', JSON.stringify(result));
      this.avatar = this.currentUser.avatar;
      this.cover = this.currentUser.cover;
    }, error => {
      console.log(error);
    })
  }

  ngOnInit(): void {
    this.findListByIdUser()
    this.friends()
    this.getDescriptionByIdUser()
  }

  findListByIdUser() {
    console.log("vào hàm findListByIdUser")
    // @ts-ignore
    this.lifeEventsService.findListByIdUser(this.idUserLogIn).subscribe(result => {
      this.lifeEvents = result
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  openLifeEvents() {
    this.showLifeEvents = true
  }

  closeLifeEvents() {
    this.showLifeEvents = false
  }

  friends() {
    this.friendRelationService.listFriendShowAvatarLimit(this.idUserLogIn).subscribe(rs => {
      this.listFriend = rs
      this.count = rs.length
    })
  }

  createLifeEvent() {
    console.log("vào hàm createLifeEvent")
    const life = {
      user: {
        id: this.idUserLogIn
      },
      work: this.lifeEventsCreateForm.value.work,
      timeline: this.lifeEventsCreateForm.value.timeline,
    }
    console.log(life)
    // @ts-ignore
    this.lifeEventsService.createLifeEvents(life, this.idUserLogIn).subscribe(result => {
      this.lifeEvent = result
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  update(): void {
    const lifeEvent = {
      work: this.updateForm.value.work,
      timeline: this.updateForm.value.timeline,
    }
    console.log("id : " + this.idLifeEvent)
    // @ts-ignore
    this.lifeEventsService.editLifeEvents(this.idUserLogIn, this.idLifeEvent, lifeEvent).subscribe(result => {
      this.lifeEvent = result
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
    })
    this.updateForm.reset();
  }

  openFromCreateLifeEvent() {
    this.checkFromCreateLifeEvent = true
  }

  closeFromCreateLifeEvent() {
    this.checkFromCreateLifeEvent = false
  }

  openUpdateLifeEvent() {
    this.checkUpdateLifeEvent = true
  }

  closeUpdateLifeEvent() {
    this.checkUpdateLifeEvent = false
  }

  openDescription() {
    this.checkShowDescription = true
  }

  closeDescription() {
    this.checkShowDescription = false
  }

  getOne(idLifeEvent: any) {
    // @ts-ignore
    this.lifeEventsService.getOne(this.idUserLogIn, idLifeEvent).subscribe(result => {
      this.lifeEvent = result
      localStorage.setItem('idLifeEvent', <string>this.lifeEvent.id);
      this.idLifeEvent = localStorage.getItem("idLifeEvent")
      console.log("vào hàm getOne" + this.idLifeEvent)
      this.updateForm = new FormGroup({
        work: new FormControl(this.lifeEvent.work),
        timeline: new FormControl(this.lifeEvent.timeline),
      });
    })
  }

  getDescriptionByIdUser() {
    this.descriptionService.getDescriptionByIdUser(this.idUserLogIn).subscribe(rs => {
      this.descriptions = rs
    })
  }

  openChangePassword() {
    this.switchChangePassword = true
  }

  closeChangePassword() {
    this.switchChangePassword = false
  }
}
