import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRouting} from "./dashboard.routing";
import {DashboardComponent} from "./dashboard.component";
import { ItemsComponent } from './items/items.component';

@NgModule({
  declarations: [DashboardComponent, ItemsComponent],
  imports: [
    CommonModule,
    DashboardRouting
  ]
})
export class DashboardModule { }
