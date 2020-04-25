import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {Outfit} from "../models/outfit.model";

@Injectable({
  providedIn: 'root'
})
export class OutfitService {
  readonly baseURL = environment.API_URL + 'outfits';

  constructor(private http: HttpClient) {
  }

  getOutfitList() {
    return this.http.get(this.baseURL);
  }

  getOutfitInfo(_id: string) {
    return this.http.get(this.baseURL + `/${_id}`);
  }

  postOutfit(obj: Outfit) {
    return this.http.post(this.baseURL, obj);
  }

  putOutfit(obj) {
    return this.http.put(this.baseURL + `/${obj._id}`, obj);
  }

  deleteOutfit(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
