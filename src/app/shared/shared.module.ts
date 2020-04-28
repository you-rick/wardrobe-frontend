import { NgModule } from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from '@angular/common';

import {ToastComponent} from "./components/toast/toast.component";
import {EnumToArrayPipe} from "./pipes/enum-to-array.pipe";
import { MultiDatePickerComponent } from './components/multi-date-picker/multi-date-picker.component';

@NgModule({
  declarations: [ToastComponent, EnumToArrayPipe, MultiDatePickerComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [ToastComponent, EnumToArrayPipe, MultiDatePickerComponent]
})
export class SharedModule { }
