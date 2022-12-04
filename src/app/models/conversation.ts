import {User} from "./user";

export interface Conversation {
  id?: string,
  createAt?: string
  statusConversation?: string
  idSenderDelete?: string
  idReceiverDelete?: string
  idSender?: User
  idReceiver?: User
}
