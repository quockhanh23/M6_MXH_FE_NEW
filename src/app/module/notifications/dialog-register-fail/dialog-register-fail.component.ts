import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-register-fail',
  templateUrl: './dialog-register-fail.component.html',
  styleUrls: ['./dialog-register-fail.component.css']
})
export class DialogRegisterFailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogRegisterFailComponent>) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
