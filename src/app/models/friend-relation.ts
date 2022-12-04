import {User} from "./user";

export interface FriendRelation {
  id?: string;
  idUser?: string;
  idFriend?: string;
  statusFriend?: string;
  friend?: User
  userLogin?: User
}
