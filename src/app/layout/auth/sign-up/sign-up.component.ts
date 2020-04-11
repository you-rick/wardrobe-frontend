import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/models/user.model";


declare var M: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public newUser = new User();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.postUser(form.value).subscribe(
          (response) => {
            console.log(response);
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
            //M.toast({html: errMsg, classes: 'rounded red'});
            console.log(errMsg);
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
