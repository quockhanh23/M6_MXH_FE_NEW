import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Messenger} from "../models/messenger";
import {environment} from "../../environments/environment";
import {Conversation} from "../models/conversation";

const API_URL = environment.apiUrl + "/conversations";

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(private httpClient: HttpClient) {
  }

  myMessenger(idUser: string): Observable<Conversation[]> {
    return this.httpClient.get<Conversation[]>(API_URL + `/myMessenger?idUser=${idUser}`);
  }

  messenger(idUser: string, idConversation: string): Observable<Messenger[]> {
    return this.httpClient.get<Messenger[]>(API_URL + `/messenger?idUser=${idUser}&idConversation=${idConversation}`);
  }

  createConversation(idSender: string, idReceiver: string): Observable<Conversation> {
    return this.httpClient.get<Conversation>(API_URL + `/createConversation?idSender=${idSender}&idReceiver=${idReceiver}`);
  }

  createMessenger(idConversation: string, idUser: string, mes: Messenger): Observable<Messenger> {
    return this.httpClient.post<Messenger>(API_URL + `/createMessengers?idConversation=${idConversation}&idUser=${idUser}`, mes);
  }

  deleteOneSide(idUser: string, idConversation: string): Observable<any> {
    return this.httpClient.delete<any>(API_URL + `/deleteOneSide?idUser=${idUser}&idConversation=${idConversation}`);
  }

  findById(idConversation: string): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/findById?idConversation=${idConversation}`);
  }

  findAllByConversationOrderById(idConversation: string): Observable<Messenger[]> {
    return this.httpClient.get<Messenger[]>(API_URL + `/findAllByConversationOrderById?idConversation=${idConversation}`);
  }

  getAllMessageHavePhoto(idConversation: string): Observable<Messenger[]> {
    return this.httpClient.get<Messenger[]>(API_URL + `/getAllMessageHavePhoto?idConversation=${idConversation}`);
  }

  getAllMessageHaveLink(idConversation: string): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/getAllMessageHaveLink?idConversation=${idConversation}`);
  }

  listConversationNotFriend(idUser: string): Observable<Conversation[]> {
    return this.httpClient.get<Conversation[]>(API_URL + `/listConversationNotFriend?idUser=${idUser}`);
  }

  messageNotFriend(idConversation: string): Observable<Messenger[]> {
    return this.httpClient.get<Messenger[]>(API_URL + `/messageNotFriend?idConversation=${idConversation}`);
  }

  lastMessageIdSender(idConversation: string): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/lastMessageIdSender?idConversation=${idConversation}`);
  }

  lastTimeMessage(idConversation: string): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/lastMessage?idConversation=${idConversation}`);
  }
}
