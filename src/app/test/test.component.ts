import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {NgbAlert, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  private _success = new Subject<string>();
  successMessage = '';
  @ViewChild('staticAlert', {static: false}) staticAlert!: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert!: NgbAlert;
  show = true;
  currentRate = 8;

  constructor(public dialog: MatDialog,
              private toarts: ToastrService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    setTimeout(() => this.staticAlert.close(), 20000);
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  public changeSuccessMessage() {
    this._success.next(`${new Date()} - Message successfully changed.`);
  }

  openToarts() {
    this.toarts.success('alo123', '12345')
  }

  close() {
    this.show = false;
    setTimeout(() => this.show = true, 1000);
  }

  // @ts-ignore
  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

// @ts-ignore
  openWindowCustomClass(content) {
    this.modalService.open(content, {windowClass: 'dark-modal'});
  }

// @ts-ignore
  openSm(content) {
    this.modalService.open(content, {size: 'sm'});
  }

// @ts-ignore
  openLg(content) {
    this.modalService.open(content, {size: 'lg'});
  }

// @ts-ignore
  openXl(content) {
    this.modalService.open(content, {size: 'xl'});
  }

// @ts-ignore
  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true});
  }

// @ts-ignore
  openScrollableContent(longContent) {
    this.modalService.open(longContent, {scrollable: true});
  }

// @ts-ignore
  openModalDialogCustomClass(content) {
    this.modalService.open(content, {modalDialogClass: 'dark-modal'});
  }
}
