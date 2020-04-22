import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {ItemService} from "../../../../shared/services/item.service";
import {CollectionService} from "../../../../shared/services/collection.service";
import {Collection} from "../../../../shared/models/collection.model";
import {ToastService} from "../../../../shared/services/toast.service";

import {environment} from "../../../../../environments/environment";
import {switchMap} from "rxjs/operators";
import {Item} from "../../../../shared/models/item.model";


@Component({
  selector: 'app-collection-info',
  templateUrl: './collection-info.component.html',
  styleUrls: ['./collection-info.component.scss']
})
export class CollectionInfoComponent implements OnInit {
  private historyState = window.history.state;
  public selectedColl: Collection;
  public envPath = environment.API_URL;

  constructor(
    private itemService: ItemService,
    private collectionService: CollectionService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.historyState) {
      this.historyState.collectionUpdated && this.toastService.show('Collection successfully updated!', {classname: 'bg-success text-light'});
    }

    this.fetchItemInfo();
  }

  fetchItemInfo() {
    this.route.params.pipe(
      switchMap(params => this.collectionService.getCollectionInfo(params.id))
    ).subscribe((coll: Collection) => {
      if (coll.items.length) {
        this.itemService.getItemList(coll.items).subscribe((result: any) => {
          coll.items = result;
        });
      }

      this.selectedColl = coll;
    });
  }


  deleteItem() {
    if (confirm("Are you sure you want to delete this item?")) {
      this.route.params.pipe(
        switchMap(params => this.collectionService.deleteItem(params.id))
      ).subscribe(res => {
        this.router.navigateByUrl('/dashboard/collections', {state: {'collectionDeleted': true}});
      });
    }
  }

  ngOnDestroy() {
    this.toastService.remove(this.toastService.toasts[0]);
  }
}
