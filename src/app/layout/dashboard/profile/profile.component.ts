import {Component, OnInit} from '@angular/core';

import {UserService} from "../../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public userInfo;

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.userService.getUserProfile().subscribe(
            res => {
                this.userInfo = res['user'];
            },
            err => {
            }
        );
    }

    onLogout() {
        this.userService.deleteToken();
        this.router.navigateByUrl('/sign-in');
    }

}
