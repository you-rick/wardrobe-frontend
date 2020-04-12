import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';

import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  readonly baseURL = environment.API_URL + 'items';

  constructor(private http: HttpClient) { }

  getItemList() {
    return this.http.get(this.baseURL);
  }
  postItem(item) {
    return this.http.post(this.baseURL, item);
  }
  putItem(item) {
    return this.http.put(this.baseURL + `/${item._id}`, item);
  }
  deleteItem(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}

