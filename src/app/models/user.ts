import {Role} from "./role";

export interface User {
  id?: string,
  username?: string,
  password?: string,
  confirmPassword?: string,
  enabled?: boolean,
  role?: [Role],
  fullName?: string,
  email?: string,
  phone?: string,
  dateOfBirth?: string,
  accessToken?: string;
  avatar?: string;
  favorite?: string;
  cover?: string;
  address?: string;
  status?: string
  education?: string
  createAt?: string
  gender?: string
}
