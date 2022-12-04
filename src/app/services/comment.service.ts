import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AnswerComment} from "../models/answer-comment";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl + "/comments";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  reloadComment(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(API_URL + '/reloadComment');
  }

  reloadLikeAllComment(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(API_URL + '/reloadLikeAllComment');
  }

  reloadDisLikeAllComment(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(API_URL + '/reloadDisLikeAllComment');
  }

  getAll(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(API_URL + '/all');
  }

  deleteComment(idUser: any, idComment: any, idPost: any): Observable<AnswerComment> {
    return this.httpClient.delete<AnswerComment>(API_URL + `/deleteComment?idUser=${idUser}&idComment=${idComment}&idPost=${idPost}`);
  }

  createComment(comment: Comment, idUser: any, idPost: any): Observable<Comment> {
    return this.httpClient.post<Comment>(API_URL + `/createComment?idUser=${idUser}&idPost=${idPost}`, comment)
  }
}
