import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TheGroup} from "../models/the-group";
import {environment} from "../../environments/environment";
import {GroupPost} from "../models/group-post";
import {GroupParticipant} from "../models/group-participant";

const API_URL = environment.apiUrl + "/groups";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) {
  }

  findAllGroup(idUserCreate: any): Observable<TheGroup[]> {
    return this.httpClient.get<TheGroup[]>(API_URL + `/findAllGroup?idUserCreate=${idUserCreate}`)
  }

  createGroup(theGroup: TheGroup, idUser: string): Observable<TheGroup> {
    return this.httpClient.post<TheGroup>(API_URL + `/createGroup?idUser=${idUser}`, theGroup);
  }

  createGroupParticipant(idUser: any, idTheGroup: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/createGroupParticipant?idUser=${idUser}&idTheGroup=${idTheGroup}`);
  }

  acceptUserJoinGroup(idAdminGroup: any, idUser: any, idGroup: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/acceptUserJoinGroup?idAdminGroup=${idAdminGroup}&idUser=${idUser}&idGroup=${idGroup}`);
  }

  rejectUserJoinGroup(idAdminGroup: any, idUser: any, idGroup: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/rejectUserJoinGroup?idAdminGroup=${idAdminGroup}&idUser=${idUser}&idGroup=${idGroup}`);
  }

  lockGroup(idGroup: any, idUser: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/lockGroup?idGroup=${idGroup}&idUser=${idUser}`);
  }

  acceptUserUpPost(idAdminGroup: any, idGroupPost: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/acceptUserUpPost?idAdminGroup=${idAdminGroup}&idGroupPost=${idGroupPost}`);
  }

  rejectUserUpPost(idAdminGroup: any, idGroupPost: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/rejectUserUpPost?idAdminGroup=${idAdminGroup}&idGroupPost=${idGroupPost}`);
  }

  createGroupPost(idUser: any, idTheGroupPost: any, groupPost: GroupPost): Observable<GroupPost> {
    return this.httpClient.post<GroupPost>(API_URL + `/createGroupPost?idUser=${idUser}`, groupPost);
  }

  findById(idGroup: any): Observable<TheGroup> {
    return this.httpClient.get<TheGroup>(`http://localhost:8080/api/groups/${idGroup}`);
  }

  findAllUserStatusPendingApproval(idTheGroup: any): Observable<GroupParticipant[]> {
    return this.httpClient.get<GroupParticipant[]>(API_URL + `/findAllUserStatusPendingApproval?idTheGroup=${idTheGroup}`);
  }

  findAllUserStatusApproved(idTheGroup: any): Observable<GroupParticipant[]> {
    return this.httpClient.get<GroupParticipant[]>(API_URL + `/findAllUserStatusApproved?idTheGroup=${idTheGroup}`);
  }

  findGroupByIdUserCreate(idUserCreate: any): Observable<TheGroup[]> {
    return this.httpClient.get<TheGroup[]>(API_URL + `/findGroupByIdUserCreate?idUserCreate=${idUserCreate}`);
  }

  groupJoined(idUser: any): Observable<TheGroup[]> {
    return this.httpClient.get<TheGroup[]>(API_URL + `/groupJoined?idUser=${idUser}`);
  }

  searchAllByGroupNameAndType(search: string, idUser: any): Observable<TheGroup[]> {
    return this.httpClient.get<TheGroup[]>(API_URL + `/searchAllByGroupNameAndType?search=${search}&idUser=${idUser}`);
  }
}
