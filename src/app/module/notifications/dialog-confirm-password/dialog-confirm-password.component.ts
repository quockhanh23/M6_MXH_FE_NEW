import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-confirm-password',
  templateUrl: './dialog-confirm-password.component.html',
  styleUrls: ['./dialog-confirm-password.component.css']
})
export class DialogConfirmPasswordComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogConfirmPasswordComponent>) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
