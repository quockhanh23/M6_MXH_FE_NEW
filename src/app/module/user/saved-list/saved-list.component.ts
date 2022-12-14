import {Component, OnInit} from '@angular/core';
import {SaveService} from "../../../services/save.service";
import {Saved} from "../../../models/saved";
import {ToartsService} from "../../../services/toarts.service";
import {MatDialog} from "@angular/material/dialog";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-saved-list',
  templateUrl: './saved-list.component.html',
  styleUrls: ['./saved-list.component.css']
})
export class SavedListComponent implements OnInit {

  saveList?: Saved[]
  idUserLogIn = localStorage.getItem("USERID")
  checkSaveList = false

  constructor(private saveService: SaveService,
              private toartsService: ToartsService,
              public dialog: MatDialog,
              private commonService: CommonService
  ) {
  }

  ngOnInit(): void {
    this.listSavedPost()
  }

  listSavedPost() {
    console.log("vào hàm listSavedPost")
    this.saveService.listSavedPost(this.idUserLogIn).subscribe(rs => {
      this.saveList = rs
      this.checkSaveList = rs.length > 0;
    })
  }

  removeSavePost(idPost: any, idSaved: any) {
    console.log("vào hàm removeSavePost")
    this.saveService.removeSavePost(idPost, idSaved).subscribe(() => {
      this.toartsService.openToartsSavePost('remove')
      this.listSavedPost()
    }, error => {
      this.commonService.dialogCommon(error)
    })
  }
}
