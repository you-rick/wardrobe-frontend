import {Component, OnInit, OnDestroy} from '@angular/core';

import {CollectionService} from "../../../../shared/services/collection.service";
import {ItemService} from "../../../../shared/services/item.service";
import {environment} from "../../../../../environments/environment";
import {ToastService} from "../../../../shared/services/toast.service";

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {

  private historyState = window.history.state;
  public collectionList;
  public envPath = environment.API_URL;

  constructor(
    private collectionService: CollectionService,
    private toastService: ToastService,
    private itemService: ItemService
  ) {
  }

  ngOnInit() {
    if (this.historyState) {
      this.historyState.collectionDeleted && this.toastService.show('Collection successfully removed!', {classname: 'bg-success text-light'});
      this.historyState.collectionAdded && this.toastService.show('Collection successfully added!', {classname: 'bg-success text-light'});
    }

    this.fetchCollections();

  }

  fetchCollections() {
    this.collectionService.getCollectionList().subscribe((res: any[]) => {
      let collList = []
      res.forEach(el => {
        if (!el.items.length) {
          collList.push(el);
        } else {
          console.log(el.items);
          this.itemService.getItemList(el.items).subscribe(result => {
            console.log(result);
            el.items = result;
            collList.push(el);
          });
        }
      });
      this.collectionList = collList;
    });
  }

  ngOnDestroy() {
    this.toastService.remove(this.toastService.toasts[0]);
  }
}
