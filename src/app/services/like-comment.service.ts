import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LikeComment} from "../models/like-comment";
import {DisLikeComment} from "../models/dis-like-comment";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl + "/refs";

@Injectable({
  providedIn: 'root'
})
export class LikeCommentService {

  constructor(private httpClient: HttpClient) {
  }

  createLikeComment(likeComment: LikeComment, idComment: string, idUser: string): Observable<LikeComment> {
    return this.httpClient.post<LikeComment>(API_URL + `/createLikeComment?idComment=${idComment}&idUser=${idUser}`, likeComment);
  }

  createDisLikeComment(disLikeComment: DisLikeComment, idComment: string, idUser: string): Observable<DisLikeComment> {
    return this.httpClient.post<DisLikeComment>(API_URL + `/createDisLikeComment?idComment=${idComment}&idUser=${idUser}`, disLikeComment);
  }
}
