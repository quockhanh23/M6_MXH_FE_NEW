import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Image} from "../models/image";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl + "/images";

@Injectable({
  providedIn: 'root'
})

export class ImageService {

  constructor(private httpClient: HttpClient) {
  }

  allImageOfUser(idUser: any): Observable<Image[]> {
    return this.httpClient.get<Image[]>(API_URL + `/findAllImages?idUser=${idUser}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      }
    })
  }

  delete(idImage: any, idUser: any): Observable<Image> {
    return this.httpClient.delete<Image>(API_URL + `/delete?idImage=${idImage}&idUser=${idUser}`);
  }

  deleteInDataBase(idImage: any, idUser: any): Observable<Image> {
    return this.httpClient.delete<Image>(API_URL + `/deleteImage?idImage=${idImage}&idUser=${idUser}`);
  }

  getAllImageDeleted(idUser: any): Observable<Image[]> {
    return this.httpClient.get<Image[]>(API_URL + `/getAllImageDeleted?idUser=${idUser}`);
  }
}
