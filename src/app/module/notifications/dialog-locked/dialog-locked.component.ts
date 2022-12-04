import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-locked',
  templateUrl: './dialog-locked.component.html',
  styleUrls: ['./dialog-locked.component.css']
})
export class DialogLockedComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogLockedComponent>) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
