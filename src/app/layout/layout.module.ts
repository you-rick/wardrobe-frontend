import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutRouting} from "./layout.routing";
import {LayoutComponent} from "./layout.component";

import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";

@NgModule({
  declarations: [
    LayoutComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    LayoutRouting
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
