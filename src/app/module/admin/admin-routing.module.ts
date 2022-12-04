import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManagerUsersComponent} from "./manager-users/manager-users.component";
import {ActionUserComponent} from "./action-user/action-user.component";

const routes: Routes = [
  {
    path: 'manageUser', component: ManagerUsersComponent
  },
  {
    path: 'action/:id', component: ActionUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
