import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutRouting} from "./layout.routing";
import {LayoutComponent} from "./layout.component";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {HomeComponent} from './home/home.component';
import { TopBarComponent } from '../shared/components/top-bar/top-bar.component';
import {SharedModule} from "../shared/shared.module";
import { EmailConfirmationComponent } from './auth/email-confirmation/email-confirmation.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    TopBarComponent,
    EmailConfirmationComponent
  ],
  imports: [
    CommonModule,
    LayoutRouting,
    FormsModule,
    SharedModule,
    NgbModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule {
}
