import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ItemsRouting} from "./items.routing";

import {ItemsComponent} from "./items.component";
import {AddItemComponent} from "./add-item/add-item.component";
import { ItemsListComponent } from './items-list/items-list.component';

@NgModule({
  declarations: [ItemsComponent, AddItemComponent, ItemsListComponent],
  imports: [
    CommonModule,
    ItemsRouting,
    FormsModule
  ]
})
export class ItemsModule { }
