import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShortNews} from "../models/short-news";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl + "/news";

@Injectable({
  providedIn: 'root'
})
export class ShortNewService {

  constructor(private httpClient: HttpClient) {
  }

  newDay(): Observable<ShortNews[]> {
    return this.httpClient.get<ShortNews[]>(API_URL + '/newDay')
  }

  allShortNews(): Observable<ShortNews[]> {
    return this.httpClient.get<ShortNews[]>(API_URL + '/allShortNews')
  }

  allShortNewPublic(): Observable<ShortNews[]> {
    return this.httpClient.get<ShortNews[]>(API_URL + '/allShortNewPublic')
  }

  shortNewsLimit(): Observable<ShortNews[]> {
    return this.httpClient.get<ShortNews[]>(API_URL + '/shortNewsLimit')
  }

  createShortNew(shortNews: ShortNews, idUser: any): Observable<ShortNews> {
    return this.httpClient.post<ShortNews>(API_URL + `/createShortNews?idUser=${idUser}`, shortNews);
  }

  myShortNews(idUser: any): Observable<ShortNews[]> {
    return this.httpClient.get<ShortNews[]>(API_URL + `/myShortNews?idUser=${idUser}`);
  }

  deleteShortNew(idSortNew: any, idUser: any): Observable<ShortNews> {
    return this.httpClient.delete<ShortNews>(API_URL + `/deleteShortNews?idSortNew=${idSortNew}&idUser=${idUser}`);
  }

  deleteShortNewInDataBase(idSortNew: any, idUser: any): Observable<ShortNews> {
    return this.httpClient.delete<ShortNews>(API_URL + `/deleteShortNews2?idSortNew=${idSortNew}&idUser=${idUser}`);
  }
}
