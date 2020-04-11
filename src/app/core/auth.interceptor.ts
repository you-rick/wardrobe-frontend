import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import { environment } from '../../environments/environment';

import {UserService } from "../shared/services/user.service";
import {tap} from "rxjs/operators";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    // Если это запрос, который не требует токена, то проверяем по noauth
    if (req.headers.get('noauth')) {
      // Когда передаешь дальше запрос в next - всегда надо делать сlone
      return next.handle(req.clone());
    } else {
      const clonereq = req.clone({
        headers: req.headers.set("Authorization", "Bearer "+ this.userService.getToken())
      });
      // Для фильтрации ошибок в Observable, вызываем Pipe (фильтр) потом Tap
      return next.handle(clonereq).pipe(
          tap(
              event => {},
              err => {
                // этот error.auth - мы прописали в Nodejs и присылаем его как проверку на ошибку
                //  в config/jwtHelper.js
                 if (err.error.auth == false) {
                  this.router.navigateByUrl('/sign-in');
                 }
              }
          )
      );
    }
  }
}

