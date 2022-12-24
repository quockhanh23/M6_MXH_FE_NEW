import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-duplicated',
  templateUrl: './dialog-duplicated.component.html',
  styleUrls: ['./dialog-duplicated.component.css']
})
export class DialogDuplicatedComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<any>();
  dialogTitle?: string;
  dialogText?: string;
  constructor(public dialogRef: MatDialogRef<DialogDuplicatedComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;
    this.dialogText = this.data.dialogText;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
