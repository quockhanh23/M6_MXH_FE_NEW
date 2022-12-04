import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-duplicated',
  templateUrl: './dialog-duplicated.component.html',
  styleUrls: ['./dialog-duplicated.component.css']
})
export class DialogDuplicatedComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDuplicatedComponent>) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
