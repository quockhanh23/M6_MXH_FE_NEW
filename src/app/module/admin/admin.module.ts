import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ManagerUsersComponent} from './manager-users/manager-users.component';
import {ActionUserComponent} from './action-user/action-user.component';
import {MaterialModule} from "../material/material.module";

@NgModule({
  declarations: [
    ManagerUsersComponent,
    ActionUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class AdminModule {
}
