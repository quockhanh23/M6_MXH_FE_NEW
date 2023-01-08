import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {PostService} from "../../../services/post.service";
import {User} from "../../../models/user";
import {Post2} from "../../../models/post2";
import {AdminService} from "../../../services/admin.service";
import {Image} from "../../../models/image";
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'app-action-user',
  templateUrl: './action-user.component.html',
  styleUrls: ['./action-user.component.css']
})
export class ActionUserComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  user?: User
  idUser: string | undefined;
  post?: Post2[]
  count?: any
  imageList?: Image[]

  constructor(private router: Router,
              private userService: UserService,
              private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private adminService: AdminService,
              private imageService: ImageService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const id: any = paramMap.get('id');
      console.log("id user: " + id)
      this.idUser = id
      this.adminService.findById(id).subscribe(result => {
        this.user = result
      }, error => {
        console.log("Lỗi: " + error)
      })
      this.getAllImage(id)
      this.postService.allPostPublic(id).subscribe(result => {
        this.post = result
        this.count = result.length
      }, error => {
        console.log("Lỗi: " + error)
      })
    })
  }

  getAllImage(idUser: any) {
    console.log('vào hàm getAllImage')
    this.imageService.allImageOfUser(idUser).subscribe(result => {
      this.imageList = result
    }, error => {
      console.log("Lỗi: " + error)
    })
  }
}
