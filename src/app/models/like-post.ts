import {User} from "./user";
import {Post2} from "./post2";

export interface LikePost {
  id?: string
  createAt?: string
  userLike?: User
  post?: Post2
}
