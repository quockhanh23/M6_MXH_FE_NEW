import {User} from "./user";

export interface UserDescription {
  id?: string
  user?: User
  description?: string
  status?: string
  createAt?: string
  editAt?: string
}
