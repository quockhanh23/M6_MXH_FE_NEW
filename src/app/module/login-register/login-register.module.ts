import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRegisterRoutingModule} from './login-register-routing.module';
import {RegisterLoginComponent} from './register-login/register-login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [
    RegisterLoginComponent
  ],
  imports: [
    CommonModule,
    LoginRegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class LoginRegisterModule {
}
