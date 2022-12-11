import {User} from "./user";

export interface Notification {
  id: string,
  title: string,
  status: string,
  idSendTo: User,
  idAction: User,
  typeId: string,
  type: string,
  createAt: string,
}
