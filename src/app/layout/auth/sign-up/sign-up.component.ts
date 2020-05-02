import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

import {ToastService} from "../../../shared/services/toast.service";
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/models/user.model";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../auth.component.scss']
})
export class SignUpComponent implements OnInit {

  public newUser = new User();
  public signUpSuccess: boolean = false;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.postUser(form.value).subscribe(
        (response) => {
          console.log(response);
          this.signUpSuccess = true;
          //M.toast({html: 'Yey! User was created!', classes: 'rounded'});
          console.log('Yey! User was created!');
          this.resetForm(form);
        },
        (err) => {
          let errMsg;
          if (Array.isArray(err.error)) {
            errMsg = err.error.map(item => item + '<br/>').join('');
          } else {
            errMsg = err.error;
          }
          this.toastService.show(errMsg, {classname: 'bg-danger text-light'});
        }
      );
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.newUser = new User();
  }


}
