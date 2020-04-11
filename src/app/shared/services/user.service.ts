import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

import {User} from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly baseURL = environment.API_URL + 'api';

    constructor(private http: HttpClient) {
    }

    // Так как токен будет в запросе только в одном методе - getUserProfile - там надо убедиться,
    // что в headers не будет упоминания проверки на auth
    noAuthHeader = {headers: new HttpHeaders({'NoAuth': 'True'})};

    // HTTP
    postUser(usr: User) {
        return this.http.post(this.baseURL + '/register', usr, this.noAuthHeader);
    }

    login(authCreds) {
        return this.http.post(this.baseURL + '/authenticate', authCreds, this.noAuthHeader);
    }

    getUserProfile() {
        return this.http.get(this.baseURL + '/user-profile');
    }


    // HELPERS

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    deleteToken() {
        localStorage.removeItem('token');
    }

    // Это метод для обработки токена и получения нужной инфы, как, к примеру присланный _id юзера
    getUserPayload() {
        let token = this.getToken();
        if (token) {
            // atob - decode encoded data. Right now - our token
            let userPayload = atob(token.split(".")[1]);
            return JSON.parse(userPayload);
        } else {
            return null;
        }
    }

    isLoggedIn() {
        let userPayload = this.getUserPayload();
        if (userPayload) {
            return userPayload.exp > Date.now() / 1000;
        }
    }
}
