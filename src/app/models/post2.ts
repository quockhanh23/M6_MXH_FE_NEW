import {User} from "./user";

export interface Post2 {
  id?: string
  content?: string
  status?: string
  userDTO?: User
  createAt?: string
  numberLike?: string;
  numberDisLike?: string;
  comment?: Comment
  image?: string
  iconHeart?: string
  countAllComment?: string
}
