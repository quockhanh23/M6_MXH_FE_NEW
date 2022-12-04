import {Component, OnInit} from '@angular/core';
import {Image} from "../../../models/image";
import {ImageService} from "../../../services/image.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-my-image',
  templateUrl: './my-image.component.html',
  styleUrls: ['./my-image.component.css']
})
export class MyImageComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  images?: Image[]
  idUser?: any
  fullNameUser?: any
  count?: any
  height?: string
  check1 = false
  check2 = false

  constructor(private imageService: ImageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,) {
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
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  delete2(idImage: any) {
    console.log("idImage là: " + idImage);
    this.imageService.deleteInDataBase(idImage, this.idUser).subscribe(result => {
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
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
      if (this.count < 10 && this.count > 5) {
        this.height = 'height: 50px'
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
      this.images = result
      this.count = result.length
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
    })
  }
}
