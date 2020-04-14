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

@NgModule({
  declarations: [ItemsComponent, AddItemComponent, ItemsListComponent, ToastComponent],
  imports: [
    CommonModule,
    ItemsRouting,
    FormsModule,
    ImageCropperModule,
    NgbModule
  ]
})
export class ItemsModule { }
