import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {MessengerService} from "../../../services/messenger.service";
import {Messenger} from "../../../models/messenger";
import {User} from "../../../models/user";
import {Conversation} from "../../../models/conversation";
import {FormControl, FormGroup} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-messenger-detail',
  templateUrl: './messenger-detail.component.html',
  styleUrls: ['./messenger-detail.component.css']
})
export class MessengerDetailComponent implements OnInit {

  idConversation?: any
  idUserLogIn = localStorage.getItem("USERID")
  url = localStorage.getItem("Url")
  messengers?: Messenger[]
  messenger?: Messenger
  user?: User
  idUser?: any
  conversation?: Conversation
  withUser = 'Đang trò truyện với : '
  count = 0
  count2 = 0
  height: any
  background: any
  myScrollContainer: any;
  border = 'border: #b2dba1 1px solid'
  checkDone = false
  checkButton = true
  fb: any;
  downloadURL!: Observable<string>;
  checkConnectInput = false

  messengerForm: FormGroup = new FormGroup({
    content: new FormControl("",),
    image: new FormControl("",)
  })


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private storage: AngularFireStorage,
              private messengerService: MessengerService,
              private commonService: CommonService,) {
  }

  ngOnInit(): void {
    this.idUser = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("idUser: " + this.idUser)
    console.log("idUserLogIn: " + this.idUserLogIn)
    this.userService.findById(this.idUser).subscribe(rs => {
      this.user = rs;
    })
    // @ts-ignore
    this.messengerService.myMessenger(this.idUserLogIn).subscribe(rs => {
      for (let i = 0; i < rs.length; i++) {
        console.log("idUser: " + this.idUser)
        if (rs[i].idSender?.id == this.idUserLogIn && rs[i].idReceiver?.id == this.idUser) {
          this.conversation = rs[i]
          break
        }
        if (rs[i].idReceiver?.id == this.idUserLogIn && rs[i].idSender?.id == this.idUser) {
          this.conversation = rs[i]
          break
        }
      }
      this.idConversation = this.conversation?.id
      if (this.idConversation == undefined) {
        // @ts-ignore
        this.messengerService.createConversation(this.idUserLogIn, this.idUser).subscribe(rs => {
          this.conversation = rs
          console.log("this.conversation" + this.conversation)
          this.idConversation = this.conversation?.id
        })
      }
      console.log("idConversation: " + this.idConversation)
      this.findById();
    }, error => {
      // @ts-ignore
      this.messengerService.createConversation(this.idUserLogIn, this.idUser).subscribe(rs => {
        this.conversation = rs
        console.log("this.conversation" + this.conversation)
        this.idConversation = this.conversation?.id
      })
      console.log("idConversation: " + this.idConversation)
      this.findById();
    })
    this.scrollToBottom()
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log("")
    }
  }

  findById() {
    this.messengerService.messenger(this.idUser, this.idConversation).subscribe(rs => {
      this.messengers = rs
      this.count = rs.length
      this.checkCount()
    }, error => {
      console.log("Lỗi: " + error)
      this.checkCount()
    })
    // @ts-ignore
    this.messengerService.messenger(this.idUserLogIn, this.idConversation).subscribe(rs => {
      this.messengers = rs
      this.count2 = rs.length
      this.checkCount()
    }, error => {
      console.log("Lỗi: " + error)
      this.checkCount()
    })
  }

  checkCount() {
    console.log("vào hàm checkCount")
    if (this.count == 0 && this.count2 == 0) {
      this.height = 'height: 400px'
      console.log("vào đây 1 " + this.count + this.count2)
    } else {
      let px = this.count2 * 2
      this.height = 'height: ' + px + 'px'
      console.log("vào đây 2 " + this.count + this.count2)
    }
    console.log("" + this.height)
  }

  createMessenger(idConversation: any) {
    console.log("vào hàm createMessenger")
    const newMessenger = {
      content: this.messengerForm.value.content,
      image: this.fb
    }
    console.log(newMessenger)
    // @ts-ignore
    this.messengerService.createMessenger(idConversation, this.idUserLogIn, newMessenger).subscribe(rs => {
      console.log("vào đây")
      this.messenger = rs
      this.fb = null
    }, error => {
      console.log("Lỗi: " + error)
    })
    this.ngOnInit()
  }

  back() {
    console.log(this.url)
    if (this.url == environment.localUrl + '/user/people-detail/' + this.idUser) {
      this.router.navigate(['user/people-detail', this.idUser]).then(rs => {
        console.log(rs)
      })
    }
    if (this.url == environment.localUrl + '/user/requests') {
      this.router.navigate(['user/requests']).then(rs => {
        console.log(rs)
      })
    }
  }

  onFileSelected(event: any) {
    this.checkDone = true
    this.checkButton = false
    let n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
            this.checkDone = false
            this.checkButton = true
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  changeBackgroundColor1() {
    this.background = this.commonService.changeBackgroundColor1()
  }

  changeBackgroundColor2() {
    this.background = this.commonService.changeBackgroundColor2()
  }

  changeBackgroundColor3() {
    this.background = this.commonService.changeBackgroundColor3()
  }

  changeBackgroundColor4() {
    this.background = this.commonService.changeBackgroundColor4()
  }

  connectInput() {
    this.checkConnectInput = this.commonService.connectInput()
    console.log(this.checkConnectInput)
  }

  leaveInput() {
    this.checkConnectInput = this.commonService.leaveInput()
    console.log(this.checkConnectInput)
  }
}
