import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRouting} from "./dashboard.routing";
import {DashboardComponent} from "./dashboard.component";
import {ProfileComponent} from "./profile/profile.component";
import { LeftNavComponent } from './shared/left-nav/left-nav.component';


@NgModule({
  declarations: [DashboardComponent, ProfileComponent, LeftNavComponent],
  imports: [
    CommonModule,
    DashboardRouting
  ]
})
export class DashboardModule { }
