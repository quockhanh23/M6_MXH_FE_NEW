import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() {
  }

  changeColorInput() {
    // @ts-ignore
    document.getElementById('search').style.background = "#e0e6ef";
  }

  changeColorInput2() {
    // @ts-ignore
    document.getElementById('search').style.background = 'white';
  }

  connectInput(checkConnectInput: boolean) {
    return checkConnectInput = true
  }

  leaveInput(checkConnectInput: boolean) {
    // @ts-ignore
    let value = document.getElementById('value').value
    return checkConnectInput = value.length > 0;
  }
}
