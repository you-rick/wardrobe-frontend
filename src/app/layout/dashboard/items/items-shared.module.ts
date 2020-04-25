import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {ImageCropperModule} from "ngx-image-cropper";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {AddItemComponent} from "./add-item/add-item.component";


@NgModule({
  declarations: [AddItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ImageCropperModule,
    NgbModule
  ],
  exports: [AddItemComponent],
  entryComponents: [AddItemComponent]
})
export class ItemsSharedModule { }
