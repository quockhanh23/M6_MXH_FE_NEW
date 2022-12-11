import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notification} from "../models/notification";

const API_URL = environment.apiUrl + "/notifications";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) {
  }

  getAllNotificationByIdSenTo(idSenTo: string): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(API_URL + `/getAllNotificationByIdSenTo?idSenTo=${idSenTo}`);
  }

  findAllByIdSendToNotSeen(idSenTo: string): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/findAllByIdSendToNotSeen?idSenTo=${idSenTo}`);
  }

  seenAll(idSenTo: string): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/seenAll?idSenTo=${idSenTo}`);
  }

}
