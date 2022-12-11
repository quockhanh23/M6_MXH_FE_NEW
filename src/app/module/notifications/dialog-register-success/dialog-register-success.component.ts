import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-register-success',
  templateUrl: './dialog-register-success.component.html',
  styleUrls: ['./dialog-register-success.component.css']
})
export class DialogRegisterSuccessComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogRegisterSuccessComponent>) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
