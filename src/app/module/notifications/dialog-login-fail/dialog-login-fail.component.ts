import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-login-fail',
  templateUrl: './dialog-login-fail.component.html',
  styleUrls: ['./dialog-login-fail.component.css']
})
export class DialogLoginFailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogLoginFailComponent>) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
