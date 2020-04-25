import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRouting} from "./dashboard.routing";
import {DashboardComponent} from "./dashboard.component";
import {ProfileComponent} from "./profile/profile.component";
import { LeftNavComponent } from './shared/left-nav/left-nav.component';
import {ItemsSharedModule} from "./items/items-shared.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [DashboardComponent, ProfileComponent, LeftNavComponent],
  imports: [
    CommonModule,
    DashboardRouting,
    ItemsSharedModule,
    SharedModule
  ]
})
export class DashboardModule { }
