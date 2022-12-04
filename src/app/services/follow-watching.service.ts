import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDTO} from "../models/user-dto";

const API_URL = environment.apiUrl + "/follows";

@Injectable({
  providedIn: 'root'
})
export class FollowWatchingService {

  constructor(private httpClient: HttpClient) {
  }

  getListFollowByIdUser(idUser: any): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(API_URL + `/getListFollowByIdUser?idUser=${idUser}`);
  }

  getListWatchingByIdUser(idUser: any): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(API_URL + `/getListWatchingByIdUser?idUser=${idUser}`);
  }

  createFollow(idUserLogin: any, idUserFollow: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/follow?idUserLogin=${idUserLogin}&idUserFollow=${idUserFollow}`);
  }

  unFollow(idUserLogin: any, idUserFollow: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/unFollow?idUserLogin=${idUserLogin}&idUserFollow=${idUserFollow}`);
  }

  getOne(idUserLogin: any, idUserFollow: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/getOne?idUserLogin=${idUserLogin}&idUserFollow=${idUserFollow}`);
  }
}
