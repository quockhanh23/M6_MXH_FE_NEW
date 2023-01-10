import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DisLikePost} from "../models/dis-like-post";
import {IconHeart} from "../models/icon-heart";
import {environment} from "../../environments/environment.prod";
import {LikePost} from "../models/like-post";

const API_URL = environment.apiUrl + "/refs";

@Injectable({
  providedIn: 'root'
})
export class LikePostService {

  constructor(private httpClient: HttpClient) {
  }

  createLike(likePost: LikePost, idPost: string, idUser: string): Observable<LikePost> {
    return this.httpClient.post<LikePost>(API_URL + `/createLike?idPost=${idPost}&idUser=${idUser}`, likePost);
  }

  createDisLike(likePost: DisLikePost, idPost: string, idUser: string): Observable<DisLikePost> {
    return this.httpClient.post<DisLikePost>(API_URL + `/createDisLike?idPost=${idPost}&idUser=${idUser}`, likePost);
  }

  createHeart(iconHeart: IconHeart, idPost: string, idUser: string): Observable<IconHeart> {
    return this.httpClient.post<IconHeart>(API_URL + `/createHeart?idPost=${idPost}&idUser=${idUser}`, iconHeart);
  }

  getAllLike(idPost: string): Observable<LikePost[]> {
    return this.httpClient.get<LikePost[]>(API_URL + `/getAllLike?idPost=${idPost}`);
  }

  getAllHeart(idPost: string): Observable<IconHeart[]> {
    return this.httpClient.get<IconHeart[]>(API_URL + `/getAllHeart?idPost=${idPost}`);
  }

  getAllDisLike(idPost: string): Observable<DisLikePost[]> {
    return this.httpClient.get<DisLikePost[]>(API_URL + `/getAllDisLike?idPost=${idPost}`);
  }
}
