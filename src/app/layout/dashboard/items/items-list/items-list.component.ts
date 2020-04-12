import {Component, OnInit} from '@angular/core';

import {ItemService} from "../../../../shared/services/item.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  public itemsList;
  public envPath = environment.API_URL;

  constructor(private itemSerivce: ItemService) {
  }

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.itemSerivce.getItemList().subscribe(
      res => {
        this.itemsList = res;
      },
      err => {
      }
    );
  }

}
