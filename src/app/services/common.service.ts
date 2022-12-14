import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogCommonComponent} from "../module/notifications/dialog-common/dialog-common.component";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public dialog: MatDialog,) {
  }

  changeBackgroundColor1() {
    return 'background-color: pink'
  }

  changeBackgroundColor2() {
    return 'background-color: #afd9ee'
  }

  changeBackgroundColor3() {
    return 'background-color: #1deecf'
  }

  changeBackgroundColor4() {
    return 'background-color: #fcfcfc'
  }

  changeColorInput() {
    // @ts-ignore
    document.getElementById('search').style.background = "#e0e6ef";
  }

  changeColorInput2() {
    // @ts-ignore
    document.getElementById('search').style.background = 'white';
  }

  connectInput() {
    return true
  }

  leaveInput() {
    // @ts-ignore
    let value = document.getElementById('value').value
    return value.length > 0;
  }

  consoleStringify(result: any) {
    console.log("data: " + JSON.stringify(result))
  }

  dialogCommon(error: any) {
    this.dialog.open(DialogCommonComponent, {
      data: {dialogTitle: error.error.message, dialogText: error.error.description}
    })
  }
}
