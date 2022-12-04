import {User} from "./user";
import {Post2} from "./post2";

export interface Comment {
  id?: string
  content?: string
  createAt?: string
  editAt?: string
  user?: User
  post?: Post2
  image?: string
  numberLike?: string;
  numberDisLike?: string;
}
