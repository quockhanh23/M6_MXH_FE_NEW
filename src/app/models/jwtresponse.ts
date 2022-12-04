import {Role} from "./role";

export interface JWTResponse {
  id: number;
  token: string;
  type?: string;
  username: string;
  roles: Role[];
}
