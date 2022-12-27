import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ShortNews} from "../../../models/short-news";
import {ShortNewService} from "../../../services/short-new.service";

@Component({
  selector: 'app-short-new',
  templateUrl: './short-new.component.html',
  styleUrls: ['./short-new.component.css']
})
export class ShortNewComponent implements OnInit {

  shortNew2?: ShortNews[]
  shortNewLimit?: ShortNews[]
  count = 0;

  constructor(private userService: UserService,
              private shortNewService: ShortNewService
  ) {
    this.shortNewService.newDay().subscribe()
  }

  ngOnInit(): void {
    this.allShortNews()
    this.shortNewsLimit()
  }

  allShortNews() {
    console.log("vào hàm allShortNews")
    this.shortNewService.allShortNews().subscribe(rs => {
      this.count = rs.length
      this.shortNew2 = rs
      // console.log("Kiểu dữ liệu: " + JSON.stringify(rs))
    })
  }

  shortNewsLimit() {
    console.log("vào hàm shortNewsLimit")
    this.shortNewService.shortNewsLimit().subscribe(rs => {
      this.count = rs.length
      this.shortNewLimit = rs
    })
  }
}
