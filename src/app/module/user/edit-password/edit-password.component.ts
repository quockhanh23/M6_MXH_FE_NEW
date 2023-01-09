import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DialogSuccessComponent} from "../../notifications/dialog-success/dialog-success.component";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  messagePassword? = 'Mật khẩu phải có độ dài từ 6 - 32 kí tự!'
  messageNotBlank? = 'Không được để trống!'
  idUserLogIn = localStorage.getItem("USERID")

  updateForm = new FormGroup({
    passwordOld: new FormControl('', [Validators.required]),
    passwordNew: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    confirmPasswordNew: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
  });

  constructor(private router: Router,
              private userService: UserService,
              public dialog: MatDialog,
              private commonService: CommonService,
  ) {
    if (localStorage.getItem('currentUser') == null) {
      this.router.navigate(['']).then()
    }
  }

  ngOnInit(): void {
  }

  updatePassword() {
    let change = {
      passwordOld: this.updateForm.value.passwordOld,
      passwordNew: this.updateForm.value.passwordNew,
      confirmPasswordNew: this.updateForm.value.confirmPasswordNew,
    }
    this.userService.matchPassword(change, this.idUserLogIn).subscribe(() => {
      this.dialog.open(DialogSuccessComponent)
    }, error => {
      this.commonService.dialogCommon(error)
    })
  }
}
