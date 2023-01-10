import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {environment} from "../../environments/environment.prod";

const API_URL = environment.apiUrl + "/admins";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) {
  }

  getAllUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(API_URL + '/getAllUser', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      }
    });
  }

  findById(idUser: any): Observable<User> {
    return this.httpClient.get<User>(API_URL + `/findById?idUser=${idUser}`)
  }
}
