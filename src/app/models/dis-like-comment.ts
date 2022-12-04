import {User} from "./user";
import {Comment} from "./comment";

export interface DisLikeComment {
  id?: string
  createAt?: string
  userLike?: User
  comment?: Comment
}
