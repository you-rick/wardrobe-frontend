import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {ItemService} from "../../../../shared/services/item.service";
import {Item} from "../../../../shared/models/item.model";
import {OutfitService} from "../../../../shared/services/outfit.service";
import {Outfit} from "../../../../shared/models/outfit.model";
import {environment} from "../../../../../environments/environment";
import {switchMap} from "rxjs/operators";
import {ToastService} from "../../../../shared/services/toast.service";


@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {

  private historyState = window.history.state;
  public selectedItem: Item;
  public outfitsWithItem: Outfit[];
  public envPath = environment.API_URL;

  constructor(
    private itemService: ItemService,
    private outfitService: OutfitService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.fetchItemInfo();

    if (this.historyState) {
      this.historyState.itemUpdated && this.toastService.show('Item successfully updated!', {classname: 'bg-success text-light'});
    }
  }

  fetchItemInfo() {
    this.route.params.pipe(
      switchMap(params => this.itemService.getItemInfo(params.id))
    ).subscribe((result: Item) => {
      console.log(result);
      this.selectedItem = result;
      this.getOutfitsWithItem();
    });
  }

  getOutfitsWithItem() {
    this.outfitService.getOutfitList(this.selectedItem._id).subscribe((outfits: Outfit[]) => {
      this.outfitsWithItem = outfits;
    });
  }

  toggleLaundry() {
    console.log(this.selectedItem);
    this.itemService.updateLaundryList(!this.selectedItem.washing, this.selectedItem._id).subscribe((res:any) => {
      if (res.ok) {
        this.selectedItem.washing = !this.selectedItem.washing;
      }
      this.toastService.show('Item successfully updated!', {classname: 'bg-success text-light'});
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

  ngOnDestroy() {
    this.toastService.remove(this.toastService.toasts[0]);
  }

}
