import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogRegisterSuccessComponent} from './dialog-register-success/dialog-register-success.component';
import {DialogSuccessComponent} from './dialog-success/dialog-success.component';
import {DialogLoginSuccessComponent} from './dialog-login-success/dialog-login-success.component';
import {MaterialModule} from "../material/material.module";
import {DialogLogoutComponent} from './dialog-logout/dialog-logout.component';
import {DialogCommonComponent} from './dialog-common/dialog-common.component';

const NotificationComponents = [
  DialogRegisterSuccessComponent,
  DialogSuccessComponent,
  DialogLoginSuccessComponent
]

@NgModule({
  declarations: [
    NotificationComponents,
    DialogLogoutComponent,
    DialogCommonComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: []
})
export class NotificationsModule {
}
