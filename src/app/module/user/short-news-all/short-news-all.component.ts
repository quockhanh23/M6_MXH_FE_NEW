import {Component, OnInit} from '@angular/core';
import {ShortNews} from "../../../models/short-news";
import {UserService} from "../../../services/user.service";
import {ShortNewService} from "../../../services/short-new.service";
import {FormControl, FormGroup} from "@angular/forms";
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ToartsService} from "../../../services/toarts.service";

@Component({
  selector: 'app-short-news-all',
  templateUrl: './short-news-all.component.html',
  styleUrls: ['./short-news-all.component.css']
})
export class ShortNewsAllComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  shortNew?: ShortNews[]
  check = false;
  count?: any;
  height?: string
  myScrollContainer: any;
  checkDone = false
  checkButton = true
  downloadURL!: Observable<string>;
  fb: any;

  shortNewForm: FormGroup = new FormGroup({
    content: new FormControl("",),
    image: new FormControl("",),
    status: new FormControl("",)
  })

  constructor(private userService: UserService,
              private shortNewService: ShortNewService,
              private toarts: ToartsService,
              private storage: AngularFireStorage,
  ) {
    localStorage.setItem('UrlShortNew', window.location.href);
  }

  ngOnInit(): void {
    this.allShortNews()
    this.scrollToBottom()
    this.allShortNewPublic()
  }

  allShortNews() {
    this.shortNewService.allShortNews().subscribe(() => {
    })
  }

  allShortNewPublic() {
    this.shortNewService.allShortNewPublic().subscribe(rs => {
      this.shortNew = rs
      this.count = rs.length
      if (rs.length == null) {
        this.count = 0;
      }
      if (this.count > 5 && this.count <= 10) {
        this.height = 'height: 120px'
      }
      if (this.count < 5) {
        this.height = 'height: 400px'
      }
      if (this.count > 10) {
        this.height = 'height: 100px'
      }
    })
  }

  createShortNew() {
    console.log("vào hàm createShortNew")
    const newShort = {
      content: this.shortNewForm.value.content,
      image: this.fb,
      status: this.shortNewForm.value.status,
      user: {
        id: this.idUserLogIn
      }
    }
    console.log(newShort)
    // @ts-ignore
    this.shortNewService.createShortNew(newShort, this.idUserLogIn).subscribe(() => {
      this.toarts.openToartsShortNewCreateSuccess()
      this.allShortNewPublic()
    }, error => {
      console.log("Lỗi: " + error)
      if (error.status == 201) {
        this.toarts.openToartsShortNewCreateSuccess()
        this.closeCreate()
      }
      this.allShortNewPublic()
    })
    this.fb = null
  }

  showCreate() {
    this.check = true;
    console.log(this.check)
  }

  closeCreate() {
    this.check = false;
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log("lỗi scroll")
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
    task.snapshotChanges().pipe(finalize(() => {
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
      ).subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
}
