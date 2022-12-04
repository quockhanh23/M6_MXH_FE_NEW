import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupService} from "../../../services/group.service";
import {finalize, Observable} from "rxjs";
import {TheGroup} from "../../../models/the-group";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  fb: any = null;
  fb1: any = null;
  downloadURL: Observable<string> | undefined;
  downloadURL1: Observable<string> | undefined;
  avatar: string = "";
  cover: string = "";
  theGroup?: TheGroup
  groupCreateForm: FormGroup = new FormGroup({
    groupName: new FormControl("",[Validators.required]),
    createBy: new FormControl("",[Validators.required]),
    type: new FormControl("",[Validators.required]),
  })

  constructor(private groupService: GroupService,
              private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
  }

  createGroup() {
    console.log("vào hàm createGroup")
    let newGroup = {
      groupName: this.groupCreateForm.value.groupName,
      createBy: this.groupCreateForm.value.createBy,
      type: this.groupCreateForm.value.type,
      avatarGroup: this.fb,
      coverGroup: this.fb1,
      idUserCreate: this.idUserLogIn
    }
    console.log(newGroup)
    // @ts-ignore
    this.groupService.createGroup(newGroup, this.idUser).subscribe(result => {
      this.theGroup = result
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  onFileSelected(event: any) {
    var n = Date.now();
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
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  onFileSelected1(event: any) {
    var n1 = Date.now();
    const file1 = event.target.files[0];
    const filePath1 = `RoomsImages/${n1}`;
    const fileRef1 = this.storage.ref(filePath1);
    const task1 = this.storage.upload(`RoomsImages/${n1}`, file1);
    task1
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL1 = fileRef1.getDownloadURL();
          this.downloadURL1.subscribe(url => {
            if (url) {
              this.fb1 = url;
            }
            console.log(this.fb1);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
}
