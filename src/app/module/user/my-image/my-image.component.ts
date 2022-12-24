import {Component, OnInit} from '@angular/core';
import {Image} from "../../../models/image";
import {ImageService} from "../../../services/image.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {ToartsService} from "../../../services/toarts.service";
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-my-image',
  templateUrl: './my-image.component.html',
  styleUrls: ['./my-image.component.css']
})
export class MyImageComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  images?: Image[]
  images2?: Image[]
  idUser?: any
  fullNameUser?: any
  count?: any
  count2?: any
  height?: string
  check1 = false
  check2 = false
  typeAvatar = 'Avatar'
  typeCover = 'Cover'
  checkListImageDelete = false
  checkListImage = true
  fb: any;
  checkDone = false
  checkButton = true
  downloadURL!: Observable<string>;
  loading = false

  constructor(private imageService: ImageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private toarts: ToartsService,
              private storage: AngularFireStorage) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const id: any = paramMap.get('id');
      console.log("id user: " + id)
      this.idUser = id;
      this.userService.findById(id).subscribe(result => {
        this.fullNameUser = result.fullName
      })
      this.getAllImage(id)
    })
  }

  ngOnInit(): void {
  }

  delete(idImage: any) {
    console.log("idImage là: " + idImage);
    this.imageService.delete(idImage, this.idUser).subscribe(result => {
      this.getAllImage(this.idUserLogIn)
      console.log("vào đây")
    }, error => {
      console.log("Lỗi: " + error)
      this.getAllImage(this.idUserLogIn)
    })
    this.getAllImage(this.idUserLogIn)
  }

  restoreImage(idImage: any) {
    console.log("idImage là: " + idImage);
    this.imageService.restoreImage(idImage, this.idUser).subscribe(result => {
      console.log("vào đây")
      this.getAllImageDeleted()
    }, error => {
      this.getAllImageDeleted()
      console.log("Lỗi: " + error)
    })
  }

  delete2(idImage: any) {
    console.log("idImage là: " + idImage);
    this.imageService.deleteInDataBase(idImage, this.idUser).subscribe(result => {
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
      this.ngOnInit()
    })
  }

  getAllImage(idUser: any) {
    console.log('vào hàm getAllImage')
    this.check1 = true
    this.check2 = false
    this.imageService.allImageOfUser(idUser).subscribe(result => {
      this.images = result
      this.count = result.length
      if (this.count == 0) {
        this.height = 'height: 420px'
      }
      if (this.count < 5 && this.count > 0) {
        this.height = 'height: 320px'
      }
      if (this.count < 10 && this.count >= 5) {
        this.height = 'height: 100px'
      }
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  getAllImageDeleted() {
    console.log('vào hàm getAllImageDeleted')
    this.check1 = false
    this.check2 = true
    this.imageService.getAllImageDeleted(this.idUser).subscribe(result => {
      this.images2 = result
      this.count2 = result.length
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  changeImage(idImage: any, type: any) {
    console.log('vào hàm changeImage')
    this.userService.changeImage(this.idUser, idImage, type).subscribe(result => {
      this.ngOnInit()
      this.toarts.openToartsChangeImage(type)
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  openListImageDelete() {
    this.checkListImageDelete = true
    this.checkListImage = false
  }

  closeListImageDelete() {
    this.checkListImageDelete = false
    this.checkListImage = true
  }

  onFileSelected(event: any) {
    this.loading = true
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
              this.addPhoto(url)
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

  addPhoto(linkImage: any) {
    console.log("vào hàm addPhoto")
    const newPhoto = {
      linkImage: linkImage,
      user: {
        id: this.idUser
      },
    }
    // @ts-ignore
    this.imageService.addPhoto(this.idUserLogIn, newPhoto).subscribe(result => {
      this.getAllImage(this.idUserLogIn)
      this.fb = null
      this.loading = false
    }, error => {
      console.log("Lỗi: " + error)
      if (error.status == 200) {
        this.getAllImage(this.idUserLogIn)
        this.fb = null
        this.loading = false
      }
    })
  }
}
