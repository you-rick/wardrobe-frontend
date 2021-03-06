import {Component, OnInit, OnDestroy} from '@angular/core';

import {OutfitService} from "../../../../shared/services/outfit.service";
import {ItemService} from "../../../../shared/services/item.service";
import {environment} from "../../../../../environments/environment";
import {ToastService} from "../../../../shared/services/toast.service";

import {Item} from "../../../../shared/models/item.model";

@Component({
  selector: 'app-outfit-list',
  templateUrl: './outfit-list.component.html',
  styleUrls: ['./outfit-list.component.scss']
})
export class OutfitListComponent implements OnInit {

  private historyState = window.history.state;
  public outfitList;
  public envPath = environment.API_URL;

  constructor(
    private outfitService: OutfitService,
    private toastService: ToastService,
    private itemService: ItemService
  ) {
  }

  ngOnInit() {
    if (this.historyState) {
      this.historyState.outfitDeleted && this.toastService.show('Outfit successfully removed!', {classname: 'bg-success text-light'});
      this.historyState.outfitAdded && this.toastService.show('Outfit successfully added!', {classname: 'bg-success text-light'});
    }

    this.fetchOutfits();

  }

  fetchOutfits() {
    this.outfitService.getOutfitList().subscribe((res: any[]) => {
      let outfitList = []
      res.forEach(el => {
        if (!el.items.length) {
          outfitList.push(el);
        } else {
          let outfitItemsLength = el.items.length;
          this.itemService.getItemList(el.items).subscribe((items: Item[]) => {
            if (items.length == outfitItemsLength) {
              el.items = items;

            } else {
              let removedItems = new Array(outfitItemsLength - items.length);
              el.items = items;
              el.items = el.items.concat(removedItems);
            }
            outfitList.push(el);
            console.log(el.items);

          });
        }
      });
      this.outfitList = outfitList;
    });
  }

  ngOnDestroy() {
    this.toastService.remove(this.toastService.toasts[0]);
  }
}
