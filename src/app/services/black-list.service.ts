import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserBlackListDTO} from "../models/user-black-list-dto";

const API_URL = environment.apiUrl + "/blackLists";

@Injectable({
  providedIn: 'root'
})
export class BlackListService {

  constructor(private httpClient: HttpClient) {
  }

  listBlockedByUser(idUserLogin: any): Observable<UserBlackListDTO[]> {
    return this.httpClient.get<UserBlackListDTO[]>(API_URL + `/listBlockedByUser?idUserLogin=${idUserLogin}`);
  }

  block(idUserLogin: any, idUserBlock: any): Observable<any> {
    return this.httpClient.delete<any>(API_URL + `/block?idUserLogin=${idUserLogin}&idUserBlock=${idUserBlock}`);
  }

  unBlock(idUserLogin: any, idUserBlock: any): Observable<any> {
    return this.httpClient.delete<any>(API_URL + `/unBlock?idUserLogin=${idUserLogin}&idUserBlock=${idUserBlock}`);
  }
}
