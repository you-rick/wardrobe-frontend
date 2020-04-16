import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {ItemService} from "../../../../shared/services/item.service";
import {Item} from "../../../../shared/models/item.model";
import {environment} from "../../../../../environments/environment";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {
  public selectedItem:Item;
  public envPath = environment.API_URL;

  constructor(private itemService: ItemService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.fetchItemInfo();
  }

  fetchItemInfo() {
    this.route.params.pipe(
      switchMap(params => this.itemService.getItemInfo(params.id))
    ).subscribe((result:Item) => {
      this.selectedItem = result;
    });
  }

}
