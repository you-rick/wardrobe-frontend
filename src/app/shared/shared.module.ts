import { NgModule } from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from '@angular/common';

import {ToastComponent} from "./components/toast/toast.component";
import {EnumToArrayPipe} from "./pipes/enum-to-array.pipe";

@NgModule({
  declarations: [ToastComponent, EnumToArrayPipe],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [ToastComponent, EnumToArrayPipe]
})
export class SharedModule { }
