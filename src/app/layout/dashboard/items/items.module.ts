import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {ItemsSharedModule} from "./items-shared.module";
import {ImageCropperModule} from "ngx-image-cropper";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ItemsRouting} from "./items.routing";

import {ItemsComponent} from "./items.component";
import { ItemsListComponent } from './items-list/items-list.component';

import { ItemInfoComponent } from './item-info/item-info.component';
import { LaundryComponent } from './laundry/laundry.component';

@NgModule({
  declarations: [ItemsComponent, ItemsListComponent, ItemInfoComponent, LaundryComponent],
  imports: [
    CommonModule,
    ItemsRouting,
    FormsModule,
    ItemsSharedModule,
    SharedModule,
    ImageCropperModule,
    NgbModule
  ]
})
export class ItemsModule { }
