import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-login-success',
  templateUrl: './dialog-login-success.component.html',
  styleUrls: ['./dialog-login-success.component.css']
})
export class DialogLoginSuccessComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogLoginSuccessComponent>) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
