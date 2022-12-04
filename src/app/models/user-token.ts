import {Role} from "./role";

export interface UserToken {
  id?: string,
  username?: string,
  password?: string,
  confirmPassword?: string,
  enabled?: boolean,
  role?: Role[],
  fullName?: string,
  email?: string,
  phoneNumber?: string,
  dateOfBirth?: string,
  accessToken?: string;
  avatar?: string;
  favorite?: string;
  cover?: string;
  address?: string;
}
