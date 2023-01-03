import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post2} from "../models/post2";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl + "/posts";

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private httpClient: HttpClient) {
  }

  createPost(post2: Post2, idUser: string): Observable<Post2> {
    return this.httpClient.post<Post2>(API_URL + `/createPost?idUser=${idUser}`, post2);
  }

  allPostPublic(idUser: string): Observable<Post2[]> {
    return this.httpClient.get<Post2[]>(API_URL + `/allPostPublic?idUser=${idUser}`)
  }

  updateLikePost(idPost: any): Observable<any> {
    return this.httpClient.delete<any>(API_URL + `/updateLikePost?idPost=${idPost}`)
  }

  updateDisLikePost(idPost: any): Observable<any> {
    return this.httpClient.delete<any>(API_URL + `/updateDisLikePost?idPost=${idPost}`)
  }

  updateHeartPost(idPost: any): Observable<any> {
    return this.httpClient.delete<any>(API_URL + `/updateHeartPost?idPost=${idPost}`)
  }
}
