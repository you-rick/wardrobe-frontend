import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ImageCropperModule} from "ngx-image-cropper";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ItemsRouting} from "./items.routing";

import {ItemsComponent} from "./items.component";
import {AddItemComponent} from "./add-item/add-item.component";
import { ItemsListComponent } from './items-list/items-list.component';
import {ToastComponent} from "../../shared/components/toast/toast.component";

import {EnumToArrayPipe} from "../../../shared/pipes/enum-to-array.pipe";
import { ItemInfoComponent } from './item-info/item-info.component';
import { LaundryComponent } from './laundry/laundry.component';

@NgModule({
  declarations: [ItemsComponent, AddItemComponent, ItemsListComponent, ToastComponent, EnumToArrayPipe, ItemInfoComponent, LaundryComponent],
  imports: [
    CommonModule,
    ItemsRouting,
    FormsModule,
    ImageCropperModule,
    NgbModule
  ],
  exports: [EnumToArrayPipe]
})
export class ItemsModule { }
