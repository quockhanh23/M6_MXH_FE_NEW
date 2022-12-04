import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterLoginComponent} from "./register-login/register-login.component";

const routes: Routes = [
  {
    path: '',
    component: RegisterLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRegisterRoutingModule {
}
