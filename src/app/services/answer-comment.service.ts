import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AnswerComment} from "../models/answer-comment";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl + "/AnswerComments";

@Injectable({
  providedIn: 'root'
})
export class AnswerCommentService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<AnswerComment[]> {
    return this.httpClient.get<AnswerComment[]>(API_URL + '/allAnswerComment');
  }

  save(answerComment: AnswerComment, idUser: any, idComment: any): Observable<AnswerComment> {
    return this.httpClient.post<AnswerComment>(API_URL + `/createAnswerComment?idUser=${idUser}&idComment=${idComment}`, answerComment)
  }
}
