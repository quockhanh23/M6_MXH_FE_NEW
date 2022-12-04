import {GroupParticipant} from "./group-participant";

export interface GroupPost {
  id?: string
  groupParticipant?: GroupParticipant
  content?: string
  status?: string
  createBy?: string
  editBy?: string
  createAt?: string
  editAt?: string
  deleteAt?: string
  idUserCreate?: string
}
