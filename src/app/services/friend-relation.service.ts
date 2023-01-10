import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FriendRelation} from "../models/friend-relation";
import {environment} from "../../environments/environment.prod";

const API_URL = environment.apiUrl + "/friends";

@Injectable({
  providedIn: 'root'
})
export class FriendRelationService {

  constructor(private httpClient: HttpClient) {
  }

  sendRequestFriend(idUser: any, idFriend: any): Observable<FriendRelation> {
    return this.httpClient.delete<FriendRelation>(API_URL + `/sendRequestFriend?idUser=${idUser}&idFriend=${idFriend}`);
  }

  listRequestSend(idUser: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/findAllListRequestAddFriendById?idUser=${idUser}`);
  }

  allPeople(idUser: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/allPeople?idUser=${idUser}`);
  }

  listRequest(idUser: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/listRequest?idUser=${idUser}`);
  }

  listFriend(idUser: any): Observable<FriendRelation[]> {
    return this.httpClient.get<FriendRelation[]>(API_URL + `/listFriend?idUser=${idUser}`);
  }

  listFriendShowAvatarLimit(idUser: any): Observable<FriendRelation[]> {
    return this.httpClient.get<FriendRelation[]>(API_URL + `/listFriendShowAvatarLimit?idUser=${idUser}`);
  }

  friendCheck(idUser: any): Observable<FriendRelation[]> {
    return this.httpClient.get<FriendRelation[]>(API_URL + `/friendCheck?idUser=${idUser}`);
  }

  friendSuggestion(idUser: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/friendSuggestion?idUser=${idUser}`);
  }

  acceptFriend(idUser: any, idFriend: any): Observable<FriendRelation> {
    return this.httpClient.delete<FriendRelation>(API_URL + `/acceptRequestFriend?idUser=${idUser}&idFriend=${idFriend}`);
  }

  deleteFriendRelation(idUser: any, idFriend: any): Observable<FriendRelation> {
    return this.httpClient.delete<FriendRelation>(API_URL + `/deleteFriendRelation?idUser=${idUser}&idFriend=${idFriend}`);
  }

  mutualFriends(idUserLogin: any, idUser: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/mutualFriends?idUserLogin=${idUserLogin}&idUser=${idUser}`);
  }

  agree(idFriend: any, idLogin: any): Observable<FriendRelation[]> {
    return this.httpClient.get<FriendRelation[]>(API_URL + `/agree?idFriend=${idFriend}&idLogin=${idLogin}`);
  }

  friend(idFriend: any, idLogin: any): Observable<FriendRelation[]> {
    return this.httpClient.get<FriendRelation[]>(API_URL + `/friend?idFriend=${idFriend}&idLogin=${idLogin}`);
  }
}
