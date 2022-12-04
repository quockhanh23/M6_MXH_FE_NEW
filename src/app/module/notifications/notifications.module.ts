import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogFailComponent} from './dialog-fail/dialog-fail.component';
import {DialogLoginFailComponent} from './dialog-login-fail/dialog-login-fail.component';
import {DialogRegisterFailComponent} from './dialog-register-fail/dialog-register-fail.component';
import {DialogRegisterSuccessComponent} from './dialog-register-success/dialog-register-success.component';
import {DialogSuccessComponent} from './dialog-success/dialog-success.component';
import {DialogLoginSuccessComponent} from './dialog-login-success/dialog-login-success.component';
import {MaterialModule} from "../material/material.module";
import { DialogLockedComponent } from './dialog-locked/dialog-locked.component';
import { DialogDuplicatedComponent } from './dialog-duplicated/dialog-duplicated.component';
import { DialogConfirmPasswordComponent } from './dialog-confirm-password/dialog-confirm-password.component';
import { DialogLogoutComponent } from './dialog-logout/dialog-logout.component';

const NotificationComponents = [
  DialogFailComponent,
  DialogLoginFailComponent,
  DialogRegisterFailComponent,
  DialogRegisterSuccessComponent,
  DialogSuccessComponent,
  DialogLoginSuccessComponent
]

@NgModule({
  declarations: [
    NotificationComponents,
    DialogLockedComponent,
    DialogDuplicatedComponent,
    DialogConfirmPasswordComponent,
    DialogLogoutComponent,
  ],
    imports: [
        CommonModule,
        MaterialModule
    ],
  exports: []
})
export class NotificationsModule {
}
