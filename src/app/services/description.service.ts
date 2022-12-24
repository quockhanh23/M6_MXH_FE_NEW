import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {UserDescription} from "../models/user-description";

const API_URL = environment.apiUrl + "/descriptions";

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {

  constructor(private httpClient: HttpClient) {
  }

  getDescriptionByIdUser(idUser: any): Observable<UserDescription> {
    return this.httpClient.get<UserDescription>(API_URL + `/getDescriptionByIdUser?idUser=${idUser}`);
  }

  createDescription(idUser: any, userDescription: UserDescription): Observable<UserDescription> {
    return this.httpClient.post<UserDescription>(API_URL + `/createDescription?idUser=${idUser}`, userDescription);
  }

  editDescription(idUserDescription: any, userDescription: UserDescription): Observable<UserDescription> {
    return this.httpClient.put<UserDescription>(API_URL + `/editDescription?idUserDescription=${idUserDescription}`, userDescription);
  }
}
