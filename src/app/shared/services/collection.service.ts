import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {Collection} from "../models/collection.model";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  readonly baseURL = environment.API_URL + 'collections';

  constructor(private http: HttpClient) {
  }

  getCollectionList() {
    return this.http.get(this.baseURL);
  }

  getCollectionInfo(_id: string) {
    return this.http.get(this.baseURL + `/${_id}`);
  }

  postCollection(obj: Collection) {
    return this.http.post(this.baseURL, obj);
  }

  putCollection(obj) {
    console.log("url", this.baseURL + `/${obj._id}`);
    return this.http.put(this.baseURL + `/${obj._id}`, obj);
  }

  deleteItem(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
