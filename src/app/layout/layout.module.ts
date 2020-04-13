import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutRouting} from "./layout.routing";
import {LayoutComponent} from "./layout.component";
import {FormsModule} from "@angular/forms";

import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {HomeComponent} from './home/home.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    LayoutRouting,
    FormsModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule {
}
