import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-check-login',
  templateUrl: './dialog-check-login.component.html',
  styleUrls: ['./dialog-check-login.component.css']
})
export class DialogCheckLoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogCheckLoginComponent>) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
