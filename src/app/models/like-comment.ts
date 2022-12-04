import {User} from "./user";
import {Comment} from "./comment";

export interface LikeComment {
  id?: string
  createAt?: string
  userLike?: User
  comment?: Comment
}
