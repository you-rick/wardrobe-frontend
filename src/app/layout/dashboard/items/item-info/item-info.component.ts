import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

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
  public selectedItem: Item;
  public envPath = environment.API_URL;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.fetchItemInfo();
  }

  fetchItemInfo() {
    this.route.params.pipe(
      switchMap(params => this.itemService.getItemInfo(params.id))
    ).subscribe((result: Item) => {
      this.selectedItem = result;
    });
  }

  deleteItem() {
    if (confirm("Are you sure you want to delete this item?")) {
      this.route.params.pipe(
        switchMap(params => this.itemService.deleteItem(params.id))
      ).subscribe(res => {
        this.router.navigateByUrl('/dashboard/items', {state: {'itemDeleted': true}});
      });
    }
  }

}
