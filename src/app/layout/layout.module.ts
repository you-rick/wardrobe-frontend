import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutRouting} from "./layout.routing";
import {LayoutComponent} from "./layout.component";

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRouting
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
