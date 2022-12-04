import {Comment} from "./comment";
import {User} from "./user";

export interface AnswerComment {
  id?: string
  content?: string
  createAt?: string
  editAt?: string
  image?: string
  comment?: Comment
  user?: User
}
