import {User} from "./user";
import {UserDTO} from "./user-dto";

export interface ShortNews {
  id?: string
  content?: string
  createAt?: string
  expired?: string
  remaining?: string
  toDay?: string
  image?: string
  user?: User
  userDTO?: UserDTO
  status?: string
}
