import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../../services/image.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {PostService} from "../../../services/post.service";
import {ShortNewService} from "../../../services/short-new.service";

@Component({
  selector: 'app-garbage',
  templateUrl: './garbage.component.html',
  styleUrls: ['./garbage.component.css']
})
export class GarbageComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")

  constructor(private imageService: ImageService,
              private userService: UserService,
              private postService: PostService,
              private shortNewService: ShortNewService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.testRouter()
  }

  testRouter() {
    console.log(localStorage.key(2));
    let pathString = location.pathname
    console.log('appComponent: pathString...');
    console.log(pathString);
  }
}
