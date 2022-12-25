import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NewsfeedComponent} from './newsfeed/newsfeed.component';
import {FriendRequestComponent} from "./friend-request/friend-request.component";
import {EditPasswordComponent} from './edit-password/edit-password.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {PeopleDetailComponent} from './people-detail/people-detail.component';
import {MyPostComponent} from './my-post/my-post.component';
import {FriendListComponent} from "./friend-list/friend-list.component";
import {ShortNewComponent} from "./short-new/short-new.component";
import {MyGroupComponent} from './my-group/my-group.component';
import {MyImageComponent} from "./my-image/my-image.component";
import {MessengerComponent} from './messenger/messenger.component';
import {MatMenuModule} from "@angular/material/menu";
import {MessengerDetailComponent} from './messenger-detail/messenger-detail.component';
import {MyShortNewComponent} from './my-short-new/my-short-new.component';
import {GarbageComponent} from './garbage/garbage.component';
import {GroupCreateComponent} from "./group-create/group-create.component";
import {GroupSharedComponent} from './group-shared/group-shared.component';
import {GroupDetailComponent} from './group-detail/group-detail.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SavedListComponent} from './saved-list/saved-list.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MaterialModule} from "../material/material.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ShortNewsAllComponent} from './short-news-all/short-news-all.component';
import {BlackListComponent} from './black-list/black-list.component';


@NgModule({
  declarations: [
    EditProfileComponent,
    EditPasswordComponent,
    NewsfeedComponent,
    FriendRequestComponent,
    UserDetailComponent,
    PeopleDetailComponent,
    MyPostComponent,
    FriendListComponent,
    ShortNewComponent,
    MyGroupComponent,
    MyImageComponent,
    MessengerComponent,
    MessengerDetailComponent,
    MyShortNewComponent,
    GarbageComponent,
    GroupCreateComponent,
    GroupSharedComponent,
    GroupDetailComponent,
    SavedListComponent,
    ShortNewsAllComponent,
    BlackListComponent,
  ],
  exports: [
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatTooltipModule
  ]
})
export class UserModule {
}
