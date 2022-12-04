import {Conversation} from "./conversation";
import {User} from "./user";

export interface Messenger {
  id?: string
  linkImage?: string
  content?: string
  statusMessenger?: string
  image?: string
  createAt?: string
  format?: string
  idSender?: User
  conversation: Conversation
}
