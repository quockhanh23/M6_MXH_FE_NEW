import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogRegisterSuccessComponent} from './dialog-register-success/dialog-register-success.component';
import {DialogSuccessComponent} from './dialog-success/dialog-success.component';
import {DialogLoginSuccessComponent} from './dialog-login-success/dialog-login-success.component';
import {MaterialModule} from "../material/material.module";
import {DialogLogoutComponent} from './dialog-logout/dialog-logout.component';
import {DialogCommonComponent} from './dialog-common/dialog-common.component';
import {DialogCheckLoginComponent} from "./dialog-check-login/dialog-check-login.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';

const NotificationComponents = [
  DialogRegisterSuccessComponent,
  DialogSuccessComponent,
  DialogLoginSuccessComponent,
  DialogCheckLoginComponent,
  DialogLogoutComponent,
  DialogCommonComponent
]

@NgModule({
  declarations: [
    NotificationComponents,
    DialogHeaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatProgressBarModule
  ],
  exports: []
})
export class NotificationsModule {
}
