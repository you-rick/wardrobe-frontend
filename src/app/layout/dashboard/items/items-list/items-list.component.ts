import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {ItemService} from "../../../../shared/services/item.service";
import {environment} from "../../../../../environments/environment";
import {ToastService} from "../../../../shared/services/toast.service";
import {Item} from "../../../../shared/models/item.model";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  public itemsList:Item[];
  public envPath = environment.API_URL;
  private historyState = window.history.state;


  constructor(
    private itemSerivce: ItemService,
    public toastService: ToastService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.fetchItems();

    if (this.historyState) {
      this.historyState.itemDeleted && this.toastService.show('Item successfully removed!', {classname: 'bg-success text-light'});
      this.historyState.itemAdded && this.toastService.show('Item successfully added!', {classname: 'bg-success text-light'});
    }
  }

  fetchItems() {
    this.itemSerivce.getItemList().subscribe((res:Item[]) => {
      console.log(res);
        this.itemsList = res;
      }
    );
  }

  ngOnDestroy() {
    this.toastService.remove(this.toastService.toasts[0]);
  }

}
