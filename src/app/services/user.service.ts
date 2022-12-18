import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../models/user";
import {ListAvatarDTO} from "../models/list-avatar-dto";
import {UserBlackListDTO} from "../models/user-black-list-dto";
import {UserDTO} from "../models/user-dto";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  historyLoginLocal(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/historyLogin');
  }

  searchByFullNameOrEmail(search: string): Observable<UserBlackListDTO[]> {
    return this.http.get<UserBlackListDTO[]>(API_URL + `/searchByFullNameOrEmail?search=${search}`);
  }

  searchFriend(search: string, idUser: any): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(API_URL + `/searchFriend?search=${search}&idUser=${idUser}`);
  }

  allUser(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/allUser')
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/register', user);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(API_URL + 'users/login', user);
  }

  matchPassword(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/matchPassword', user);
  }

  userDetail(id: any): Observable<User> {
    return this.http.get<User>(API_URL + `/users/${id}`);
  }

  getUserProfile(id: any): Observable<User> {
    return this.http.get<User>(API_URL + `/users/${id}`);
  }

  findById(id: any): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/api/findById/${id}`);
  }

  updateUserProfile(id: any, user: User): Observable<User> {
    return this.http.put<User>(API_URL + `/users/${id}`, user);
  }

  listImageDefault(): Observable<ListAvatarDTO[]> {
    return this.http.get<ListAvatarDTO[]>(API_URL + '/listImageDefault')
  }

  changeImage(idUser: any, idImage: any, type: any): Observable<any> {
    return this.http.delete<any>(API_URL + `/changeImage?idUser=${idUser}&idImage=${idImage}&type=${type}`)
  }
}
