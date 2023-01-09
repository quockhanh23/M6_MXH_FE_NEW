import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ManagerUsersComponent} from './manager-users/manager-users.component';
import {ActionUserComponent} from './action-user/action-user.component';
import {MaterialModule} from "../material/material.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import { ManagerGroupComponent } from './manager-group/manager-group.component';

@NgModule({
  declarations: [
    ManagerUsersComponent,
    ActionUserComponent,
    ManagerGroupComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        MatTooltipModule
    ]
})
export class AdminModule {
}
