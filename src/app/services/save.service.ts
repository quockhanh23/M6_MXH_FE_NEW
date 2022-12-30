import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Saved} from "../models/saved";

const API_URL = environment.apiUrl + "/saves";

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor(private httpClient: HttpClient) {
  }

  listSavedPost(idUser: any): Observable<Saved[]> {
    return this.httpClient.get<Saved[]>(API_URL + `/listSavedPost?idUser=${idUser}`)
  }

  savePost(idPost: any, idUser: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/savePost?idPost=${idPost}&idUser=${idUser}`);
  }

  removeSavePost(idPost: any, idSaved: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/removeSavePost?idPost=${idPost}&idSaved=${idSaved}`);
  }
}
