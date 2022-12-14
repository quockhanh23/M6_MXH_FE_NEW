import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from "../models/user-token";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {JWTResponse} from "../models/jwtresponse";
import {environment} from "../../environments/environment.prod";

const API_URL = environment.apiUrl + "/login";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserToken {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<JWTResponse> {
    return this.http.post<JWTResponse>(API_URL, user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }
}
