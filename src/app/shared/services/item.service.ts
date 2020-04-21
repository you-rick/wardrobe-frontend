import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {Item} from "../models/item.model";


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  readonly baseURL = environment.API_URL + 'items';

  constructor(private http: HttpClient) { }


  getItemList(ids?: any) {
   let headers = new HttpHeaders();
   let params = new HttpParams().set("ids", ids || "");
   return this.http.get(this.baseURL, {headers: headers, params: params});
  }
  getLaundryList() {
     return this.http.get(this.baseURL + '/laundry');
  }
  getItemInfo(_id: string) {
    console.log("getItemInfo method");
    return this.http.get(this.baseURL + `/${_id}`);
  }
  postItem(item) {
    console.log("Method");
    return this.http.post(this.baseURL, item);
  }
  putItem(item) {
    console.log("url", this.baseURL + `/${item._id}`);
    return this.http.put(this.baseURL + `/${item._id}`, item);
  }
  deleteItem(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}

