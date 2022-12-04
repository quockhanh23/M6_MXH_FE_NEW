import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-fail',
  templateUrl: './dialog-fail.component.html',
  styleUrls: ['./dialog-fail.component.css']
})
export class DialogFailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogFailComponent>) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
