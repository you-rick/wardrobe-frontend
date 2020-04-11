import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private userService: UserService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.userService.isLoggedIn()) {
            this.router.navigateByUrl('/sign-in');
            // Удаляем токен, время которого вышло
            this.userService.deleteToken();
            return false;
        }
        return true;
    }

    canActivateChild(): any {
    }
}
