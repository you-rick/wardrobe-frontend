import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {ItemService} from "../../../../shared/services/item.service";
import {environment} from "../../../../../environments/environment";
import {ToastService} from "../../../../shared/services/toast.service";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  public itemsList;
  public envPath = environment.API_URL;


  constructor(
    private itemSerivce: ItemService,
    public toastService: ToastService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.fetchItems();

    if (window.history.state && window.history.state.itemDeleted) {
      this.toastService.show('Item successfully removed!', {classname: 'bg-success text-light'});
    }
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
