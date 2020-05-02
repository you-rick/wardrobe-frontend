import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

import {ToastService} from "../../../shared/services/toast.service";
import {UserService} from "../../../shared/services/user.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', '../auth.component.scss']
})
export class SignInComponent implements OnInit {

  public user = {
    'email': '',
    'password': ''
  }

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
        res => {
          this.userService.setToken(res['token']);
          console.log('Works well!', res['token']);
          this.router.navigateByUrl('/dashboard/outfits');

        },
        err => {
            this.toastService.show(err.error.message, {classname: 'bg-danger text-light'});
          console.log(err.error.message);
        }
    );
  }
}
