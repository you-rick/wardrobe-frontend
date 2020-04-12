import {Component, OnInit} from '@angular/core';

import {UserService} from "../../../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.userService.deleteToken();
    this.router.navigateByUrl('/sign-in');
  }

}
