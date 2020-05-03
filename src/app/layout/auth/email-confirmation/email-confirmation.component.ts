import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {Router} from "@angular/router";
import {ToastService} from "../../../shared/services/toast.service";
import {User} from "../../../shared/models/user.model";

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss', '../auth.component.scss']
})
export class EmailConfirmationComponent implements OnInit {

  public email: string;
  public error: string;
  public verified: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    console.log(this.route.snapshot.params.token);
    this.verifyUserToken();
  }

  verifyUserToken() {
    let token = this.route.snapshot.params.token;
    if (token) {
      this.userService.confirmEmail(token).subscribe((user:User) => {
        console.log(user);
        this.verified = user.isVerified;
        this.email = user.email;
      }, err => {
        this.error = err.error.message;
      });
    } else {
      this.router.navigateByUrl('/sign-in');
    }

  }

}
