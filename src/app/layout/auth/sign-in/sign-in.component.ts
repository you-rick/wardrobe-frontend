import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

import {UserService} from "../../../shared/services/user.service";

declare var M: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public user = {
    'email': '',
    'password': ''
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
        res => {
          this.userService.setToken(res['token']);
          console.log('Works well!', res['token']);
          this.router.navigateByUrl('/dashboard/profile');
          //M.toast({html: 'Hello again!', classes: 'rounded green'});

        },
        err => {
          //M.toast({html: err.error.message, classes: 'rounded red'});
          console.log(err.error.message);
        }
    );
  }
}
